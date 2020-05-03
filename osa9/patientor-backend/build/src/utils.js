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
const parseDate = (date) => {
    if (!date || !isString || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
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
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation')
    };
};
// Entry stuff
const isEntryType = (param) => {
    return Object.values(types_1.EntryType).includes(param);
};
const parseEntryType = (entry) => {
    if (!entry || !isEntryType(entry)) {
        throw new Error('Incorrect or missing entry type: ' + entry);
    }
    return entry;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating) => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};
const parseDischarge = (discharge) => {
    if (!discharge || !parseDate(discharge.date) || !parseString(discharge.criteria, 'discharge criteria')) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.toNewEntry = (object) => {
    const type = parseEntryType(object.type);
    switch (type) {
        case types_1.EntryType.HealthCheck:
            return {
                date: parseDate(object.date),
                specialist: parseString(object.specialist, 'specialist'),
                type,
                diagnosisCodes: object.diagnosisCodes,
                description: parseString(object.description, 'description'),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case types_1.EntryType.Hospital:
            return {
                date: parseDate(object.date),
                specialist: parseString(object.specialist, 'specialist'),
                type,
                diagnosisCodes: object.diagnosisCodes,
                description: parseString(object.description, 'description'),
                discharge: parseDischarge(object.discharge)
            };
        case types_1.EntryType.OccupationalHealthcare:
            return {
                date: parseDate(object.date),
                specialist: parseString(object.specialist, 'specialist'),
                type,
                diagnosisCodes: object.diagnosisCodes,
                employerName: parseString(object.employerName, 'employer name'),
                description: parseString(object.description, 'description'),
                sickLeave: object.sickLeave
            };
        default:
            return assertNever(type);
    }
};
exports.default = toNewPatient;
