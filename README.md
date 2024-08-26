# Air Pollution: California's Journey In Air Quality
---

## Introduction
According to the World Health Organization, air pollution is a global public health problem. Air pollution has a great impact on the environment, the health of people and also the economy. With the datasets collected, we obtained air quality data from all over the world and decided to focus on the US, specifically California. Through the datasets of Water and Air Quality, the Census and US Pollution - our focus is to educate and aware the public on what pollutants contribute to air pollution and the decline over the years using California's history/journey.


## Project Overview
The project focuses on the general air quality of the United States, the focus on California and the gasses that affect cities across the state, and lastly the analysis of California's trend over the years with the impact of California's Reduction Plan. In this repository we have included: 

- waterAir_quality.ipynb File: Shares the codes created to filter/clean our datasets, along with merging the three datasets collected. This has allowed our group to create the visuals and to give us information on trends over the years and the concentration of gasses in the state of California.
- CSVs: Of the original data and ones created
- Air Quality Schema and Pictures of Tables/ERD: Created using PostGres 
- USA Visual Json File : Code created by the CSV created through the IPYNB file
- California Dashboard JSON File: Code created by the CSV created through the IPYNB file
- California's Air Quality Improvement Over Time visual
- Air Pollution: California's Journey in Air Quality

# Instructions for Using and Interacting with the Project

## JS_Visualizations Folder
This folder contains two visualizations that utilize different datasets.

---

### US_Map_Markers Folder
- **Data**: This visualization analyzes data from `waterAir_quality.json` and converts it into `geojson` format using Python for use in JavaScript.
- **JS**: It includes a street map and a topography map, which can be toggled to demonstrate the impact of topography on pollution, especially in outliers like California's Central Valley cities. Utilizes 
- **Features**:
  - Marker size reflects population.
  - Marker color represents air quality, ranging from 0 (poor air quality) to 100 (excellent air quality).
- **Dataset**: The cities are mapped from the `waterAir_quality.json` dataset ([Kaggle dataset link](https://www.kaggle.com/datasets/patricklford/water-and-air-quality)).
- **Interaction**:
  - Open `index.html` with Live Server.
  - Hover over cities and click on markers to see tooltips containing the city name, population, and air quality.
  - Toggle between street and topography views in the top-right corner. You can also toggle population marker sizes on or off.

---

### California_Dashboard Folder
- **Data**: This dashboard analyzes data from `pollution_2000_2023.csv`, filtering for California, and outputs a `California_AQI.json` file.
- **JS**: An interactive dashboard where users can select a city and year from dropdown menus. A metadata panel displays relevant information based on the selection.
- **Features**:
  - Bar graph: Shows air quality data for the selected California city and year.
  - Line graph: Displays the air quality trend over time for the selected city.
- **Interaction**: Open `index.html` with Live Server.

---

### CA_City_comparison Folder
- **Data**: This visualization uses data from `California_AQI.json` to compare the Ozone Air Quality Index (AQI) across different cities in California for a specific year(2020).
- **JS**: The `app.js` script fetches the data, filters it by year, and creates a bar chart using Chart.js to visualize the Ozone AQI for multiple cities.
- **Features**:
  - Bar chart displays Ozone AQI values for selected cities.
  - The chart is generated dynamically based on the data filtered for the year 2020 (or any other specified year).
  - The chart is fully interactive, with tooltips displaying detailed AQI information when hovering over the bars.
- **Dataset**: The cities and their corresponding AQI data are sourced from the `California_AQI.json` dataset.
- **Interaction**:
  - Open `index.html` with Live Server.
  - The chart will automatically display a comparison of Ozone AQI for different cities in the selected year.
  - Hover over the bars to see detailed Ozone AQI values for each city.
  


## Conclusion
With the research and the work done in creating this project, we have concluded that California has a great model in improving the air quality by reducing gases. The United States is part of the Global Public Health problem of air pollution. (need to finish)


## Environment Setup

Clone the repository to your local machine:
```
cd </path/to/your/directory>
git clone https://github.com/ocarolinne/ucv-data-proj3-group-2.git
cd ucv-data-proj3-group-2
```

## Prerequisites
* Programming Language: Python 3.9+

* Libraries:

  * Data Processing: Pandas, NumPy
  * Visualization: Matplotlib, Seaborn, D3.js, Leaflet, Plotly, Chart.js


## Data

All datasets used in this project were sourced from Kaggle:

- "Cities1.csv": https://www.kaggle.com/datasets/patricklford/water-and-air-quality

- "us2021census.csv" https://www.kaggle.com/datasets/darinhawley/us-2021-census-cities-populations-coordinates

- "pollution_2000_2023.csv": https://www.kaggle.com/datasets/guslovesmath/us-pollution-data-200-to-2022


### References for External Code Support
- **JSON to GeoJSON Conversion**: Assistance from AI and Google was used to convert `json` data into `geojson` format.
- **Chart.js Implementation**: Support from AI was utilized to help implement the `Chart.js` visualization.


## ucv-data-proj3-group-2

UCBerkeley-Ext Data Analytics Bootcamp Project 3 Group 2

## Team Members
- Alexa D
- Caroline M
- David H
- Yul L

