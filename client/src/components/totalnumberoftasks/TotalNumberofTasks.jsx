import React, { useEffect } from "react";
import * as d3 from "d3";

const TotalNumberofTasks = ({ graphRef, tasks, users }) => {
  useEffect(() => {
    d3.select(graphRef.current).selectAll("*").remove();

    // Users other than admin
    const userswithoutadmin = users.filter((user) => user.name !== "admin");

    // Extract the unique assigned users from the tasks
    const assignedUsers = [
      ...new Set(tasks.map((task) => task.assignedtouser)),
    ];

    // Count the number of tasks for each assigned user
    const userTaskCounts = assignedUsers.map((user) => {
      const count = tasks.filter((task) => task.assignedtouser === user).length;
      return { user, count };
    });

    // Calculate the maximum count
    const maxCount = d3.max(userTaskCounts, (d) => d.count);

    // Set the dimensions and margins of the graph
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    const width = 500 - margin.left - margin.right;
    const height = maxCount * 20 + margin.top + margin.bottom;

    // Create the SVG element
    const svg = d3
      .select(graphRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define the scales and axis
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(10);

    // Set the domain of the scales
    x.domain(userswithoutadmin.map((user) => user.name));
    y.domain([0, 10]);

    // Append the x-axis to the SVG
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dy", "0.75em")
      .attr("dx", "-0.8em")
      .style("text-anchor", "end");

    // Append the y-axis to the SVG
    svg.append("g").call(yAxis);

    // Add the bars to the SVG
    svg
      .selectAll(".bar")
      .data(userTaskCounts)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.user))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth()) // Reduce the width by 4 pixels
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "white"); // Set the color of the bars to white

    // Add a caption to the graph
    svg
      .append("text")
      .attr("class", "graph-caption")
      .text(`Total Tasks: ${tasks.length}`)
      .attr("x", width / 2)
      .attr("y", -10) // Position the caption above the graph
      .attr("text-anchor", "middle") // Center-align the text
      .attr("fill", "white"); // Set the color of the caption to black
  }, [graphRef, tasks, users]);

  return (
    <div className="text-center w-full">
      <h1 className="text-white text-2xl ">Admin Panel</h1>
      <div className="flex justify-center items-center">
        <div ref={graphRef} />
      </div>
    </div>
  );
};

export default TotalNumberofTasks;
