export function formatNum(v: number) {
  v = Math.floor(v / 10000);
  const delimited = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return delimited + "만원";
}
