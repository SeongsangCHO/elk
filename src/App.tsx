import { useLayoutEffect, useState } from "react";
import createElk from "./layout/createElk";
import { ElkNode } from "elkjs";

function App() {
  const elk = createElk();
  const [layout, setLayout] = useState<ElkNode>();

  useLayoutEffect(() => {
    elk.then((_layout) => {
      setLayout(_layout);
    });
  }, []);
  if (!layout) {
    return <div>Generating layout...</div>;
  }
  console.log(layout);

  return (
    <div
      style={{
        width: layout.width,
        height: layout.height,
        border: "1px solid black",
        color: "black",
      }}
    >
      {layout.children?.map((child) => {
        return (
          <div
            key={child.id}
            style={{
              position: "absolute",
              backgroundColor: "#ffffff",
              left: child.x,
              top: child.y,
              width: child.width,
              height: child.height,
              border: "1px solid black",
            }}
          >
            {child.id}
          </div>
        );
      })}
      {layout?.edges?.map((edge) => {
        return (
          <div
            key={edge.id}
            style={{
              position: "absolute",
              backgroundColor: "#ffffff",
              left: edge.sections[0].startPoint.x,
              top: edge.sections[0].startPoint.y,
              width:
                edge.sections[0].endPoint.x - edge.sections[0].startPoint.x,
              height:
                edge.sections[0].endPoint.y - edge.sections[0].startPoint.y,
              border: "1px solid black",
            }}
          >
            {edge.id}
          </div>
        );
      })}
    </div>
  );
}

export default App;
