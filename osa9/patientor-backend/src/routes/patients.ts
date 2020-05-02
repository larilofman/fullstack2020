import express from 'express';
import patientService from '../services/patientService';
import entryService from '../services/entryService';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
    try {
        res.json(patientService.getPatient(req.params.id));
    } catch (e) {
        res.status(404).json(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        res.json(entryService.addEntryToPatient(req.params.id, newEntry));
    } catch (e) {
        res.status(400).json(e.message);
    }
});

router.get('/', (_req, res) => {
    res.send(patientService.getPublicPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;