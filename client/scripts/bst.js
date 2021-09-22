import Node from "./node";

class BST {
  constructor(value) {
    this.root = null;
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
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
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
