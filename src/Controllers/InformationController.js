import {getYearsInformation, getCountriesInformation, getPropertyInformation, getFilterInformation, getCustomQueryInformation} from '../Models/InformationModel';


// Gets the required information from the Information Model 
// for displaying the Pop up box
export function getText(type){
    switch (type){
        case "Years":
            return getYearsInformation();
        case "Countries":
            return getCountriesInformation();
        case "Property":
            return getPropertyInformation();
        case "Filters":
            return getFilterInformation();
        case "CustomQuery":
            return getCustomQueryInformation();
        default:
            break;
    }
}