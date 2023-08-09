export const removeDuplicatesById = <T extends{id:number}>(
  data: T[] | undefined
) => {
  let filtered: T[] = [];

  if (data) {
    filtered = data?.filter((item, index) => {
      return (
        index ===
        data.findIndex((obj) => {
          return item.id === obj.id;
        })
      );
    });
  }

  return filtered;
};
