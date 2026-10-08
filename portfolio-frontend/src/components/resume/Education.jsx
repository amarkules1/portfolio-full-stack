import React from "react";

const Education = () => {
  const educationItems = [
    {
      degree: "Master of Science, Data Science & Analytics",
      institution: "Grand Valley State University",
      location: "Allendale, Michigan",
      timeline: "Graduated: April 2023",
      gpa: "3.97 GPA",
      details: [
        "Uses R, Python, and SAS programming languages to create, clean, and analyze datasets, learning the libraries and techniques available in each language.",
        "Interprets and explains findings, deriving practical and actionable knowledge from complex datasets.",
        "Builds predictive models using algorithms such as linear regression, K-Means, K Nearest Neighbor, Support Vector Machines, and Artificial Neural Networks, among others.",
        "Learns strategies for analyzing large datasets, such as parallel processing using CPU and GPU multithreading, and cloud techniques like message passing and map-reduce."
      ]
    },
    {
      degree: "Bachelor of Science, Computer Science",
      minor: "Mathematics Minor",
      institution: "Western Michigan University",
      location: "Kalamazoo, Michigan",
      timeline: "Graduated: April 2019",
      gpa: "3.55 GPA",
      details: [
        "Learned to effectively use and implement a wide variety of computer science concepts, ranging from basic data structures to stochastic computing algorithms.",
        "Used industry best practices in agile programming and software testing to develop a final project which had real world use for guidance counselors at the university."
      ]
    }
  ];

  return (
    <div className="resumeSection education">
      {educationItems.map((item, idx) => (
        <div key={idx} className="experience-card">
          <div className="experience-header">
            <div>
              <div className="experienceName">{item.degree}</div>
              {item.minor && (
                <div style={{ color: "var(--text-emerald)", fontSize: "0.95rem", fontWeight: "500", marginTop: "2px" }}>
                  {item.minor}
                </div>
              )}
            </div>
            <div className="d-flex flex-wrap gap-2">
              <span className="timeline">{item.timeline}</span>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "rgba(34, 197, 94, 0.18)",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#86efac"
                }}
              >
                {item.gpa}
              </span>
            </div>
          </div>

          <div className="experience-sub" style={{ marginTop: "8px" }}>
            <div className="company">{item.institution}</div>
            <div className="location">{item.location}</div>
          </div>

          <ul className="details">
            {item.details.map((detail, dIdx) => (
              <li key={dIdx} className="detail">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Education;