import {getDataFromQuery} from '../Models/DatabaseModel';
export async function getDropDownData(element){
    switch (element){
        case 'properties':
            return getDataFromQuery('MATCH (n) WHERE NOT (labels(n) = ["Year"]) RETURN distinct labels(n)')
        case 'countries':
            return getDataFromQuery('MATCH (c: Country) RETURN c.country_name')
        default:
            break;
    }
}

