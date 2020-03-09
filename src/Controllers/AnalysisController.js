import {drawFromCypher} from './VisualController';
import {getQueryExamples} from './DataController';

export default function AnalysisController(analysis){
    let examples = getQueryExamples()
    switch(analysis){
        case 'analysis1':
            drawFromCypher(examples[2], 'Map', analysis)
            break;
        case 'analysis2':
            drawFromCypher(examples[3], '2D', analysis)
            break;
        case 'analysis3':
        drawFromCypher(examples[4], '2D', analysis)
            break;
        case 'analysis4':
            drawFromCypher(examples[5], '2D', analysis)
            break;
        case 'analysis5':
            drawFromCypher(examples[6], '2D', analysis)
            break;
        case 'analysis6':
            drawFromCypher(examples[7], '2D', analysis)
            break;
        case 'analysis7':
            drawFromCypher(examples[8], '2D', analysis)
            break;
        case 'analysis8':
            drawFromCypher(examples[9], '3D', analysis)
            break;
        case 'analysis9':
            drawFromCypher(examples[10], '3D', analysis)
            break;
        case 'analysis10':
            drawFromCypher(examples[11], '3D', analysis)
            break;
        default:
            break;
    }
}