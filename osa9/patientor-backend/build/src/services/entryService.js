"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientService_1 = __importDefault(require("./patientService"));
const uuid_1 = require("uuid");
const addEntryToPatient = (id, newEntry) => {
    const patient = patientService_1.default.getPatient(id);
    const entry = Object.assign(Object.assign({}, newEntry), { id: uuid_1.v4() });
    patient.entries.push(entry);
    return entry;
};
exports.default = { addEntryToPatient };
