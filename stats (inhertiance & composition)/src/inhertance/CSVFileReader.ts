import fs from 'fs';

export abstract class CSVFileReader<T> {
  data: T[] = [];
  constructor(public filename: string) {}
  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: 'utf-8'
      })
      .split('\n')
      .filter(line => line)
      .map(line => {
        return line.split(',')
      })
      .map(this.mapRow);
  }

}