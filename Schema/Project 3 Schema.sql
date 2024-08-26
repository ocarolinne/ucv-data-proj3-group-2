CREATE TABLE citycoordinates (
    city VARCHAR(100),
    state_Abbre CHAR(2),
    type VARCHAR(100),
    population BIGINT,
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
	PRIMARY KEY (city, state_abbre)
);


CREATE TABLE airquality(
    city VARCHAR(100),
    region VARCHAR(100),
    country VARCHAR(100),
    airquality NUMERIC,
    waterpollution NUMERIC,
    state_abbre CHAR(2)
);

CREATE TABLE CityPollutionMetrics (
    city VARCHAR(100),
    state VARCHAR(100),
    state_abbre CHAR(2),
    county VARCHAR(100),
    ozone_O3 NUMERIC,
    ozone_O3_AQI NUMERIC,
    carbon_Monoxide_CO NUMERIC,
    carbon_Monoxide_CO_AQI NUMERIC,
    sulfur_Dioxide_SO2 NUMERIC,
    sulfur_Dioxide_SO2_AQI NUMERIC,
    nitrogen_Dioxide_NO2 NUMERIC,
    nitrogen_Dioxide_NO2_AQI NUMERIC,
    period VARCHAR(10),  
    year SMALLINT
);


select * from citycoordinates
select * from airquality
select * from CityPollutionMetrics
