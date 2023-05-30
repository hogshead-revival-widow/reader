export const countNormpages = (text: string, charsPerNormpage = 1800) =>
  parseInt(Number(text.length / charsPerNormpage).toFixed(0));
