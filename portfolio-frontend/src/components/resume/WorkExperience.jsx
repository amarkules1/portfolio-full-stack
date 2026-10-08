import React from "react";

const WorkExperience = () => {
  const experiences = [
    {
      title: "BI Data Engineer, Data Analytics Team",
      company: "Tommy's Express Car Wash",
      location: "Holland, MI",
      timeline: "November 2025 to Present",
      isCurrent: true,
      details: [
        "Develops analytics dashboards using data visualization best practices, working with stakeholders to provide insights for franchisees and internal marketing and finance departments.",
        "Leverages Databricks and Azure cloud tools to build out ETL pipelines, improving performance, robustness, and cost efficiency while building out our data lake solution.",
        "Works with internal stakeholders to provide in-depth data analysis in support of company needs and initiatives, such as marketing campaigns and financial reporting needs.",
        "Utilizes public and proprietary data sources to build predictive models for forecasting and customer segmentation."
      ]
    },
    {
      title: "Senior Data Engineer, Data Services Team",
      company: "SalesPage Technologies",
      location: "Kalamazoo, MI",
      timeline: "December 2024 to October 2025",
      isCurrent: false,
      details: [
        "Provided technical expertise and domain knowledge while leading client onboarding projects for the Data Onboarding team.",
        "Worked with business stakeholders to design and implement our next generation data management and mastery solution.",
        "Gave guidance and recommendations on best practices to the development team, helping to resolve issues and build robust solutions.",
        "Analyzed unstructured and inconsistent datasets, taking a data science based approach to improve data hygiene, classification, and resolution.",
        "Leveraged record linkage, classification algorithms, and NLP to improve the quality of data products.",
        "Documented processes and solutions in a clear and concise manner, providing a framework that makes it easier for team members to do the same."
      ]
    },
    {
      title: "Data Engineer, Data Services Team",
      company: "SalesPage Technologies",
      location: "Kalamazoo, MI",
      timeline: "September 2021 to December 2024",
      isCurrent: false,
      details: [
        "Provided domain and technical expertise when meeting with coworkers and clients, acting as technical lead for the Data Services team.",
        "Designed, and implemented software solutions such as microservices and ETL pipelines which are responsible for ingesting, cleaning, resolving, and aggregating financial data from a variety of sources.",
        "Improved the flexibility and robustness of software by implementing and teaching others about best practices like unit testing and BDD.",
        "Leveraged record linkage, classification algorithms, and NLP to improve the quality of data products.",
        "Documented and explained these tools in a way that can be articulated to non-technical coworkers and clients.",
        "Migrated existing capabilities and new features to a modern technology stack, to improve speed and stability of data pipelines."
      ]
    },
    {
      title: "Associate Software Engineer, Street Pricing Team",
      company: "Gordon Food Service",
      location: "Grand Rapids, MI",
      timeline: "June 2020 to September 2021",
      isCurrent: false,
      details: [
        "Developed tools to optimize pricing for the full product catalog, bringing in $10 million in additional revenue to the company in the first year.",
        "Designed and implemented applications to provide employees with control of prices for each client, saving countless hours of work annually.",
        "Built integrations between existing applications and a new SAP based ERP system, while simultaneously optimizing legacy systems.",
        "Trained and assisted new team members, helping them understand the purpose of our applications and teaching them best practices like Test Driven Development and Automated Acceptance Testing."
      ]
    },
    {
      title: "Associate Software Engineer, eCommerce Team",
      company: "Gordon Food Service",
      location: "Grand Rapids, MI",
      timeline: "May 2019 to April 2020",
      isCurrent: false,
      details: [
        "Implemented new features for an enterprise eCommerce platform, reacting quickly to meet business needs.",
        "Provided technical expertise to collaborate on the design, planning, and architecture of new features with a team of UX designers, software developers, testers, and a product owner."
      ]
    },
    {
      title: "Software Development Intern, Finance and HR Enterprises Team",
      company: "Gordon Food Service",
      location: "Grand Rapids, MI",
      timeline: "May 2018 to May 2019",
      isCurrent: false,
      details: [
        "Used agile methodologies and project management tools to develop projects to benefit the company, including a location based sales tax calculation application which saved the company $200-300k annually."
      ]
    },
    {
      title: "Lead Facility Technician, Bernhard Center",
      company: "Western Michigan University",
      location: "Kalamazoo, MI",
      timeline: "January 2018 to October 2018",
      isCurrent: false,
      details: [
        "Responsible for setting up and troubleshooting A/V equipment for events, conferences, and meetings held on WMU’s campus.",
        "Communicated to management the capabilities, availability, and needs of a team of technicians, in order to accomplish all tasks in a timely manner.",
        "Provided training and assistance to other technicians to ensure their success in the role.",
        "Developed training and reference materials for coworkers to provide consistent and knowledgeable service to guests at the facility."
      ]
    },
    {
      title: "Facility Technician, Bernhard Center",
      company: "Western Michigan University",
      location: "Kalamazoo, MI",
      timeline: "September 2016 to January 2018",
      isCurrent: false,
      details: [
        "Learned how to set up and troubleshoot audio/visual equipment for events, conferences, and meetings.",
        "Provided expert service to guests and presenters in front of audiences up to 2000 people.",
        "Performed my required duties in a fast paced and highly visible environment."
      ]
    }
  ];

  return (
    <div className="resumeSection workExperience">
      {experiences.map((item, idx) => (
        <div key={idx} className="experience-card">
          <div className="experience-header">
            <div className="experienceName">{item.title}</div>
            <div className="timeline">
              {item.isCurrent && (
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    marginRight: "6px"
                  }}
                />
              )}
              {item.timeline}
            </div>
          </div>

          <div className="experience-sub">
            <div className="company">{item.company}</div>
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

export default WorkExperience;