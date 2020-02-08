import React from "react";

import "./box.styles.scss";

class Box extends React.Component {
  render() {
    return (
      <div
        className={`Box ${this.props.className} ${this.props.status}`}
        onClick={this.props.handleClick}
      />
    );
  }
}

export default Box;
