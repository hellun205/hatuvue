const isNumeric = (s: any, def: number = 0) => {
  const num = Number(s);
  return isNaN(num) ? def : num;
};

export { isNumeric };
