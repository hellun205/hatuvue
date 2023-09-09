import { v4 } from "uuid";

const isNumeric = (s: any, def: number = 0) => {
  const num = Number(s);
  return isNaN(num) ? def : num;
};

const getRandomUUID = () => {
  return v4();
};

export { isNumeric, getRandomUUID };
