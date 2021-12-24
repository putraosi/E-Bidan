export const formatTreatment = data => {
  return data.map(item => {
    const newItem = {
      id: item.id,
      name: item.name,
      select: false,
      price: item.cost ? item.cost : 0,
    };
    return newItem;
  });
};

export const formatSelect = (data, isAddOther) => {
  const newData = data.map(item => {
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.cost,
      select: false,
    };

    return newItem;
  });

  if (isAddOther) {
    const newItem = {
      id: 999,
      name: 'Lainnya',
      select: false,
    };

    newData.push(newItem);
  }

  return newData;
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

export const formatSplit = data => {
  let newData = [];
  const split = data.split(',');

  split.map((item, index) => {
    const newItem = {
      id: index + 1,
      name: item,
    };
    newData.push(newItem);
  });

  return newData;
};
