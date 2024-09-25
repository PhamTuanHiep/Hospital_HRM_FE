export const getFormatNumberToString = (num: number, char: string) => {
  let strNum = num.toLocaleString();
  return strNum.split(",").join(char);
};

export const addSuffix = (value: number | string, suffix: string) => {
  return value.toString() + suffix;
};

export const getDDMMYYYYfromISO8601DateString = (date: Date | undefined) => {
  let newDate = date ? date : "";
  return new Date(newDate).toLocaleString("vi-VN");
};
