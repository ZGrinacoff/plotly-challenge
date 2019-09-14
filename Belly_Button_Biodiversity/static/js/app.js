function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  var metadataURL = "/metadata/" + sample;
  // Use d3 to select the panel with id of `#sample-metadata`
  var panelMetadata = d3.select("#sample-metadata");
  // Use `.html("") to clear any existing metadata
  panelMetadata.html("");
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  d3.json(metadataURL).then(function (data) {
    Object.entries(data).forEach(([key, value]) => {
      panelMetadata.append("h5").text(`${key}: ${value}`);
    });
    
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

    var data = [{domain: {x: [0, 1], y: [0, 1]}, value: data.WFREQ,
    title: {text: "Belly Button Washing Frequency Scrubs Per Week", font: {size: 14}},
    type: "indicator", mode: "gauge+number+delta",
    delta: {reference: 9, increasing: {color: "green"}},
    gauge:
      {axis: {range: [0, 10]}, steps: [{range: [0, 5], color: "lightgray"},
      {range: [5, 8], color: "gray"}], threshold: {line: {color: "red", width: 4},
      thickness: 0.75, value: 9}}}];

    var gaugeLayout = {width: 400, height: 500, margin: {t: 0, b: 0}};
    Plotly.newPlot("gauge", data, gaugeLayout);

  });

}

function buildCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  var chartsURL = "/samples/" + sample;
  d3.json(chartsURL).then((data) => {
    // Build a Bubble Chart using the sample data
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }
    };
    var trace1 = [trace1];
    var layout = {
      title: "OTU ID",
      showlegend: false,
      height: 600,
      width: 1500
    };
    Plotly.newPlot("bubble", trace1, layout);
    
    // Build a Pie Chart
    // Use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var trace2 = [{
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      hovertext: data.otu_labels.slice(0, 10),
      type: "pie",
      marker: {
        colorscale: "Earth"
      }
    }];
    var layout2 = {
      showlegend: true,
      height: 400,
      width: 500
    };
    Plotly.newPlot("pie", trace2, layout2);

  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    console.log(firstSample)
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
