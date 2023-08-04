export const formatEpisodeCount = (num: number) => {
  if(num){
    return `${num.toLocaleString()} ${num > 1 ? 'episodes' : 'episode'}`;
  }
  return null
};
