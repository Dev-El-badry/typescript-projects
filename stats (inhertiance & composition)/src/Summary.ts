import { WinsAnalysis } from "./analysis/WinsAnalysis";
import { MatchData } from "./MatchReader";
import { ConsoleReport } from "./reports/ConsoleReport";
import { HTMLReport } from "./reports/HTMLReport";

export interface Analyzer {
  run(matches: MatchData[]): string; 
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  constructor(
    public analyzer: Analyzer,
    public outputTarget: OutputTarget
  ) {}
  
  buildAndReportTarget(matches: MatchData[]) {
    const report = this.analyzer.run(matches);
    this.outputTarget.print(report);
  }

  static winsAnalysisWithHTMLReport(teamName: string) {
    return new Summary(
      new WinsAnalysis(teamName),
      new HTMLReport()
    );
  }

  static winsAnalysisWithConsoleReport(teamName: string) {
    return new Summary(
      new WinsAnalysis(teamName),
      new ConsoleReport()
    );
  }
}
