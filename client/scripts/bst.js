import Node from "./node";

class BST {
  constructor(value) {
    this.root = new Node(value);
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (current) {
      if (current.value === value) return;
      if (current.value > value) {
        if (current.children[0] == null || current.children[0].value === "e") {
          current.children[0] = newNode;
          if (current.children[1] == null) {
            current.children[1] = new Node("e");
          }
          return this;
        }
        current = current.children[0];
      } else {
        if (current.children[1] == null || current.children[1].value === "e") {
          if (!current.children[0]) {
            current.children[0] = new Node("e");
          }
          current.children[1] = newNode;
          return this;
        }
        current = current.children[1];
      }
    }
  }
}

const randomNum = () => Math.ceil(Math.random() * 10) + 15;

const randomValue = () => Math.ceil(Math.random() * 40);

const generateBST = () => {
  const cache = {};
  const numNodes = randomNum();
  const tree = new BST(randomValue());
  cache[tree.value] = true;

  while (Object.keys(cache).length !== numNodes) {
    const newValue = randomValue();
    if (!cache[newValue]) {
      cache[newValue] = true;
      tree.insert(newValue);
    }
  }
  return tree;
};

export default generateBST;
