import React from "react";
import "./Cellular.css";

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;
class Cellular extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <div className="Twodspace" style={{ width: WIDTH, height: HEIGHT }}>
          {" "}
        </div>{" "}
      </div>
    );
  }
}

export default Cellular;
