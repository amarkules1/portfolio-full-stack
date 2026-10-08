import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  About,
  Contact,
  Blog,
  Post as BlogPost,
  Resume,
  WorkExperience,
  Education,
  CertsSkills
} from "./components";
import Projects from "./components/projects/Projects";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/index.html" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />}>
            <Route path="work-experience" element={<WorkExperience />} />
            <Route path="education" element={<Education />} />
            <Route path="certs-skills" element={<CertsSkills />} />
            <Route path="" element={<WorkExperience />} />
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

reportWebVitals();
