import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection, DatePickerField } from "../AddPatientModal/FormField";
import { EntrySelectField, EntryTypeOption } from './FormField';
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, EntryType, Diagnosis } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" }
];

const validateNumberInput = (value: string) => {
  let error;
  if (value === undefined || value === '') {
    error = 'Field is required';
  }
  return error;
};

const validateStringInput = (value: string) => {
  let error;
  if (!value) {
    error = 'Field is required';
  }
  return error;
};

const getNow = () => {
  return new Date().toISOString().split('T')[0];
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  onTypeChange: (entryType: EntryType) => void;
  diagnoses: { [id: string]: Diagnosis };

}

export const AddHCEntryForm: React.FC<Props> = ({ onSubmit, onCancel, onTypeChange, diagnoses }) => {
  const formValues = {
    type: "HealthCheck" as EntryType.HealthCheck,
    description: "",
    date: getNow(),
    specialist: "",
    healthCheckRating: 0,
    diagnosisCodes: [],
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | object } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <EntrySelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
              onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                onTypeChange(event.currentTarget.value as EntryType);
              }}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={DatePickerField}
              setFieldValue={setFieldValue}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              placeholder="0"
              min="0"
              max="3"
              component={NumberField}
              validate={validateNumberInput}
              setFieldValue={setFieldValue}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel, onTypeChange, diagnoses }) => {
  const formValues = {
    type: "Hospital" as EntryType.Hospital,
    description: "",
    date: getNow(),
    specialist: "",
    discharge: { date: getNow(), criteria: "" },
    diagnosisCodes: []
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | object } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <EntrySelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
              onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                onTypeChange(event.currentTarget.value as EntryType);
              }}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={DatePickerField}
              setFieldValue={setFieldValue}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label="Discharge"
              placeholder="Discharge"
              name="discharge.criteria"
              component={TextField}
              validate={validateStringInput}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={DatePickerField}
              setFieldValue={setFieldValue}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export const AddOHEntryForm: React.FC<Props> = ({ onSubmit, onCancel, onTypeChange, diagnoses }) => {
  const formValues = {
    type: "OccupationalHealthcare" as EntryType.OccupationalHealthcare,
    description: "",
    date: getNow(),
    specialist: "",
    diagnosisCodes: [],
    employerName: "",
    sickLeave: {
      startDate: '',
      endDate: '',
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | object } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <EntrySelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
              onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                onTypeChange(event.currentTarget.value as EntryType);
              }}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={DatePickerField}
              setFieldValue={setFieldValue}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label="Employer"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
              validate={validateStringInput}
            />
            <Field
              label="Sick Leave Start"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={DatePickerField}
              setFieldValue={setFieldValue}
            />
            <Field
              label="Sick Leave End"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={DatePickerField}
              setFieldValue={setFieldValue}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};