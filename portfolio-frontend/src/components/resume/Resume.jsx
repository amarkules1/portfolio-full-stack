import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const Resume = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="resume-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Resume</h1>
          <p className="page-subtitle">
            Background in data engineering, data science, and software development.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="resume-nav-tabs">
          <NavLink
            to="/resume/work-experience"
            className={
              currentPath === "/resume" || currentPath === "/resume/" || currentPath.includes("work-experience")
                ? "resumeButton selected"
                : "resumeButton"
            }
          >
            Work Experience
          </NavLink>

          <NavLink
            to="/resume/education"
            className={({ isActive }) =>
              isActive ? "resumeButton selected" : "resumeButton"
            }
          >
            Education
          </NavLink>

          <NavLink
            to="/resume/certs-skills"
            className={({ isActive }) =>
              isActive ? "resumeButton selected" : "resumeButton"
            }
          >
            Certifications & Skills
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Resume;