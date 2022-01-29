export const formatMidwife = data => {
  return data.map(item => {
    return {
      id: item.detail_id,
      name: item.bidan_name,
    };
  });
};

export const formatMidwifeTime = data => {
  return data.map(item => {
    return {
      id: item.time_id,
      name: item.practice_time,
    };
  });
};

export const formatTreatment = data => {
  return data.map(item => {
    return {
      id: item.id,
      name: item.name,
      select: false,
      price: item.cost ? item.cost : 0,
    };
  });
};

export const formatSelect = (data, isAddOther, oldData) => {
  const newData = data.map(item => {
    let isSelect = false;

    if (oldData) {
      for (const element of oldData) {
        if (element.id == item.id) {
          isSelect = true;
          break;
        }
      }
    }

    return {
      id: item.id,
      name: item.name,
      price: item.cost,
      select: isSelect,
    };
  });

  if (isAddOther) {
    const newItem = {
      id: 999,
      name: 'Lainnya',
      price: 0,
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

export const capitalizeWord = async (text, separator = ' ') => {
  return text
    .toLowerCase()
    .split(separator)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(separator);
};
