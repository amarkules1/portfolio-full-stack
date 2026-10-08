import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero-card">
          <div className="row align-items-center">
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <div className="profile-container">
                <img
                  className="img-fluid profile-avatar"
                  src="/profile.png"
                  alt="Alex Markules"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="role-tag">
                <span>Data Engineer & Analytics Specialist</span>
              </div>

              <h1 className="hero-title">
                Alex Markules
              </h1>
              
              <h2 className="hero-subtitle">
                Data Engineering, Machine Learning & Full-Stack Systems
              </h2>

              <p className="hero-description">
                Hi, I'm Alex. I'm currently a <strong>BI Data Engineer</strong> at Tommy's Express Car Wash. 
                I hold a <strong>Master of Science in Data Science and Analytics</strong> from Grand Valley State University 
                and a <strong>Bachelor of Science in Computer Science</strong> from Western Michigan University. 
                My experience covers cloud data pipelines, machine learning models, statistical analysis, 
                and scalable software development.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link to="/projects" className="btn-emerald-primary">
                  View Projects
                </Link>
                <Link to="/resume" className="btn-emerald-outline">
                  Resume & Experience
                </Link>
                <Link to="/contact" className="btn-emerald-outline">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas - No emojis, clean technical presentation */}
        <div className="feature-cards-grid">
          <div className="feature-card">
            <span className="feature-tag">Infrastructure</span>
            <h3 className="feature-title">Data Engineering</h3>
            <p className="feature-desc">
              ETL/ELT pipeline design, lakehouse architecture, and data warehousing using Databricks, Azure Data Factory, and SQL.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-tag">Modeling</span>
            <h3 className="feature-title">Data Science & ML</h3>
            <p className="feature-desc">
              Predictive modeling, natural language processing, entity resolution algorithms, and statistical analysis with Python and R.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-tag">Applications</span>
            <h3 className="feature-title">Software Development</h3>
            <p className="feature-desc">
              Full-stack web applications, microservices, automated testing, and CI/CD workflows using React, Python, and cloud services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;