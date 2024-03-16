import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "red" }}>Oops!</h1>
          <h2>
            Something went wrong<span style={{ color: "red" }}>.</span>
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
