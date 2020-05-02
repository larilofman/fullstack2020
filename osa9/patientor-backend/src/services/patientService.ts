import patients from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient = {
        id: uuidv4(),
        entries: [],
        ...newPatient
    };
    patients.push(patient);
    return patient;
};

export default { getPublicPatients, addPatient, getPatient };