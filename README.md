# Belly Button Biodiversity Dashboard:

This is a full stack app with html, js, css, python and sqlite files.

* Use Plotly.js to build interactive charts for your dashboard.

  * Create a PIE chart that uses data from your samples route (/samples/<sample>) to display the top 10 samples.

    * Use sample_values as the values for the PIE chart.

    * Use otu_ids as the labels for the pie chart.

    * Use otu_labels as the hovertext for the chart.
    
  * Create a Bubble Chart that uses data from your samples route (/samples/<sample>) to display each sample.

    * Use otu_ids for the x values.

    * Use sample_values for the y values.

    * Use sample_values for the marker size.

    * Use otu_ids for the marker colors.

    * Use otu_labels for the text values.
    
  * Display the sample metadata from the route /metadata/<sample>

    * Display each key/value pair from the metadata JSON object somewhere on the page.

  * Update all of the plots any time that a new sample is selected.
  
  * Deploy Flask app to Heroku: [Belly Button Biodiversity Dashboard](https://belly-button-biodiversity-zg.herokuapp.com/)
  
  * Adapt the Gauge Chart from [here](https://plot.ly/javascript/gauge-charts/) to plot the Weekly Washing Frequency obtained from the /metadata/<sample>route.
  
  * Use Flask API starter code to serve the data needed for plots.
  
## Usage:

Please navigate directly to showcased website to interact with Belly Button Biodiversity dashboard.
