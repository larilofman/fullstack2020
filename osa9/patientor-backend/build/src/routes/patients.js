"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const entryService_1 = __importDefault(require("../services/entryService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    try {
        res.json(patientService_1.default.getPatient(req.params.id));
    }
    catch (e) {
        res.status(404).json(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = utils_1.toNewEntry(req.body);
        res.json(entryService_1.default.addEntryToPatient(req.params.id, newEntry));
    }
    catch (e) {
        res.status(400).json(e.message);
    }
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPublicPatients());
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
