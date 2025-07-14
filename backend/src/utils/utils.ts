export const isFutureEntry = (games: any[], dateProperty: string): any[] => {
  const currentDate = new Date();
  return games.filter((game) => new Date(game[dateProperty]) > currentDate);
};
