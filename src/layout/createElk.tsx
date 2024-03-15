import ELK, { ElkNode, LayoutOptions } from "elkjs/lib/elk.bundled.js";

interface Node {
  id: string;
  width: number;
  height: number;
}

interface Edge {
  id: string;
  sources: string[];
  targets: string[];
}

export default function createElk(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions
): Promise<ElkNode> {
  const elk = new ELK();

  return elk.layout(
    {
      id: "root",
      layoutOptions: options,
      children: nodes,
      edges: edges,
    },
    {
      logging: true,
      measureExecutionTime: true,
    }
  );
}
