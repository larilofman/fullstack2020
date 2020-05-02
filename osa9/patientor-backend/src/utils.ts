import { NewPatient, Gender, EntryType, HealthCheckRating, NewEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (inputString: any, valueName: string): string => {
    if (!inputString || !isString(inputString)) {
        throw new Error(`Incorrect or missing ${valueName}: ` + inputString);
    }

    return inputString;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation')
    };
};

// Entry stuff

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const parseEntryType = (entry: any): EntryType => {
    if (!entry || !isEntryType(entry)) {
        throw new Error('Incorrect or missing entry type: ' + entry);
    }
    return entry;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
    if (!discharge || !parseDate(discharge.date) || !parseString(discharge.criteria, 'discharge criteria')) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewEntry = (object: any): NewEntry => {
    const type = parseEntryType(object.type);

    switch (type) {
        case EntryType.HealthCheck:
            return {
                date: parseDate(object.date),
                specialist: parseString(object.specialist, 'specialist'),
                type,
                diagnosisCodes: object.diagnosisCodes,
                description: parseString(object.description, 'description'),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case EntryType.Hospital:
            return {
                date: parseDate(object.date),
                specialist: parseString(object.specialist, 'specialist'),
                type,
                diagnosisCodes: object.diagnosisCodes,
                description: parseString(object.description, 'description'),
                discharge: parseDischarge(object.discharge)
            };
        case EntryType.OccupationalHealthcare:
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

export default toNewPatient;