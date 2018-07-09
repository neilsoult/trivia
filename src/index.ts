import { data } from './data';
import { Team, YearData } from './interfaces';
import * as d3 from 'd3';

const content = document.getElementById('content');

data.forEach((team: Team) => {

    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    const h1 = document.createElement('h1');
    h1.innerText = team.name;

    const totalsDl = document.createElement('dl');
    totalsDl.classList.add('totals');

    let meansHtml = `<dt>Lifetime Mean:</dt><dd>${team.shapedData!.mean}</dd>`;
    team.shapedData!.dataByYear.forEach((data: YearData) => {

        meansHtml += `<dt>${data.year} Mean:</dt><dd>${data.mean}</dd>`;

    });

    totalsDl.innerHTML = meansHtml;

    teamDiv.appendChild(h1);
    teamDiv.appendChild(totalsDl);

    content!.appendChild(teamDiv);

    // Set the dimensions of the canvas / graph
    const margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time
    const parseDate = d3.time.format("%d-%b-%y").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

    // Adds the svg canvas
    var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    team.results.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});
