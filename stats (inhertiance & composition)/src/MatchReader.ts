import { WinsAnalysis } from "./analysis/WinsAnalysis";
import { CSVFileReader } from "./CSVFileReader";
import { MatchResult } from "./MatchResult";
import { ConsoleReport } from "./reports/ConsoleReport";
import { Summary } from "./Summary";
import { dataStringToDate } from "./utils";

export type MatchData = [Date, string, string, number, number, MatchResult, string];

interface DataReader {
  data: string[][];
  read(): void;
}

export class MatchReader {
  matches: MatchData[] = []
  constructor(public reader: DataReader) {}

  static fromCSV(fileName: string) {
    return new MatchReader(new CSVFileReader(fileName));
  }

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map(row => {
      return [
        dataStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResult,
        row[6]
      ];
    });
  }
}