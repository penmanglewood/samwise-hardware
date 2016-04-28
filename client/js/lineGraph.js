// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

var drawLineGraph = function(lineData, chartId, screenWidth) {
    var data = JSON.parse(JSON.stringify(lineData));
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = screenWidth - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;
    
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
    var svg = d3.select("#"+chartId)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
        d.date = new Date(d.timestamp);
        d.close = +d.value;
    });
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    // Add the valueline path.
    svg.append("path")
        .attr("id","line-"+chartId)
        .attr("class", "line")
        .attr("d", valueline(data));
    // Add the X Axis
    svg.append("g")
        .attr("id","x-axis-"+chartId)
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    // Add the Y Axis
    svg.append("g")
        .attr("id","y-axis-"+chartId)
        .attr("class", "y axis")
        .call(yAxis);
};
