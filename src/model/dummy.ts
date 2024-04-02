type DirectionType = "UP" | "DOWN" | "LEFT" | "RIGHT";
type LayoutOptionsType = {
  "elk.algorithm": string;
  "elk.direction": DirectionType;
  "eclipse.elk.alignment": string;
  "elk.portAlignment.default": string;
  "elk.layered.spacing.edgeEdgeBetweenLayers": string;
  "elk.spacing.portPort": string;
  "elk.layered.nodePlacement.strategy": string;
};
type GraphType = {
  id: string;
  layoutOptions: LayoutOptionsType;
  children: { id: string; width: number; height: number }[];
  edges: { id: string; sources: string[]; targets: string[] }[];
};

const dummy_layoutOptions: LayoutOptionsType = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "eclipse.elk.alignment": "CENTER",
  "elk.portAlignment.default": "CENTER",
  "elk.layered.spacing.edgeEdgeBetweenLayers": "50", // 노드 간 거리 증가
  "elk.spacing.portPort": "2",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
};

const graph: GraphType = {
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
export { graph, dummy_layoutOptions };
export type { GraphType, DirectionType, LayoutOptionsType };
