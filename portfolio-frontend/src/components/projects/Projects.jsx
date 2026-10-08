import React, { Component } from "react";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("/projects")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: "Failed to load projects"
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    return (
      <div className="projects-page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Projects</h1>
            <p className="page-subtitle">
              A selection of web apps, data visualization tools, and machine learning projects.
            </p>
          </div>

          {error && (
            <div className="text-center my-4 p-4" style={{ background: "#180d0d", border: "1px solid #4a1818", borderRadius: "8px", color: "#fca5a5" }}>
              <h4>Unable to load projects</h4>
              <p className="m-0" style={{ color: "#f87171" }}>{error}</p>
            </div>
          )}

          {!isLoaded && !error && (
            <div className="loading-pulse-container">
              <div className="loading-spinner"></div>
              <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>Loading projects...</p>
            </div>
          )}

          {isLoaded && !error && (
            <div className="projectsContainer">
              <div className="row g-3">
                {items.map((item) => (
                  <div key={item.id || item.title} className="col-lg-4 col-md-6">
                    <a
                      href={item.url}
                      className="project-card-wrapper"
                      target={item.url && item.url.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      <div className="projectBox">
                        <div className="project-card-top">
                          <span className="project-card-badge">Project</span>
                          <h3 className="project-title">
                            <span>{item.title}</span>
                            <span className="project-arrow">↗</span>
                          </h3>
                        </div>
                        <p className="project-description">{item.description}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Projects;