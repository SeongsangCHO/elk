import { useLayoutEffect, useState } from "react";
import { ElkNode } from "elkjs";
import createElk from "../../../layout/createElk";
import { LayoutOptionsType, graph } from "../../../model/dummy";

export default function Graph({
  layoutOptions,
}: {
  layoutOptions: LayoutOptionsType;
}) {
  const elk = createElk(graph.children, graph.edges, layoutOptions);
  const [layout, setLayout] = useState<ElkNode>();

  const createElkLayout = () => {
    elk
      .then((_layout) => {
        setLayout(_layout);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useLayoutEffect(() => {
    createElkLayout();
  }, []);

  if (!layout) {
    return <div>Generating layout...</div>;
  }

  return (
    <svg
      style={{
        width: layout.width,
        height: layout.height,
        border: "1px solid black",
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
