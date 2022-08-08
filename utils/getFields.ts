const getFieldsSingle = (singleObj: any) => {
  if (!singleObj.fields) return singleObj;
  let objKeys = Object.keys(singleObj.fields);
  let subField: any = {};
  objKeys.forEach((key: any) => {
    subField[key] = getFields(singleObj.fields[key], key);
  });
  return subField;
};

const getFields = (arrObj: any, key: any) => {
  if (key === "descripcion" || (key === "metaDescripcion" && arrObj.content))
    return { json: arrObj };
  if (!Array.isArray(arrObj)) return getFieldsSingle(arrObj);
  if (typeof arrObj[0] !== "undefined") {
    if (!arrObj[0].fields) return arrObj;
  }
  let fields = arrObj.map((item) => item.fields);
  return fields.map((item) => {
    let objKeys = Object.keys(item);
    let subField: any = {};
    objKeys.forEach((key) => {
      subField[key] = getFields(item[key], key);
    });
    return subField;
  });
};

export { getFields };
