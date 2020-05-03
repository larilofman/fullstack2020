"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPublicPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatient = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    return patient;
};
const addPatient = (newPatient) => {
    const patient = Object.assign({ id: uuid_1.v4(), entries: [] }, newPatient);
    patients_1.default.push(patient);
    return patient;
};
exports.default = { getPublicPatients, addPatient, getPatient };
