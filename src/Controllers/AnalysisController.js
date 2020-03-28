import {drawFromCypher} from './VisualController';
import {getQueryExamples} from './DataController';


// Controller for displaying each Analysis example
// This is where the result format is defined (2D, 3D, Form)
export default function AnalysisController(analysis){
    let examples = getQueryExamples()
    switch(analysis){
        // Example 1
        case 'analysis1':
            drawFromCypher(examples[2], 'Map', analysis)
            break;
        // Example 2 A
        case 'analysis2':
            drawFromCypher(examples[3], '2D', analysis)
            break;
        // Example 2 B
        case 'analysis3':
            drawFromCypher(examples[4], '2D', analysis)
            break;
        // Example 3
        case 'analysis4':
            drawFromCypher(examples[5], '2D', analysis)
            break;
        // Example 4 A
        case 'analysis5':
            drawFromCypher(examples[6], '2D', analysis)
            break;
        // Example 4 B
        case 'analysis6':
            drawFromCypher(examples[7], '2D', analysis)
            break;
        // Example 4 C
        case 'analysis7':
            drawFromCypher(examples[8], '2D', analysis)
            break;
        // Example 5 A
        case 'analysis8':
            drawFromCypher(examples[9], '3D', analysis)
            break;
        // Example 5 B
        case 'analysis9':
            drawFromCypher(examples[10], '3D', analysis)
            break;
        // Example 5 C
        case 'analysis10':
            drawFromCypher(examples[11], '3D', analysis)
            break;
        
        default:
            break;
    }
}