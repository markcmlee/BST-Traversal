import React, { useState } from "react";
import generateBST from "./scripts/bst";
import DisplayTree from "./components/DisplayTree";
import drawTree from "./scripts/d3tree";
import { preOrder, inOrder, postOrder, bfs } from "./scripts/bstTraversal";

const App = () => {
  const [tree, setTree] = useState(null);
  const [numNodes, setNumNodes] = useState(null);
  const [isTraversalActive, setIsTraversalActive] = useState(false);
  const [traversedResult, setTraversedResult] = useState([]);

  const customArrayMap = (array) => {
    return array.map((el, i) => {
      if (i === 0) return <li key={el.value}>[ {el.value},</li>;
      if (i === array.length - 1) return <li key={el.value}>{el.value} ]</li>;
      return (
        <li key={el.value}>
          {"  "}
          {el.value},
        </li>
      );
    });
  };

  const simpleCustomMap = (array) => {
    return array.map((el, i) => {
      if (i === 0) return <li key={el}>[ {el},</li>;
      if (i === array.length - 1) return <li key={el}>{el} ]</li>;
      return (
        <li key={el}>
          {"  "}
          {el},
        </li>
      );
    });
  };

  const animationTimeout = () => {
    setIsTraversalActive(true);
    setTimeout(() => {
      setIsTraversalActive(false);
    }, numNodes * 500);
  };

  const removeCurrentTree = () => {
    const currentTree = document.querySelector("#currentTree");
    if (currentTree) currentTree.remove();
  };

  const clickGenerateBST = () => {
    removeCurrentTree();
    setIsTraversalActive(false);
    setTraversedResult([]);
    const treeInfo = generateBST();
    setNumNodes(treeInfo[0]);
    setTree(treeInfo[1]);
    drawTree(treeInfo[1].root);
  };

  const clickPreOrder = () => {
    setTraversedResult([]);
    animationTimeout();
    setTraversedResult(simpleCustomMap(preOrder(tree)));
  };

  const clickInOrder = () => {
    setTraversedResult([]);
    animationTimeout();
    const formatted = [tree.root];
    setTraversedResult(customArrayMap(inOrder(formatted)));
  };

  const clickPostOrder = () => {
    setTraversedResult([]);
    animationTimeout();
    const formatted = [tree.root];
    postOrder(formatted);
    setTraversedResult(customArrayMap(postOrder(formatted)));
  };

  const clickBFS = () => {
    setTraversedResult([]);
    animationTimeout();
    setTraversedResult(customArrayMap(bfs(tree)));
  };

  const keys = [];
  keys.push(<div key="h"> {JSON.stringify(tree)} </div>);

  return (
    <main>
      <section id="buttonContainer">
        <button type="button" id="generate" onClick={clickGenerateBST}>
          Generate a new BST
        </button>
        <section id="traversalButtonContainer">
          <button
            type="button"
            className="traversalButton"
            disabled={isTraversalActive}
            onClick={clickPreOrder}
          >
            RUN PREORDER
          </button>
          <button
            type="button"
            className="traversalButton"
            disabled={isTraversalActive}
            onClick={clickInOrder}
          >
            RUN INORDER
          </button>
          <button
            type="button"
            className="traversalButton"
            disabled={isTraversalActive}
            onClick={clickPostOrder}
          >
            RUN POSTORDER
          </button>
          <button
            type="button"
            disabled={isTraversalActive}
            className="traversalButton"
            onClick={clickBFS}
          >
            RUN BFS
          </button>
        </section>
      </section>

      <section id="treeArea">
        <ul id="traversedResult">{traversedResult}</ul>
        <DisplayTree />
      </section>
    </main>
  );
};

export default App;
