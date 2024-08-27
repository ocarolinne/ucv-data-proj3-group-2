// Fetch the JSON data
fetch('California_AQI.json')
  .then(response => response.json())
  .then(data => {
    // check data is loaded properly
    console.log("Data loaded:", data);

    // Filter data for a specific year (2020)
    const year = 2020;
    const filteredData = data.filter(d => d.Year === year);

    // Sort the filtered data in descending order by Nitrogen Dioxide AQI
    filteredData.sort((a, b) => b["Nitrogen Dioxide AQI"] - a["Nitrogen Dioxide AQI"]);

    // Check if the filtered data is correct and sorted
    console.log("Sorted Data:", filteredData);

    // Extract the city names and Nitrogen Dioxide AQI values
    const cities = filteredData.map(d => d.City);
    const nitrogenDioxideAqi = filteredData.map(d => d["Nitrogen Dioxide AQI"]);

    // Check if the correct values are extracted
    console.log("Cities:", cities);
    console.log("Nitrogen Dioxide AQI:", nitrogenDioxideAqi);

    // Create the chart
    const ctx = document.getElementById('cityComparisonChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar', // can change this to 'line' or 'radar' if desired
      data: {
        labels: cities, // City names as labels
        datasets: [{
          label: `Nitrogen Dioxide AQI in ${year}`,
          data: nitrogenDioxideAqi, // AQI values as data
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nitrogen Dioxide AQI'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Cities'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Comparison of Nitrogen Dioxide AQI for Different Cities in ${year}`
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Nitrogen Dioxide AQI: ${context.raw}`;
              }
            }
          }
        }
      }
    });
  })
  .catch(error => console.error('Error loading the data:', error));
