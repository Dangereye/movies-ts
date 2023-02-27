export const formatRuntime = (num: number | null | undefined) => {
  if (num) {
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const mins = (hours - rhours) * 60;
    const rmins = Math.round(mins);
    return (rhours > 0 ? rhours + "h " : "") + rmins + "m";
  }
  return undefined;
};
