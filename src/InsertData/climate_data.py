import pandas as pd
import calendar
import numpy as np
from datetime import datetime
class Data:
    def __init__(self):
        print("INITIALIZING CLASS")       

    # Obtain the csv file containing the data
    def get_world_bank_data(self):
        return pd.read_csv('./world_bank_data.csv', skiprows=3)

    # Convert property to one acceptable by Neo4j when inserting to the database
    def column_name_converter(self):
        dictionary = {
              "Population, total" : "Population", 
              "Marine protected areas (% of territorial waters)" : "MarineProtectedAreas", 
              "Terrestrial protected areas (% of total land area)":"TerrestrialProtectedAreas",
              "Population living in areas where elevation is below 5 meters (% of total population)" : "PopulationWhereElevationIsBelow5Meters",
              "Land area where elevation is below 5 meters (% of total land area)":"LandAreaWhereElevationIsBelow5Meters",
              "Total greenhouse gas emissions (kt of CO2 equivalent)":"GreenhouseGasEmissions",
              "CO2 emissions (kt)" : "CO2Emissions",
              "Energy use (kg of oil equivalent per capita)":"EnergyUse", 
              "Electric power consumption (kWh per capita)":"ElectricPowerConsumption",
              "Renewable energy consumption (% of total final energy consumption)":"RenewableEnergyConsumption", 
              "Electricity production from renewable sources, excluding hydroelectric (% of total)":"ElectricityFromRenewableSources",
              "Electricity production from oil sources (% of total)":"ElectricityFromOilSources",
              "Electricity production from nuclear sources (% of total)":"ElectricityFromNuclearSources",
              "Electricity production from natural gas sources (% of total)":"ElectricityFromNaturalSources",
              "Electricity production from hydroelectric sources (% of total)":"ElectricityFromHydroelectricSources",
              "Electricity production from coal sources (% of total)":"ElectricityFromCoalSources",
              "Forest area (% of land area)":"ForestArea",
              "Arable land (% of land area)":"ArableLand",
              "Agricultural land (% of land area)":"AgriculturalLand"
              }
        return dictionary


    # List of properties used for the application
    def total_data_df(self):
        indicators = ["Population, total", 
              "Marine protected areas (% of territorial waters)", 
              "Terrestrial protected areas (% of total land area)",
              "Population living in areas where elevation is below 5 meters (% of total population)",
              "Land area where elevation is below 5 meters (% of total land area)",
              "Total greenhouse gas emissions (kt of CO2 equivalent)",
              "CO2 emissions (kt)",
              "Energy use (kg of oil equivalent per capita)", 
              "Electric power consumption (kWh per capita)",
              "Renewable energy consumption (% of total final energy consumption)", 
              "Electricity production from renewable sources, excluding hydroelectric (% of total)",
              "Electricity production from oil sources (% of total)",
              "Electricity production from nuclear sources (% of total)",
              "Electricity production from natural gas sources (% of total)",
              "Electricity production from hydroelectric sources (% of total)",
              "Electricity production from coal sources (% of total)",
              "Forest area (% of land area)",
              "Arable land (% of land area)",
              "Agricultural land (% of land area)"]

        raw_total = self.get_world_bank_data()
        # Include only the necessary properties
        raw_total = raw_total[raw_total['Indicator Name'].isin(indicators)]


        # Fill the last years which are NANs
        raw_total.fillna(0, inplace=True)

        # Countries to update for matching with Longitude and Latitude dataset
        countries = {
            "North Macedonia":"Macedonia",
            "Egypt, Arab Rep.":"Egypt",
            "Iran, Islamic Rep.":"Iran",
            "Hong Kong SAR, China" : "Hong Kong",
            "Micronesia, Fed. Sts.":"Micronesia",
            "Russian Federation":"Russia",
            "Yemen, Rep.":"Yemen",
            "Syrian Arab Republic":"Syria",
            "Sao Tome and Principe":"São Tomé and Príncipe",
            "Korea, Rep.":"South Korea",
            "Venezuela, RB":"Venezuela",
            "Virgin Islands (U.S.)":"U.S. Virgin Islands",
            "Korea, Dem. People’s Rep.": "North Korea",
            "Slovak Republic":"Slovakia",
            "Bahamas, The":"Bahamas",
            "Cote d'Ivoire":"Côte d'Ivoire",
            "St. Kitts and Nevis":"Saint Kitts and Nevis",
            "Gambia, The":"Gambia",
            "Macao SAR, China": "Macau",
            "Macedonia ": "Macedonia",
            "Cabo Verde":"Cape Verde",
            "Brunei Darussalam":"Brunei", 
            "Lao PDR":"Laos",
            "St. Lucia": "Saint Lucia",
            "St. Vincent and the Grenadines":"Saint Vincent and the Grenadines",
            "Kyrgyz Republic":"Kyrgyzstan",
        }

        raw_total['Indicator Name'] = raw_total['Indicator Name'].map(self.column_name_converter())
        raw_total['Country Name'] = raw_total['Country Name'].replace(countries)
        
        
        for i, row in raw_total.iterrows():
            # Taken from https://stackoverflow.com/questions/8347048/how-to-convert-string-to-title-case-in-python
            ifor_val = ''.join(x for x in row['Country Name'].title() if not x.isspace())
            raw_total.at[i,'Country Name'] = ifor_val

        return raw_total


if __name__ == '__main__':
    data = Data()
