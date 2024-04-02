import { useState } from "react";
import { DirectionType, graph } from "./model/dummy";
import GraphDirectionController from "./entities/graph-direction-controller/ui";
import Graph from "./features/graph/ui";

function App() {
  const [direction, setDirection] = useState<DirectionType>("DOWN");

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f0f0f0",
      }}
      className="App"
    >
      <div
        style={{
          backgroundColor: "#c0c0c0",
          color: "black",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Utils
        <GraphDirectionController
          direction={direction}
          onChange={(direction) => {
            setDirection(direction);
          }}
        />
      </div>
      <Graph
        layoutOptions={{
          ...graph.layoutOptions,
          "elk.direction": direction,
        }}
      />
    </div>
  );
}

export default App;
