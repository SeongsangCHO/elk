import { useLayoutEffect, useState } from "react";
import createElk from "./layout/createElk";
import { ElkNode } from "elkjs";
const graph = {
  id: "root",
  layoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "eclipse.elk.alignment": "CENTER",
    "elk.portAlignment.default": "CENTER",
    "elk.layered.spacing.edgeEdgeBetweenLayers": "50", // 노드 간 거리 증가
    "elk.spacing.portPort": "2",
    "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  },

  children: [
    { id: "n1", width: 30, height: 30 }, // 루트 노드
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 },
    { id: "n4", width: 30, height: 30 },
    { id: "n5", width: 30, height: 30 },
    { id: "n6", width: 30, height: 30 },
    { id: "n7", width: 30, height: 30 },
    { id: "n8", width: 30, height: 30 },
    { id: "n9", width: 30, height: 30 },
    { id: "n10", width: 30, height: 30 },
    { id: "n11", width: 30, height: 30 },
    { id: "n12", width: 30, height: 30 },
  ],
  edges: [
    { id: "e1", sources: ["n1"], targets: ["n2"] },
    { id: "e2", sources: ["n1"], targets: ["n3"] },
    { id: "e3", sources: ["n2"], targets: ["n4"] },
    { id: "e4", sources: ["n2"], targets: ["n5"] },
    { id: "e5", sources: ["n3"], targets: ["n6"] },
    { id: "e6", sources: ["n3"], targets: ["n7"] },
    { id: "e7", sources: ["n6"], targets: ["n8"] },
    { id: "e8", sources: ["n6"], targets: ["n9"] },
    { id: "e9", sources: ["n7"], targets: ["n10"] },
    { id: "e10", sources: ["n7"], targets: ["n11"] },
    { id: "e11", sources: ["n11"], targets: ["n12"] },
  ],
};
function App() {
  const elk = createElk(graph.children, graph.edges, graph.layoutOptions);
  const [layout, setLayout] = useState<ElkNode>();

  useLayoutEffect(() => {
    elk
      .then((_layout) => {
        setLayout(_layout);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  if (!layout) {
    return <div>Generating layout...</div>;
  }
  console.log(layout);

  return (
    <svg
      style={{
        width: layout.width,
        height: layout.height,
        border: "1px solid black",
        color: "black",
      }}
    >
      {layout.children?.map((child) => (
        <g key={child.id}>
          <rect
            x={child.x}
            y={child.y}
            width={child.width}
            height={child.height}
            fill="#ffffff"
            stroke="black"
          />
          <text
            x={child.x + child.width / 2}
            y={child.y + child.height / 2}
            dominantBaseline="middle"
            textAnchor="middle"
            fill="black"
          >
            {child.id}
          </text>
        </g>
      ))}
      {layout.edges?.map((edge) => {
        console.log(edge);
        const x1 = edge.sections[0].startPoint.x;
        const y1 = edge.sections[0].startPoint.y;
        const x2 = edge.sections[0].endPoint.x;
        const y2 = edge.sections[0].endPoint.y;
        if (!edge.sections[0].bendPoints) {
          const mx = x1;
          const my = y2;

          const d = `M ${x1},${y1} L ${mx},${my} L ${x2},${y2}`;

          return (
            <g>
              <path key={edge.id} d={d} fill="none" stroke="black" />
            </g>
          );
        }
        if (edge.sections[0].bendPoints) {
          const { x: xStart, y: yStart } = edge.sections[0].startPoint;
          // 끝점
          const { x: xEnd, y: yEnd } = edge.sections[0].endPoint;
          const bendPath = edge.sections[0].bendPoints
            .map((point) => `L ${point.x} ${point.y}`)
            .join(" ");

          const d = `M ${xStart} ${yStart} ${bendPath} L ${xEnd} ${yEnd}`;

          return <path key={edge.id} d={d} fill="none" stroke="black" />;
        }
      })}
    </svg>
  );
}

export default App;
