export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export const cat = () => {
  const a = randomIntFromInterval(50, 500);
  const b = randomIntFromInterval(50, 500);
  return `http://placekitten.com/g/${a}/${b}`;
};
