import * as d3 from "d3";

const drawTree = (data) => {
  const width = window.innerWidth;
  const height = Math.floor(0.9 * window.innerHeight);

  const svg = d3
    .select("#d3tree")
    .append("svg")
    .attr("id", "currentTree")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 1025 1010`)
    .append("g")
    .attr("transform", `translate(0, 80)`);

  let i = 0;
  const duration = 750;

  const treeMap = d3.tree().size([width, height]);

  const root = d3.hierarchy(data, (d) => {
    return d.children;
  });

  root.x0 = Math.floor(width / 2);
  root.y0 = 0;

  const update = (source) => {
    // Assign the x and y position for the nodes
    const treeData = treeMap(root);

    // Compute the new tree layout
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    nodes.forEach((d) => (d.y = d.depth * 100));

    // updating the nodes
    const node = svg
      .selectAll("g.node")
      .data(nodes, (d) => d.id || (d.id = ++i));

    // Enter any new nodes at the parent's previous position
    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", (d) => (d.data.value === "e" ? "hidden" : "node"))
      .attr("id", (d) => {
        const id = `node${d.data.value}`;
        return id;
      })
      .attr("transform", (d) => `translate(${source.x0}, ${source.y0})`);

    // Add circle for the nodes
    nodeEnter
      .append("circle")
      .attr("class", "node")
      .attr("r", 1e-6)
      .attr("value", (d) => {
        if (d.data.value === "e") return "";
        return d.data.value;
      })
      .style("fill", (d) => (d._children ? "orange" : "#fff"));
    // .style("fill", (d) => {
    //   return d.data.value !== "e" ? "#fff" : "gray";
    // });

    nodeEnter
      .append("text")
      .attr("dy", "0")
      .attr("dx", "0")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("value", (d) => {
        if (d.data.value === "e") return "";
        return d.data.value;
      })
      .text((d) => {
        if (d.data.value === "e") return "n";
        return d.data.value;
      });

    // Update
    const nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position of the nodes
    nodeUpdate
      .transition()
      .duration(duration)
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    // Update the node attributes and style
    nodeUpdate.select("circle.node").attr("r", "30");

    // Remove any exiting nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr("transform", (d) => `translate(${source.x}, ${source.y})`)
      .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    /* LINKS SECTION */

    // Update the links
    const link = svg.selectAll("path.link").data(links, (d) => d.id);

    const linkEnter = link
      .enter()
      .insert("path", "g")
      .style("stroke", "black")
      .attr("class", (d) => (d.data.value === "e" ? "link hidden" : "link"))
      .attr("d", (d) => {
        const o = {
          x: source.x0,
          y: source.y0,
        };
        return diagonal(o, o);
      });

    // Update
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(duration)
      .attr("d", (d) => diagonal(d, d.parent));

    // Remove any existing links
    const linkExit = link
      .exit()
      .transition()
      .duration(duration)
      .attr("d", (d) => {
        let o = {
          x: source.x,
          y: source.y,
        };
      })
      .remove();

    // Store the old positions for transition
    nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Create a diagonal path from parent node to child nodes
    function diagonal(s, d) {
      const path = `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`;
      return path;
    }
  };

  update(root);
};

export default drawTree;
