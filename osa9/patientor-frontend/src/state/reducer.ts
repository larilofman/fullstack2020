import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "EDIT_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      patientID: string;
      entry: Entry;
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "EDIT_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const editedPatient = state.patients[action.payload.patientID];
      editedPatient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientID]: editedPatient
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]) => {
  return (
    {
      type: "SET_PATIENT_LIST" as "SET_PATIENT_LIST",
      payload: patientList
    }
  );
};

// used for updating patient to include sensitive data
export const editPatient = (patient: Patient) => {
  return (
    {
      type: "EDIT_PATIENT" as "EDIT_PATIENT",
      payload: patient
    }
  );
};

export const addPatient = (patient: Patient) => {
  return (
    {
      type: "ADD_PATIENT" as "ADD_PATIENT",
      payload: patient
    }
  );
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]) => {
  return (
    {
      type: "SET_DIAGNOSIS_LIST" as "SET_DIAGNOSIS_LIST",
      payload: diagnosisList
    }
  );
};

export const addEntry = (patientID: string, entry: Entry) => {
  return (
    {
      type: "ADD_ENTRY" as "ADD_ENTRY",
      payload: { patientID, entry }
    }
  );
};
