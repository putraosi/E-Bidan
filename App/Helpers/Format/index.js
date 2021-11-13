export const formatTreatment = data => {
  return data.map(item => {
    const newItem = {
      id: item.id,
      name: item.name,
      select: false,
    };
    return newItem;
  });
};

export const formatSelectTreatment = data => {
  let newData = [];
  data.map(item => {
    if (item.select == true) {
      newData.push(item.id.toString());
    }
  });

  return newData;
};
