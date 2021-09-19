import fs from 'fs';

export class HTMLReport {
  print(report: string): void {
    const html = `
    <div>
      <h2>Wins analysis</h2>
      <h3>${report}</h3>
    </div>
    `;

    fs.writeFileSync('report.html', html);
  }
}