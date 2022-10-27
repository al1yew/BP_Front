import React from "react";

export class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      err: null,
    };
  }

  componentDidCatch(err) {
    this.setState({ err });
  }

  render() {
    return (
      <>
        {this.props.children}
        {this.state.err ? (
          <span className="errorapp">{this.state.err.toString()}</span>
        ) : null}
      </>
    );
  }
}
