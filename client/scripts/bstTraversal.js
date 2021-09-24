import * as d3 from "d3";

const animeDuration = 500;

const resetTraversal = () => {
  d3.selectAll(".node")
    .selectAll("circle")
    .style("stroke", "orange")
    .style("fill", "#fff")
    .attr("stroke-width", "3");

  d3.selectAll(".node")
    .selectAll("text")
    .attr("fill", "black")
    .attr("font", "2.5em");
};

const visitElement = (element, animFactor) => {
  console.log(element.value);
  d3.select(`#node${element.value}`)
    .select("text")
    .transition()
    .duration(animeDuration)
    .delay(animeDuration * animFactor)
    .attr("fill", "orange");

  d3.select(`#node${element.value}`)
    .select("circle")
    .transition()
    .duration(animeDuration)
    .delay(animeDuration * animFactor)
    .style("stroke", "black")
    .style("fill", "black");
};

const preOrder = (data) => {
  resetTraversal();
  const stack = [];
  let animFactor = 0;

  stack.push(data.root);
  while (stack.length) {
    const element = stack.pop();
    visitElement(element, animFactor);
    if (element.value !== "e") animFactor += 1;
    if (element.children.length !== 0) {
      for (let i = 0; i < element.children.length; i++) {
        stack.push(element.children[element.children.length - i - 1]);
      }
    }
  }
};

const inOrderHelper = (data) => {
  let array = [];
  data.forEach((el) => {
    if (typeof el.value === "number") {
      const obj = {};
      obj["value"] = el.value;
      array.push(obj);
    }
    if (el.children.length > 0) {
      array = array.concat(inOrderHelper(el.children));
    }
  });

  return array;
};

const inOrder = (data) => {
  resetTraversal();
  const array = inOrderHelper(data);
  console.log(array);
  let animFactor = 0;

  array.forEach((el) => {
    visitElement(el, animFactor);
    animFactor += 1;
  });

  return array;
};

const postOrderHelper = (data) => {
  let array = [];

  data.forEach((el) => {
    if (el.children.length === 0) {
      if (typeof el.value === "number") {
        const obj = {};
        obj["value"] = el.value;
        array.push(obj);
      }
    } else {
      array = array.concat(postOrderHelper(el.children));
      const obj = {};
      obj["value"] = el.value;
      array.push(obj);
    }
  });

  return array;
};

const postOrder = (data) => {
  resetTraversal();
  const array = postOrderHelper(data);
  let animFactor = 0;

  array.forEach((el) => {
    visitElement(el, animFactor);
    animFactor += 1;
  });

  return array;
};

const bfs = (data) => {
  resetTraversal();

  const queue = [];
  let animFactor = 0;
  queue.push(data.root);
  while (queue.length) {
    const el = queue.shift();
    visitElement(el, animFactor);
    if (typeof el.value === "number") animFactor += 1;
    if (el.children.length !== 0) {
      for (let i = 0; i < el.children.length; i++) {
        queue.push(el.children[i]);
      }
    }
  }
};

export { resetTraversal, bfs, preOrder, inOrder, postOrder };
