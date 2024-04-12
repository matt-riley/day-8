export enum LeftRight {
  Left,
  Right,
}

export type Node = {
  name: string;
  childNames: string[];
};

export const getDirections = (input: string): LeftRight[] => {
  return input
    .split("\n\n")[0]
    .trim()
    .split("")
    .map((char) => {
      switch (char) {
        case "L":
          return LeftRight.Left;
        case "R":
          return LeftRight.Right;
        default:
          throw new Error(`Invalid direction: ${char}`);
      }
    });
};

export const getNodes = (input: string): Node[] => {
  return input
    .split("\n\n")[1]
    .trim()
    .split("\n")
    .map((line) => {
      const [name, children] = line.split(" = ");
      const childNames = children
        .substring(1, children.length - 1)
        .split(", ")
        .filter((name) => name !== "");
      return { name, childNames };
    });
};

export const getNextNode = (
  nodes: Node[],
  currentNode: string,
  direction: LeftRight,
) => {
  const thisNode = nodes.find((node) => node.name === currentNode) as Node;
  if (direction === LeftRight.Left) {
    return thisNode.childNames[0];
  } else {
    return thisNode.childNames[1];
  }
};

export const getResult = (input: string) => {
  const nodes = getNodes(input);
  const directions = getDirections(input);
  let steps = 0;
  let currentNode = "AAA";
  let dirIdx = 0;
  while (currentNode !== "ZZZ") {
    dirIdx = dirIdx % directions.length;
    currentNode = getNextNode(nodes, currentNode, directions[dirIdx]);
    steps++;
    dirIdx++;
  }
  return steps;
};
