import { MatchReader } from "./MatchReader";
import { Summary } from "./Summary";


const matchReader = MatchReader.fromCSV('football.csv');
const summary = Summary.winsAnalysisWithConsoleReport('Main united');

matchReader.load();
summary.buildAndReportTarget(matchReader.matches);