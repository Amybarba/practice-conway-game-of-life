import React from "react";
import "./Cellular.css";

const CELL_SIZE = 30;
const WIDTH = 800;
const HEIGHT = 600;

//Render the cells to the automaton//
class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
      />
    );
  }
}

//Allow user to interact to create cells, 2d array to keep state, this.state.cells keeps the
//position of the cells, this.makecells will generate the cell list//
class Cellular extends React.Component {
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.automaton = this.makeEmptyAutomaton();
  }

  state = {
    cells: [],
  };

  makeEmptyAutomaton() {
    let automaton = [];
    for (let y = 0; y < this.rows; y++) {
      automaton[y] = [];
      for (let x = 0; x < this.cols; x++) {
        automaton[y][x] = false;
      }
    }

    return automaton;
  }

  getElementOffset() {
    const rect = this.automatonRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.automaton[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.automaton[y][x] = !this.automaton[y][x];
    }

    this.setState({ cells: this.makeCells() });
  };
  // Specify the background size under classname twodspace//
  //Add onclick to allow removal of the cell and retrieve location//
  render() {
    const { cells } = this.state;
    return (
      <div>
        {" "}
        <div
          className="Twodspace"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
          onClick={this.handleClick}
          ref={(n) => {
            this.automatonRef = n; }}>

          {cells.map(cell => (  
            <Cell x={cell.x} y={cell.y}
            key={`${cell.x}, ${cell.y}`}/> 
          ))}
        </div>
      </div>
    );
  }
}

export default Cellular;
