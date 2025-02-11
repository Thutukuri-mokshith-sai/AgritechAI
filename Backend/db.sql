create database agritechai;
show agritechai;
CREATE TABLE buffer_stock_details (
    id INT NOT NULL,
    godown_id VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE consumerbehaviordata (
    Consumer_ID INT NOT NULL,
    Date DATE NOT NULL,
    Region_ID INT NOT NULL,
    Preferred_Commodity VARCHAR(255),
    Price_Sensitivity ENUM('YES', 'NO'),
    PRIMARY KEY (Consumer_ID)
);

CREATE TABLE contact_form (
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE cropproductiondata (
    Crop_ID INT NOT NULL,
    Region_ID INT NOT NULL,
    Sowing_Date DATE,
    Harvest_Date DATE,
    Yield_Per_Hectare DECIMAL(10, 2),
    Total_Production DECIMAL(10, 2),
    PRIMARY KEY (Crop_ID)
);

CREATE TABLE globalmarketdata (
    Commodity_ID INT NOT NULL,
    Date DATE NOT NULL,
    Global_Price DECIMAL(10, 2),
    Trade_Policy_Impact TEXT,
    PRIMARY KEY (Commodity_ID)
);

CREATE TABLE governmentpolicydata (
    Policy_ID INT NOT NULL,
    Commodity_ID INT NOT NULL,
    Effective_Date DATE NOT NULL,
    Policy_Type VARCHAR(255),
    Policy_Description TEXT,
    PRIMARY KEY (Policy_ID)
);

CREATE TABLE historicalpricedata (
    Commodity_ID INT NOT NULL,
    Date DATE NOT NULL,
    Region_ID INT NOT NULL,
    Retail_Price DECIMAL(10, 2) NOT NULL,
    Wholesale_Price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (Commodity_ID)
);

CREATE TABLE importexportdata (
    Commodity_ID INT NOT NULL,
    Date DATE NOT NULL,
    Import_Quantity DECIMAL(10, 2),
    Export_Quantity DECIMAL(10, 2),
    Tariff_Rate DECIMAL(10, 2),
    PRIMARY KEY (Commodity_ID)
);

CREATE TABLE marketintelligencedata (
    Commodity_ID INT NOT NULL,
    Date DATE NOT NULL,
    Supply_Disruption TEXT,
    Demand_Change DECIMAL(10, 2),
    Market_Sentiment ENUM('Positive', 'Negative', 'Neutral'),
    PRIMARY KEY (Commodity_ID)
);

CREATE TABLE market_details (
    id INT NOT NULL,
    market_id VARCHAR(255) NOT NULL,
    market_name VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE supplychaindata (
    Commodity_ID INT NOT NULL,
    Region_ID INT NOT NULL,
    Storage_Capacity DECIMAL(10, 2),
    Transport_Cost_Per_Unit DECIMAL(10, 2),
    PRIMARY KEY (Commodity_ID)
);

CREATE TABLE users (
    id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User') NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE weatherclimatedata (
    Date DATE NOT NULL,
    Region_ID INT NOT NULL,
    Temperature DECIMAL(10, 2),
    Rainfall DECIMAL(10, 2),
    Humidity DECIMAL(10, 2),
    PRIMARY KEY (Region_ID)
);
