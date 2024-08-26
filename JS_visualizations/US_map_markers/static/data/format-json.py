import json

# Define the input and output file paths
input_file = 'Projects\Project_3\puntos\static\data\waterAir_quality.json'
output_file = 'Projects\Project_3\puntos\static\data\waterAir_quality.geojson'

# Read the original JSON data
with open(input_file, 'r') as f:
    data = json.load(f)

# Convert the data to GeoJSON format
geojson_data = {
    "type": "FeatureCollection",
    "features": []
}

for item in data:
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [item["Longitude"], item["Latitude"]]  # GeoJSON uses [longitude, latitude]
        },
        "properties": {
            "City": item.get("City", ""),
            "State": item.get("State", ""),
            "State_Abbre": item.get("State_Abbre", ""),
            "Country": item.get("Country", ""),
            "Population": item.get("Population", 0),
            "WaterPollution": item.get("WaterPollution", 0.0),
            "AirQuality": item.get("AirQuality", 0.0)
        }
    }
    geojson_data["features"].append(feature)

# Write the GeoJSON data to a file
with open(output_file, 'w') as f:
    json.dump(geojson_data, f, indent=4)

print(f"Converted GeoJSON data has been saved to {output_file}")
