import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";

class Resume extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        };
    }
    render() {
        return (
            <div className="home">
                <div className="container">
                    <h1 className="text-center mt-5">Resume</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/resume/work-experience" onClick={() => this.setState({ selected: 'work-experience' })}>
                                <div className={this.state.selected === 'work-experience' ? 'resumeButton selected' : 'resumeButton'}>Work Experience</div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/resume/education" onClick={() => this.setState({ selected: 'education' })}>
                                <div className={this.state.selected === 'education' ? 'resumeButton selected' : 'resumeButton'}>Education</div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/resume/certs-skills" onClick={() => this.setState({ selected: 'certs-skills' })}>
                                <div className={this.state.selected === 'certs-skills' ? 'resumeButton selected' : 'resumeButton'}>Certifications and Skills</div>
                            </Link>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        );
    }
}

export default Resume;