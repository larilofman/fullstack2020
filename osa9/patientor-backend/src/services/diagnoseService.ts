import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getDiagnosis = (): Diagnose[] => {
    return diagnoseData;
};

export default {
    getDiagnosis
};