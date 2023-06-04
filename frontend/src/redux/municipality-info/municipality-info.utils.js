export const getDoughnutChart = (datas) => {
  let chartdata = {
    labels: [],
    data: [],
  };
  datas.forEach((data) => {
    chartdata.labels.push(data.label);
    chartdata.data.push(data.count);
  });
  return chartdata;
};

export const getWardFilter = (datas) => {
  let filter = [];
  datas.forEach((data) => {
    if (isNaN(data.ward_en))
      filter.unshift({ key: data.ward, value: data.ward_en });
    else filter.push({ key: data.ward, value: data.ward_en });
  });
  return filter;
};

export const getDataByWard = (datas, ward) => {
  return datas.find((data) => data.ward_en === ward.value);
};

export const getBuildingByWard = (datas) => {
  let chartdata = {
    labels: [],
    data: [],
  };
  datas.forEach((data) => {
    if (!isNaN(data.ward_en)) {
      chartdata.labels.push(data.ward);
      chartdata.data.push(data.house_en);
    }
  });
  return chartdata;
};

export const getNoticeByMyWard = (datas, myward) => {
  if (myward)
    return datas.filter(data => data.my_notice)
  else
    return datas.slice(0, 5)
};
