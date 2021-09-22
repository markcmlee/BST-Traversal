import React, { useState, useEffect } from "react";
import generateBST from "./scripts/bst";

const App = () => {
  const [tree, setTree] = useState(null);

  const clickGenerateBST = () => {
    const newTree = generateBST();
    setTree(newTree);
  };

  const keys = [];
  keys.push(<div key="h"> {JSON.stringify(tree)} </div>);

  return (
    <main>
      <button type="button" id="generate" onClick={() => clickGenerateBST()}>
        Generate a new Binary Search Tree
      </button>
      <p>{tree && keys}</p>
    </main>
  );
};

export default App;
