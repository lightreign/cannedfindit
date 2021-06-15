export const CREATE_ITEM = `CREATE_ITEM`;

export const addItem = (item) => ({
   item: item,
   type: CREATE_ITEM
});