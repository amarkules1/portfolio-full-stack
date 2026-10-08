import React from "react";

const CertsSkills = () => {
  const skillCategories = [
    {
      category: "Data Engineering & Cloud",
      skills: ["Databricks", "Azure Data Factory", "ETL Pipelines", "Docker", "GCP", "AWS", "Lakehouses"]
    },
    {
      category: "Data Science & Machine Learning",
      skills: ["Machine Learning", "Natural Language Processing (NLP)", "Classification & Clustering", "LLMs & Vector Embeddings", "Langchain", "Statistical Regression & ANOVA"]
    },
    {
      category: "Languages & Databases",
      skills: ["Python (Jupyter, Scikit-learn)", "R (Tidyverse, Shiny)", "SQL (PostgreSQL, MSSQL)", "Java (Spring, Hibernate)", "JavaScript", "React", "Vue"]
    },
    {
      category: "Visualization & BI",
      skills: ["PowerBI", "Tableau", "Matplotlib", "ggplot2"]
    },
    {
      category: "DevOps & Methodologies",
      skills: ["Git", "CI/CD & Jenkins", "SAFe Agile", "JIRA", "Confluence", "Test-Driven Development (TDD)"]
    }
  ];

  const certifications = [
    {
      title: "Certified Scaled Agile Framework (SAFe) Practitioner",
      issuer: "Scaled Agile"
    },
    {
      title: "Data Engineering, Big Data, and Machine Learning on GCP Specialization",
      issuer: "Google Cloud / Coursera"
    },
    {
      title: "Developing Applications with Google Cloud Platform Specialization",
      issuer: "Google Cloud / Coursera"
    },
    {
      title: "Architecting with Google Compute Engine Specialization",
      issuer: "Google Cloud / Coursera"
    },
    {
      title: "SAS Base Programming Specialist",
      issuer: "SAS Institute"
    }
  ];

  return (
    <div className="resumeSection certsSkills">
      {/* Skills Section */}
      <h2 className="mb-3" style={{ fontSize: "1.4rem", color: "var(--text-main)" }}>
        Technical Skills
      </h2>

      <div className="skills-grid">
        {skillCategories.map((group, idx) => (
          <div key={idx} className="skill-category-card">
            <h3 className="skill-category-title">
              {group.category}
            </h3>
            <div className="skill-tags">
              {group.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      <h2 className="mt-4 mb-3" style={{ fontSize: "1.4rem", color: "var(--text-main)" }}>
        Certifications
      </h2>

      <div>
        {certifications.map((cert, idx) => (
          <div key={idx} className="cert-card">
            <span className="cert-title">{cert.title}</span>
            <span className="cert-issuer">{cert.issuer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertsSkills;