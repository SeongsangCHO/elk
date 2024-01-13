import ELK from "elkjs/lib/elk.bundled.js";
import { Worker } from "elkjs/lib/elk-worker.js";

export default function createElk() {
  const elk = new ELK({
    workerUrl: "./elk-worker.min.js", //TODO is this exc?
    workerFactory: function (url?: string) {
      // the value of 'url' is irrelevant here
      return new Worker(url || "");
    },
  });
  const graph = {
    id: "root",
    layoutOptions: { "elk.algorithm": "layered" },

    children: [
      { id: "n1", width: 30, height: 30 },
      { id: "n2", width: 30, height: 30 },
      { id: "n3", width: 30, height: 30 },
      { id: "n4", width: 30, height: 30 },
      { id: "n5", width: 30, height: 30 },
      { id: "n6", width: 30, height: 30 },
      { id: "n7", width: 30, height: 30 },
    ],
    edges: [
      { id: "e1", sources: ["n1"], targets: ["n2"] },
      { id: "e2", sources: ["n2"], targets: ["n3"] },
      { id: "e3", sources: ["n3"], targets: ["n4"] },
      { id: "e4", sources: ["n3"], targets: ["n5"] },
      { id: "e5", sources: ["n3"], targets: ["n6"] },
      { id: "e6", sources: ["n6"], targets: ["n7"] },
    ],
  };

  return elk.layout(graph, {
    logging: true,
    measureExecutionTime: true,
  });
}
