import React, { Component } from "react";

class CertsSkills extends Component {
  render() {
    return (
        <div className="resumeSection education">
            <div className="sectionTitle">
                Certifications and Skills
            </div>
            <div className="experience">
                <div className="experienceName">Skills</div>
                <ul className="details">
                    <li className="detail"><b>Data Engineering:</b> Databricks, Azure Data Factory</li>
                    <li className="detail"><b>Data Visualization:</b> PowerBI, Tableau, Matplotlib, ggplot</li>
                    <li className="detail"><b>Statistics:</b> Regression, ANOVA</li>
                    <li className="detail"><b>Machine Learning:</b> Natural Language Processing, Classification, Clustering</li>
                    <li className="detail"><b>Large Language Models:</b> GPT Index, Langchain, Vector Embeddings</li>
                    <li className="detail"><b>Java:</b> Spring, Hibernate</li>
                    <li className="detail"><b>Python:</b> Jupyter, Scikit</li>
                    <li className="detail"><b>R:</b> Tidyverse, Shiny</li>
                    <li className="detail"><b>SQL:</b> Postgres, MSSQL</li>
                    <li className="detail"><b>Frontend:</b> Vue, React</li>
                    <li className="detail"><b>CI/CD:</b> Jenkins, Git</li>
                    <li className="detail"><b>Project Management:</b> JIRA, Confluence, Scaled Agile</li>
                    <li className="detail"><b>Cloud:</b> Docker, GCP, AWS</li>
                </ul>
            </div>
            <div className="experience">
                <div className="experienceName">Certifications</div>
                <ul className="details">
                    <li className="detail">Certified Scaled Agile Framework (SAFe) Practitioner</li>
                    <li className="detail">Data Engineering, Big Data, and Machine Learning on GCP Specialization</li>
                    <li className="detail">Developing Applications with Google Cloud Platform Specialization</li>
                    <li className="detail">Architecting with Google Compute Engine Specialization</li>
                    <li className="detail">SAS Base Programming Specialist</li>
                </ul>
            </div>
        </div>
    )
  }
}

export default CertsSkills;