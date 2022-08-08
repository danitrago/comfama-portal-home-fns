"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFields = void 0;
const getFieldsSingle = (singleObj) => {
    if (!singleObj.fields)
        return singleObj;
    let objKeys = Object.keys(singleObj.fields);
    let subField = {};
    objKeys.forEach((key) => {
        subField[key] = getFields(singleObj.fields[key], key);
    });
    return subField;
};
const getFields = (arrObj, key) => {
    if (key === "descripcion" || (key === "metaDescripcion" && arrObj.content))
        return { json: arrObj };
    if (!Array.isArray(arrObj))
        return getFieldsSingle(arrObj);
    if (typeof arrObj[0] !== "undefined") {
        if (!arrObj[0].fields)
            return arrObj;
    }
    let fields = arrObj.map((item) => item.fields);
    return fields.map((item) => {
        let objKeys = Object.keys(item);
        let subField = {};
        objKeys.forEach((key) => {
            subField[key] = getFields(item[key], key);
        });
        return subField;
    });
};
exports.getFields = getFields;
