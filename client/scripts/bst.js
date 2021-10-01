import Node from "./node";

class BST {
  constructor(value) {
    this.root = new Node(value);
  }

  insert(value) {
    // create node from value
    const node = new Node(value);
    // if the tree's root is null, set the root to the new node
    if (this.root == null || this.root.value == null) {
      this.root = node;
    }

    let currentNode = this.root;
    while (currentNode) {
      // If tree contains value return
      if (currentNode.value == value) {
        return;
      }
      // value is less than current.value
      else if (value < currentNode.value) {
        if (
          currentNode.children[0] == null ||
          currentNode.children[0].value === "e"
        ) {
          currentNode.children[0] = node;
          if (currentNode.children[1] == null) {
            currentNode.children[1] = new Node("e");
          }
          return;
        }
        // current = current.left;
        currentNode = currentNode.children[0];
      }
      // value is greater than current.value
      else {
        if (
          currentNode.children[1] == null ||
          currentNode.children[1].value === "e"
        ) {
          if (!currentNode.children[0]) {
            currentNode.children[0] = new Node("e");
          }
          currentNode.children[1] = node;
          return;
        }
        currentNode = currentNode.children[1];
      }
    }
  }
}

const randomNum = () => Math.ceil(Math.random() * 10) + 14;

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
  return [numNodes, tree];
};

export default generateBST;
