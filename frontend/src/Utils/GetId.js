import cryptoJs from "crypto-js";

export const generateUniqueHashedId = (val) => {
  return cryptoJs.SHA256(val).toString(cryptoJs.enc.Hex);
};
