import patterns from './patternData.json'

export default class PatternService {

    static getPatterns() {
        console.log(patterns)
        return patterns
    }

}