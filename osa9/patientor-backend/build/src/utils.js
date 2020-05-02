"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (inputString, valueName) => {
    if (!inputString || !isString(inputString)) {
        throw new Error(`Incorrect or missing ${valueName}: ` + inputString);
    }
    return inputString;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDoB = (dateOfBirth) => {
    if (!dateOfBirth || !isString || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewPatient = (object) => {
    return {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDoB(object.dateOfBirth),
        ssn: parseString(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation')
    };
};
exports.default = toNewPatient;
