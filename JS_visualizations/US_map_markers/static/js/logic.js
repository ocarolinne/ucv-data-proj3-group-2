// Define tile layers for the street map and topographic map
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the map object with options centered in the US, default to streetMap
let myMap = L.map("map", {
  center: [39.8283, -98.5795],  // Centered on the US
  zoom: 5,
  layers: [streetMap]  // Default layer is streetMap
}); 

// Define baseMaps to allow switching between Street and Topography layers
let baseMaps = {
  "Street Map": streetMap,
  "Topographic Map": topoMap
};

// Placeholder for city layer and fixed size air quality layer
let cityLayer, fixedSizeLayer;

// Add a layer control to the map with an empty overlay
let overlayMaps = {};
let layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

// Define a function to set the marker size based on city population
function markerSize(population) {
  return Math.sqrt(population) * 0.035;  // Adjust size scaling factor as needed
}

// Define a function to set a fixed marker size
function fixedMarkerSize() {
  return 6;  // Fixed size for the markers when population density layer is selected
}

// Define a function to interpolate color based on Air Quality
function markerColor(airQuality) {
  if (airQuality > 90) return "#A3F600";   // Green
  else if (airQuality > 80) return "#DCFFA3";  // Light Green
  else if (airQuality > 60) return "#F7DB11";  // Yellow
  else if (airQuality > 40) return "#FDB72A";  // Orange
  else if (airQuality > 20) return "#FCA35D";  // Dark Orange
  else if (airQuality === 0) return "#FF5F65";  // light Red
  else return "#FF5F65";  // Red
}

// Fetch and use the GeoJSON data for city markers
d3.json("static/data/waterAir_quality.geojson").then(function(infoRes) {
  // City Air Quality Layer with variable marker sizes based on population
  cityLayer = L.geoJson(infoRes, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.Population),  // Circle size based on population
        fillColor: markerColor(feature.properties.AirQuality),  // Color based on air quality
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        `<h3>${feature.properties.City}</h3>
        <hr>
        <p>State: ${feature.properties.State}</p>
        <p>Population: ${feature.properties.Population}</p>
        <p>Air Quality: ${feature.properties.AirQuality}</p>`
      );
    }
  });

  // Population Density Layer with fixed marker size but retaining color based on air quality
  fixedSizeLayer = L.geoJson(infoRes, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: fixedMarkerSize(),  // Fixed size for all markers
        fillColor: markerColor(feature.properties.AirQuality),  // Maintain color based on air quality
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        `<h3>${feature.properties.City}</h3>
        <hr>
        <p>State: ${feature.properties.State}</p>
        <p>Population: ${feature.properties.Population}</p>
        <p>Air Quality: ${feature.properties.AirQuality}</p>`
      );
    }
  });

  // Add layers to the layer control
  overlayMaps["City Air Quality"] = cityLayer;
  overlayMaps["Fixed Size Air Quality"] = fixedSizeLayer;

  // Add default layers to the map
  cityLayer.addTo(myMap);

  // Update the layer control
  layerControl.addOverlay(cityLayer, "City Air Quality + Population");
  layerControl.addOverlay(fixedSizeLayer, "Fixed Size Air Quality");
});

// Create a legend control for Air Quality
let legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  // Air Quality ranges for the legend
 // let airQualityLevels = [0, 20, 40, 60, 80, 90, 100];
  let airQualityLevels = [100, 90, 80, 60, 40, 20, 0];

  // Corresponding colors for the ranges (same as markerColor function)
  let colors = [
    "#A3F600",   // 91-100
    "#DCFFA3",  // 81-90
    "#F7DB11",  // 61-80
    "#FDB72A",  // 41-60
    "#FCA35D",  // 21-40
    "#FF5F65"  // 1-20
   // "#FF5F65"  // 0 
  ];

  let title = L.DomUtil.create("h4", "legend-title");
  title.innerText = "Air Quality Level";
  div.appendChild(title);

  // Loop through airQualityLevels and create the legend
  for (let i = 0; i < airQualityLevels.length - 1; i++) {
    let item = L.DomUtil.create("div", "legend-item");

    let colorBox = L.DomUtil.create("span", "legend-color");
    colorBox.style.backgroundColor = colors[i];
    item.appendChild(colorBox);

    let label = L.DomUtil.create("span", "legend-label");
    label.innerText = airQualityLevels[i] + (airQualityLevels[i + 1] ? '–' + airQualityLevels[i + 1] : '+');
    item.appendChild(label);

    div.appendChild(item);
  }

  return div;
};

// Adding legend to the map
legend.addTo(myMap);
