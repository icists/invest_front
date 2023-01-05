import { numToKorean, FormatOptions } from "num-to-korean";

export function formatNum(v: number) {
  return numToKorean(v - (v % 10000), FormatOptions.MIXED) + "원";
}
