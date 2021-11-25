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

export const formatSelectedId = data => {
  let newData = [];
  data.map(item => {
    if (item.select == true) {
      newData.push(item.id);
    }
  });

  return newData;
};

export const formatSelectedGrouped = data => {
  let newData = '';
  data.map((item, index) => {
    if (item.select == true) {
      if (index == 0) {
        newData = item.name;
      } else {
        newData += `,${item.name}`;
      }
    }
  });

  return newData;
};
