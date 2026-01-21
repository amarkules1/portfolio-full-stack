import React, { Component } from "react";
import { Outlet } from "react-router-dom";

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
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error: "Failed to load"
          });
        }
      )
  }

  render() {

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const rows = [...Array(Math.ceil(items.length / 3))];
      const projectRows = rows.map((row, idx) => items.slice(idx * 3, idx * 3 + 3));

      return (
        <div className="container projectsContainer">
          {
            projectRows.map(row => (
              <div className="row">
                {
                  row.map(item => (
                    <div className="col-md-4">
                    <a href={item.url} className="divLink">
                      <div key={item.id} className="projectBox card">
                        <h5 className="card-title">{item.title}</h5>
                        <div className="card-text">{item.description}</div>
                      </div>
                    </a>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      );
    }
  }
}

export default Projects;