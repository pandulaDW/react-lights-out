import React from "react";
import uuid from "uuid";

import "./boxgrid.styles.scss";
import Box from "../box/box.component";

class BoxGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.makeInitialState();
  }

  rows = 6;
  columns = 6;

  classNameList = (rows, columns) => {
    let classes = [];
    for (let i = 1; i < rows + 1; i++) {
      for (let j = 1; j < columns + 1; j++) classes.push(`box-${i}-${j}`);
    }
    return classes;
  };

  makeInitialState = () => {
    const classes = this.classNameList(this.rows, this.columns);
    const states = ["active", "inactive"];
    return classes.reduce(
      (obj, cur) => (
        // eslint-disable-next-line no-sequences
        (obj[cur] = states[Math.floor(Math.random() * 2)]), obj
      ),
      {}
    );
  };

  handleClick = event => {
    const [clickedClass, currentStatus] = event.target.className
      .split(" ")
      .slice(1);
    const [rowNum, colNum] = clickedClass
      .split("-")
      .slice(1)
      .map(el => parseInt(el));

    let new_obj = {};
    let neighbours = [];

    new_obj[`box-${rowNum}-${colNum}`] =
      currentStatus === "active" ? "inactive" : "active";

    neighbours[0] = [rowNum + 1 > this.rows ? null : rowNum + 1, colNum];
    neighbours[1] = [rowNum - 1 < 1 ? null : rowNum - 1, colNum];
    neighbours[2] = [rowNum, colNum + 1 > this.columns ? null : colNum + 1];
    neighbours[3] = [rowNum, colNum - 1 < 1 ? null : colNum - 1];

    neighbours.forEach(el => {
      if (!el.includes(null)) {
        const element = `box-${el[0]}-${el[1]}`;
        const currentStatus = this.state[element];
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        new_obj[element] = newStatus;
      }
    });

    this.setState(new_obj);
  };

  render() {
    return (
      <div className="BoxGrid">
        <div
          className="container"
          style={{
            gridTemplateColumns: `repeat(${this.columns}, 100px)`,
            gridTemplateRows: `repeat(${this.rows}, 80px)`
          }}
        >
          {Object.keys(this.state).map(el => (
            <Box
              key={uuid()}
              className={el}
              status={this.state[el]}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BoxGrid;
