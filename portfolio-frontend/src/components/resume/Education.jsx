import React, { Component } from "react";

class Education extends Component {
  render() {
    return (
        <div className="resumeSection education">
            <div className="sectionTitle">
                Education
            </div>
            <div className="experience">
                <div className="experienceName">Master of Science, Data Science and Analytics</div>
                <div className="timeline">Graduation: April 2023 - 3.97 GPA</div>
                <br/>
                <div className="company">Grand Valley State University</div>
                <div className="location">Allendale, Michigan</div>
                <ul className="details">
                    <li className="detail">Uses R, Python, and SAS programming languages to create, clean, and analyze datasets, 
                    learning the libraries and techniques available in each language</li>
                    <li className="detail">Interprets and explains finding, deriving practical and actionable knowledge from datasets.</li>
                    <li className="detail">Builds predictive models using algorithms such as linear regression, K-Means, 
                    K Nearest Neighbor, Support Vector Machines, and Artificial Neural Networks, among others.</li>
                    <li className="detail">Learns strategies for analyzing large datasets, such as parallel processing using CPU and GPU multithreading, 
                    and cloud techniques like message passing and map-reduce.</li>
                </ul>
            </div>
            <div className="experience">
                <div className="experienceName">Bachelor of Science, Computer Science, Mathematics Minor</div>
                <div className="timeline">Graduation: April 2019 - 3.55 GPA</div>
                <br/>
                <div className="company">Western Michigan University</div>
                <div className="location">Kalamazoo, Michigan</div>
                <ul className="details">
                    <li className="detail">Learned to effectively use and implement a wide variety of computer science concepts, 
                    ranging from basic data structures to stochastic computing algorithms.</li>
                    <li className="detail">Used industry best practices in agile programming and software testing 
                    to develop a final project which had real world use for guidance counselors at the university.</li>
                </ul>
            </div>
        </div>
    )
  }
}

export default Education;