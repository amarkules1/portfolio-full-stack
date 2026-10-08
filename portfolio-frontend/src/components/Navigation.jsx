import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setShowMenu(false);
  }, [location]);

  return (
    <div className="navigation-wrapper">
      <nav className="custom-navbar">
        <div className="container d-flex align-items-center justify-content-between position-relative">
          <NavLink
            className="nav-brand-group"
            to="/"
            onClick={() => setShowMenu(false)}
          >
            <div className="nav-brand-logo">AM</div>
            <span className="nav-brand-text">Alex Markules</span>
          </NavLink>

          <button
            className="navbar-toggler-custom"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle navigation"
            aria-expanded={showMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showMenu ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <div className={`nav-menu-container ${showMenu ? "is-open" : ""}`}>
            <ul className="custom-nav-links">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `custom-nav-link ${isActive ? "active" : ""}`
                  }
                  to="/"
                  onClick={() => setShowMenu(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `custom-nav-link ${isActive ? "active" : ""}`
                  }
                  to="/projects"
                  onClick={() => setShowMenu(false)}
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `custom-nav-link ${isActive ? "active" : ""}`
                  }
                  to="/resume"
                  onClick={() => setShowMenu(false)}
                >
                  Resume
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `custom-nav-link ${isActive ? "active" : ""}`
                  }
                  to="/blog"
                  onClick={() => setShowMenu(false)}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `custom-nav-link ${isActive ? "active" : ""}`
                  }
                  to="/contact"
                  onClick={() => setShowMenu(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;