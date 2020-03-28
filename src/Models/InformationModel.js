import React from 'react';

// Returns HTML element containing description for years component
export function getYearsInformation(){
    return (
        <div>
            This returns the years sent to the query.
            You can choose from a range of years or use the slider
            to iterate through each year individually.
        </div>
    )
}

// Returns HTML element containing description for countries information
export function getCountriesInformation(){
    return (
        <div>
            You can select any number of countries. The countries on the
            left dropdown correspond to actual countries. The right dropdown
            contains other groups. For example, choosing the World will give
            data about all the countries combined. 
            <br/>
            <div id ="note">
                Note: The elements from the right dropdown are not possible to display in the map.
            </div>
        </div>
    )
}

// Returns a HTML element containing the property information
export function getPropertyInformation(){
    // List of all full properties (instead of the abbreviated values on the dropdown)
    let list = ["Population, total", 
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
            return (
                <div>
                    These are individual data attributes that influence the environment.
                    The information is listed as follows:
                    <ol>
                        {list.map(elem=>{
                            return (<li key={elem} id="smallerSize">{elem}</li>)
                        })}
                    </ol>
                    
                </div>
            )
}

// Return HTML element containing the filter and order by component.
export function getFilterInformation(){
    return (
        <div>
            'Limit' represents the amount of information to display. For example, LIMIT 1 
            will return the least possible information. 'Order by' represents if you would rather
            see the data in increasing or decreasing order based on the values of the properties.
        </div>
    )
}

// Returns HTML element containing the information needed for the custom query
// including the database model. 
export function getCustomQueryInformation(){
    return (
        <div>
            Here you can create your own query. The structure of the database is:
            <br/> 
            <strong>(:Country)-[:had]->(:Property)-[:in]->(:Year)</strong>
            <br/>
            <hr/>
            <div> The dropdown contains example queries which can be used. Most of these examples correspond
                  to the queries used in <strong>Analysis</strong>. 
            </div>
            
            <div id ="note">
                Note: The property has to be a value such as the ones available 
                in the properties dropdown.
            </div>

        </div>
    )
}