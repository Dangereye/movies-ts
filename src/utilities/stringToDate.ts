export const stringToDate = (string: string) => 
    (string ? +new Date(string) : 0)

