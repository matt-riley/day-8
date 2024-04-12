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
  currentNode: Node,
  direction: LeftRight,
) => {
  if (direction === LeftRight.Left) {
    return nodes.filter((node) => node.name === currentNode.childNames[0]);
  } else {
    return nodes.filter((node) => node.name === currentNode.childNames[1]);
  }
};

export const getStartNodes = (nodes: Node[]) => {
  return nodes.filter((node) => node.name.endsWith("A"));
};

export const getGcd = (a: number, b: number): number => {
  return b === 0 ? a : getGcd(b, a % b);
};

export const getLcm = (a: number, b: number) => {
  return (a * b) / getGcd(a, b);
};

export const getResult = (input: string) => {
  const nodes = getNodes(input);
  const directions = getDirections(input);
  let currentNodes = getStartNodes(nodes);
  let paths = [];
  for (let i = 0; i < currentNodes.length; i++) {
    let steps = 0;
    let dirIdx = 0;
    let currentNode = currentNodes[i];
    while (!currentNode.name.endsWith("Z")) {
      dirIdx = dirIdx % directions.length;
      currentNode = getNextNode(nodes, currentNode, directions[dirIdx])[0];
      steps++;
      dirIdx++;
    }
    paths.push(steps);
  }
  return paths.reduce((acc, curr) => getLcm(acc, curr), 1);
};
