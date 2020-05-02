import { Entry, NewEntry } from '../types';
import patientService from './patientService';
import { v4 as uuidv4 } from 'uuid';

const addEntryToPatient = (id: string, newEntry: NewEntry): Entry => {
    const patient = patientService.getPatient(id);

    const entry: Entry = {
        ...newEntry,
        id: uuidv4()
    };
    patient.entries.push(entry);

    return entry;
};

export default { addEntryToPatient };