import {getYearsInformation, getCountriesInformation, getPropertyInformation, getFilterInformation, getCustomQueryInformation} from '../Models/InformationModel';

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