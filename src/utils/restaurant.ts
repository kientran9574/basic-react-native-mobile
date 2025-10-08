export const processDataRestaurantMenu = (values: any) => {
  if (!values) return [];
  return values.menu.map((item: any, index: any) => {
    return {
      index,
      title: item.title,
      data: item.menuItem,
      key: item._id,
    };
  });
};
