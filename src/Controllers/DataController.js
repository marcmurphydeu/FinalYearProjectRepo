import {getDataFromQuery} from '../Models/DatabaseModel';
export async function getData(element){
    switch (element){
        case 'properties':
            return getDataFromQuery('MATCH (n) WHERE NOT (labels(n) = ["Year"]) RETURN distinct labels(n)')
        case 'countries':
            return getDataFromQuery('MATCH (c: Country) WHERE c.is_pure_country = True ' +
                                     'RETURN c.country_name')
        case 'otherCountries':
            return getDataFromQuery('MATCH (c: Country) WHERE c.is_pure_country = False ' +
                                    'RETURN c.country_name')
        default:
            break;
    }
}

