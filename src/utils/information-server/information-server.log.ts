export const informationServerLog = (port: number, hostname: string, env: string) => {
   const green = '\x1b[32m';
   const cyan = '\x1b[36m';
   const reset = '\x1b[0m';
   const bold = '\x1b[1m';

   const labelWidth = 18; // độ rộng tối thiểu của nhãn (ví dụ: HOSTNAME:)
   const valueStartColumn = 13; // vị trí bắt đầu giá trị sau icon + nhãn

   // Dữ liệu dạng [icon, label, value]
   const lines: [string, string, string][] = [
      ['✅', 'Server is', `${green}${bold}running${reset}`],
      ['🌍', 'Hostname:', `${cyan}${hostname}${reset}`],
      ['🟢', 'Port:', `${cyan}${port}${reset}`],
      ['🚨', 'Env:', `${cyan}${bold}${env}${reset}`],
      ['🚀', 'Url:', `${cyan}http://${hostname}:${port}${reset}`],
      ['📄', 'Url:', `${cyan}http://${hostname}:${port}/api${reset}`],
   ];

   // Tính độ dài tối đa để tạo khung
   const contentWidth = Math.max(
      ...lines.map(([icon, label, value]) => `${icon} ${label.padEnd(labelWidth)} ${value}`.length)
   );
   const boxWidth = contentWidth + 4;

   // In khung
   console.log(`${green}┏${'━'.repeat(boxWidth - 2)}┓`);
   lines.forEach(([icon, label, value]) => {
      const left = `${icon} ${label.padEnd(labelWidth)} ${value}`;
      const padding = ' '.repeat(contentWidth - left.length);
      console.log(` ${left}${padding} `);
   });
   console.log(`${green}┗${'━'.repeat(boxWidth - 2)}┛${reset}`);
}