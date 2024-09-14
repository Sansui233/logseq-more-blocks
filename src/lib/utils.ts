/**
 * {name: "2", home: "1"} ===> 'name: 2, home: 1'
 */
export function objectToString(obj: object): string {
  const entries = Object.entries(obj);
  return entries.map(([key, value]) => `${key}: ${value}`).join(",\n");
}