from neo4j import GraphDatabase
import pandas as pd
from climate_data import Data
import csv
class DataBaseLoader(object):
    
    def __init__(self, uri, user, password):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))
        print("Starting...")
        self.main()
        self.close()

    def close(self):
        self._driver.close()

    # Given a row, it splits the data into trios and inserts it.
    @classmethod
    def add_data(cls, tx, total_data):
        countries = cls.getActualCountries()
        years = range(1960,2019)
        countries_that_dont_match = []
        valid_db_countries = []
        for row in total_data.itertuples():
            years_values = row[5:-2]
            print(row.Index)
            for i in range(0,59):
                if (row._1 not in countries):
                    cls.insert_entry(tx, years[i], years_values[i], row._1, row._3, False)
                elif (row._1 in countries):
                    cls.insert_entry(tx, years[i], years_values[i], row._1, row._3, True)
        print("DONE")

    # Inserts a single entry into the database
    @classmethod
    def insert_entry(cls, tx, year, value, country_name,indicator, is_pure_country):
        return tx.run("MERGE (a:Year {year: $year}) "
               "MERGE (b: "+indicator+" {value: $indicator_value, property: $indicator_name}) "
               "MERGE (c: Country {country_name: $country_name, is_pure_country:$is_pure_country})"
               "MERGE (c)-[:had{in_year:$year}]->(b)-[:in {in_country: $country_name}]->(a)", year =year, 
                                                   indicator_value = value, 
                                                   is_pure_country=is_pure_country, 
                                                   indicator_name = indicator, 
                                                   country_name = country_name).single()

    # Gets the pure countries
    @classmethod
    def getActualCountries(cls):
        actualCountries = []
        with open('../FinalYearProjectData/countriesISOCamelcase.csv', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                actualCountries.append(row['name'])
        return actualCountries


    def main(self):
        
        # Obtain the data
        data = Data()
        total_data = data.total_data_df()
        
        with self._driver.session() as session:
            session.write_transaction(self.add_data, total_data)


example = DatabaseLoader("bolt://localhost:7687", "neo4j", "Neo4jPassword")

