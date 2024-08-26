// Function to build metadata panel
function buildMetadata(city, year) {
  d3.json("static/data/California_AQI.json").then((data) => {
    let panel = d3.select("#sample-metadata");
    panel.html("");  // Clear previous content

    // Filter data by selected city and year
    let filteredData = data.filter(d => d.City === city && d.Year == year)[0];

    if (filteredData) {
      Object.entries(filteredData).forEach(([key, value]) => {
        // Check if value is a number and format to 2 decimal places
        if (typeof value === 'number') {
          value = value.toFixed(2);
        }
        panel.append("h6").text(`${key}: ${value}`);
      });
    } else {
      panel.append("h6").text("No data available for the selected city and year.");
    }
  });
}

// Function to build charts (both bar and line charts)
function buildCharts(city, year) {
  d3.json("static/data/California_AQI.json").then((data) => {
    d3.select("#bar").html("");  // Clear previous bar chart
    d3.select("#line").html(""); // Clear previous line chart

    // Filter data by selected city and year
    let filteredData = data.filter(d => d.City === city && d.Year == year)[0];

    if (filteredData) {
      // Bar chart for pollution levels in a specific year
      let barData = [{
        x: ['Ozone', 'Carbon', 'Sulfur', 'Nitrogen'],
        y: [filteredData["Ozone AQI"], filteredData["Carbon Monoxide AQI"], filteredData["Sulfur Dioxide AQI"], filteredData["Nitrogen Dioxide AQI"]],
        type: 'bar',
        marker: {
          color: ['blue', 'green', 'red', 'purple']  // Different colors for each bar
        }
      }];

      let barLayout = {
        title: `Pollution Levels in ${city} in ${year}`,
        xaxis: { title: 'Pollutant' },
        yaxis: { title: 'Concentration' }
      };

      Plotly.newPlot('bar', barData, barLayout);

      // Line chart for pollution trends over the years
      let cityData = data.filter(d => d.City === city);

      let years = cityData.map(d => d.Year);
      let ozoneAQI = cityData.map(d => d["Ozone AQI"]);
      let carbonAQI = cityData.map(d => d["Carbon Monoxide AQI"]);
      let sulfurAQI = cityData.map(d => d["Sulfur Dioxide AQI"]);
      let nitrogenAQI = cityData.map(d => d["Nitrogen Dioxide AQI"]);

      let lineData = [
        {
          x: years,
          y: ozoneAQI,
          mode: 'lines+markers',
          name: 'Ozone AQI',
          line: {color: 'blue'}
        },
        {
          x: years,
          y: carbonAQI,
          mode: 'lines+markers',
          name: 'Carbon Monoxide AQI',
          line: {color: 'green'}
        },
        {
          x: years,
          y: sulfurAQI,
          mode: 'lines+markers',
          name: 'Sulfur Dioxide AQI',
          line: {color: 'red'}
        },
        {
          x: years,
          y: nitrogenAQI,
          mode: 'lines+markers',
          name: 'Nitrogen Dioxide AQI',
          line: {color: 'purple'}
        }
      ];

      let lineLayout = {
        title: `Pollution Trends in ${city} Over the Years`,
        xaxis: { title: 'Year' },
        yaxis: { title: 'AQI Value' }
      };

      Plotly.newPlot('line', lineData, lineLayout);

    } else {
      d3.select("#bar").append("h5").text("No data available for the selected city and year.");
    }
  });
}

// Function to initialize the dashboard
function init() {
  d3.json("static/data/California_AQI.json").then((data) => {
    let cities = [...new Set(data.map(d => d.City))];
    let years = [...new Set(data.map(d => d.Year))];

    let citySelector = d3.select("#selCity");
    cities.forEach(city => {
      citySelector.append("option")
                   .text(city)
                   .property("value", city);
    });

    let yearSelector = d3.select("#selYear");
    years.forEach(year => {
      yearSelector.append("option")
                  .text(year)
                  .property("value", year);
    });

    let firstCity = cities[0];
    let firstYear = years[0];
    buildCharts(firstCity, firstYear);
    buildMetadata(firstCity, firstYear);
  });
}

// Function to handle change in city or year selection
function optionChanged() {
  let selectedCity = d3.select("#selCity").property("value");
  let selectedYear = d3.select("#selYear").property("value");

  buildCharts(selectedCity, selectedYear);
  buildMetadata(selectedCity, selectedYear);
}

// Initialize the dashboard
init();
