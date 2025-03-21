import json
import os

import cachetools
from flask import Flask, redirect
import pandas as pd
import sqlalchemy
from sqlalchemy import sql
from flask_cors import CORS
from dotenv import load_dotenv


app = Flask(__name__, static_folder='portfolio/build', static_url_path='')
CORS(app)

_ = load_dotenv()
CONN = sqlalchemy.create_engine(os.getenv("DATABASE_CONN_STRING")).connect()
OTHER_CONN = sqlalchemy.create_engine(os.getenv("OTHER_DATABASE_CONN_STRING")).connect()

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


@cachetools.cached(cache=cachetools.TTLCache(maxsize=1024, ttl=30))
def get_response():
    data = pd.read_sql(sql.text("select * from portfolio_projects"), CONN)
    CONN.commit()
    data = data.sort_values(['priority', 'created_at'], ascending=[True, False])[['id', 'url', 'title', 'description']]
    data['row_number'] = data.reset_index().index
    return data.to_json(orient="records")


if __name__ == '__main__':
    app.run(port=5000, debug=True)
