import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer className="py-1 bg-dark fixed-bottom">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; Alex Markules 2023
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;