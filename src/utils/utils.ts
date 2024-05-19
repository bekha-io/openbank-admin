export function beautifyNumber(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
