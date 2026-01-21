import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  About,
  Contact,
  Blog,
  Posts,
  Post,
  Resume,
  WorkExperience,
  Education,
  CertsSkills
} from "./components";
import reportWebVitals from './reportWebVitals';
import Projects from './components/projects/Projects';
import BlogPage from "./components/blog/Blog";
import BlogPost from "./components/blog/Post";
import { Post as ProjectPost } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation />
    <Routes>
    <Route path="/" element={<About />} />
    <Route path="/index.html" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resume" element={<Resume />} >
        <Route path="work-experience" element={<WorkExperience />} />
        <Route path="education" element={<Education />} />
        <Route path="certs-skills" element={<CertsSkills />} />
        <Route path="" element={<WorkExperience />} />
      </Route>
      <Route path="/projects" element={<Projects />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<ProjectPost />} />
      </Route>
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:postId" element={<BlogPost />} />
    </Routes>
    <Footer />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
