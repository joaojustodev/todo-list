export function generateSlug(name: string): string {
  const gen = name.trim().replaceAll("&", "-and-").replaceAll(" ", "-");

  return gen;
}
