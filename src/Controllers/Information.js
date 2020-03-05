import React from 'react'

export function getText(type){
    switch (type){
        case "Years":
            return (
                <div>
                    This returns the years sent to the query.
                    You can choose from a range of years or use the slider
                    to iterate through each year individually.
                </div>
            )
        case "Countries":
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
        case "Property":
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
        case "Filters":
            return (
                <div>
                    'Limit' represents the amount of information to display. For example, LIMIT 1 
                    will return the least possible information. 'Order by' represents if you would rather
                    see the data in increasing or decreasing order based on the values of the properties.
                </div>
            )
        case "CustomQuery":
            return (
                <div>
                    Here you can create your own query. The structure of the database is:
                    <br/> 
                    <strong>(:Country)-[:had]->(:Property)-[:in]->(:Year)</strong>
                    <br/>
                    <div id ="note">
                        Note: The property has to be a value such as the ones available 
                        in the properties dropdown.
                    </div>

                </div>
            )
        default:
            break;
    }
}