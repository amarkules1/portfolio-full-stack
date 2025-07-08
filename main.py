import json
import os

import cachetools
from flask import Flask, redirect, render_template, request, url_for, flash
import pandas as pd
import sqlalchemy
from sqlalchemy import sql
from flask_cors import CORS
from dotenv import load_dotenv
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user


app = Flask(__name__, static_folder='portfolio/build', static_url_path='', template_folder='templates')
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

_ = load_dotenv()
CONN = sqlalchemy.create_engine(os.getenv("DATABASE_CONN_STRING")).connect()
OTHER_CONN = sqlalchemy.create_engine(os.getenv("OTHER_DATABASE_CONN_STRING")).connect()

class User(UserMixin):
    def __init__(self, id):
        self.id = id

    @staticmethod
    def get(user_id):
        if user_id == 'admin':
            return User(user_id)
        return None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@app.route('/')
def hello():
    return redirect("/index.html", code=302)


@app.route("/projects", methods=['GET'])
def projects():
    return get_response()

@app.route("/march-madness-2025", methods=['GET'])
def get_march_madness():
    data = pd.read_sql(sql.text("select * from sports_data.tourney_predictions_2025"), OTHER_CONN)
    return data.to_json(orient="records")


projects_cache = cachetools.TTLCache(maxsize=1024, ttl=30)


@cachetools.cached(cache=projects_cache)
def get_response():
    data = pd.read_sql(sql.text("select * from portfolio_projects"), CONN)
    CONN.commit()
    data = data.sort_values(['priority', 'created_at'], ascending=[True, False])[['id', 'url', 'title', 'description']]
    data['row_number'] = data.reset_index().index
    return data.to_json(orient="records")


@app.route('/admin/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        password = request.form.get('password')
        if password == os.getenv('ADMIN_PASSWORD'):
            user = User.get('admin')
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid password')
    return render_template('admin/login.html')

@app.route('/admin/dashboard')
@login_required
def dashboard():
    projects = pd.read_sql(sql.text("select * from portfolio_projects order by priority, created_at desc"), CONN)
    return render_template('admin/dashboard.html', projects=projects.to_dict(orient='records'))

@app.route('/admin/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/add', methods=['POST'])
@login_required
def add_project():
    if request.method == 'POST':
        title = request.form.get('title')
        url = request.form.get('url')
        description = request.form.get('description')
        priority = request.form.get('priority')
        query = sql.text("INSERT INTO portfolio_projects (title, url, description, priority, created_at) VALUES (:title, :url, :description, :priority, now())")
        CONN.execute(query, {'title': title, 'url': url, 'description': description, 'priority': priority})
        CONN.commit()
        projects_cache.clear()
        flash('Project added successfully!')
    return redirect(url_for('dashboard'))

@app.route('/edit/<int:project_id>', methods=['POST'])
@login_required
def edit_project(project_id):
    if request.method == 'POST':
        title = request.form.get('title')
        url = request.form.get('url')
        description = request.form.get('description')
        priority = request.form.get('priority')
        query = sql.text("UPDATE portfolio_projects SET title=:title, url=:url, description=:description, priority=:priority WHERE id=:id")
        CONN.execute(query, {'title': title, 'url': url, 'description': description, 'priority': priority, 'id': project_id})
        CONN.commit()
        projects_cache.clear()
        flash('Project updated successfully!')
    return redirect(url_for('dashboard'))

@app.route('/delete/<int:project_id>', methods=['POST'])
@login_required
def delete_project(project_id):
    if request.method == 'POST':
        query = sql.text("DELETE FROM portfolio_projects WHERE id=:id")
        CONN.execute(query, {'id': project_id})
        CONN.commit()
        projects_cache.clear()
        flash('Project deleted successfully!')
    return redirect(url_for('dashboard'))


if __name__ == '__main__':
    app.run(port=5000, debug=True)
