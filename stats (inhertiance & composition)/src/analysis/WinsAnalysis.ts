import { MatchData } from "../MatchReader";
import { MatchResult } from "../MatchResult";

export class WinsAnalysis {
  constructor(public teamName: string) {}

  run(matches: MatchData[]): string {
    let wins = 0;

    for(let match of matches) {
      if(match[1] === this.teamName && match[5] === MatchResult.HomeWin) {
        wins ++;
      } else if(match[2] === this.teamName && match[5] === MatchResult.AwayWin) {
        wins ++;
      }
    }

    return `team ${this.teamName} wins ${wins} games`;
  }
}