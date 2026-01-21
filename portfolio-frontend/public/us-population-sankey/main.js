
var vm = new Vue({
  el: '#app',
  data: {
    minYear: 2020,
    maxYear: 2060
  },
  computed: {
    sliderMin: {
      get: function () {
        var val = parseInt(this.minYear);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val > this.maxYear) {
          this.maxYear = val;
        }
        this.minYear = val;
        loadDiagram(this.minYear, this.maxYear)
      }
    },
    sliderMax: {
      get: function () {
        var val = parseInt(this.maxYear);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val < this.minYear) {
          this.minYear = val;
        }
        this.maxYear = val;
        loadDiagram(this.minYear, this.maxYear)
      }
    }
  }

});

function loadDiagram(beginYear, endYear) {
  d3.select("#sankey_diagram").remove();

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "sankey_diagram")
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

  // load the data
  var graph = getData(beginYear, endYear)

  // Constructs a new Sankey generator with the default settings.
  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(0);

  // add in the links
  var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .style("stroke", function (d) { return d.cc; })
    .attr("d", sankey.link())
    .style("stroke-width", function (d) { return Math.max(1, d.dy); })
    .sort(function (a, b) { return b.dy - a.dy; });


  // add in the nodes
  var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.drag()
      .subject(function (d) { return d; })
      .on("start", function () { this.parentNode.appendChild(this); })
      .on("drag", dragmove));

  // add the rectangles for the nodes
  node.append("rect")
    .attr("height", function (d) { return d.dy; })
    .attr("width", sankey.nodeWidth())
    .style("fill", function (d) { return d.cc; })
    .text(function (d) { return d.name + "\n" + d.value; });

  // add in the title for the nodes
  node.append("text")
    .attr("y", function (d) { return d.dy / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text(function (d) { return d.name.length > 1 ? d.name + ": " + d.value : ""; }) // skips the label for the middle node
    .filter(function (d) { return d.x < width / 2; })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform","translate("+ d.x + ","+ (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
}

//init the diagram
loadDiagram(2020, 2060)