export const logSeeder = (log: string, _: any) => {
  const green = "\x1b[32m";
  const cyan = "\x1b[36m";
  const reset = "\x1b[0m";
  const bold = "\x1b[1m";
  const red = "\x1b[31m";
  const yellow = "\x1b[33m";
  const gray = "\x1b[90m";

  const labelWidth = 20;

  const lines: [string, string, string][] = [
    [
      `${green}✔️${reset}`,
      `${bold}${cyan}Seeder Name:${reset}`,
      `${bold}${yellow}${log}${reset}`,
    ],
  ];

  // Tính độ dài lớn nhất (bỏ escape code khi tính độ dài)
  // eslint-disable-next-line no-control-regex
  const stripAnsi = (str: string) => str.replace(/\u001b\[[0-9;]*m/g, "");
  const contentWidth = Math.max(
    ...lines.map(
      ([icon, label, value]) =>
        stripAnsi(`${icon} ${label.padEnd(labelWidth)} ${value}`).length,
    ),
  );

  lines.forEach(([icon, label, value]) => {
    const rawLine = `${icon} ${label.padEnd(labelWidth)} ${value}`;
    const visibleLength = stripAnsi(rawLine).length;
    const padding = " ".repeat(contentWidth - visibleLength);
    console.log(` ${rawLine}${padding} `);
  });
};
