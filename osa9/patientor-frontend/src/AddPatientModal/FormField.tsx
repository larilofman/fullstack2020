import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender } from "../types";

// structure of a single option
export type GenderOption = {
    value: Gender;
    label: string;
};

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: GenderOption[];
};

export const GenderSelectField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options
}: SelectFieldProps) => (
        <Form.Field>
            <label>{label}</label>
            <Field as="select" name={name} className="ui dropdown">
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </Field>
        </Form.Field>
    );

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
    field,
    label,
    placeholder
}) => (
        <Form.Field>
            <label>{label}</label>
            <Field placeholder={placeholder} {...field} />
            <div style={{ color: 'red' }}>
                <ErrorMessage name={field.name} />
            </div>
        </Form.Field>
    );

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
    label: string;
    errorMessage?: string;
    min: number;
    max: number;
    setFieldValue: (field: string, value: number) => void;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max, setFieldValue }) => (
    <Form.Field>
        <label>{label}</label>
        {/* onBlur set the field value to minimum allowed value to avoid having empty input */}
        <Field {...field} type='number' min={min} max={max} onBlur={() => field.value === '' ? setFieldValue(field.name, Number(min)) : null} />

        <div style={{ color: 'red' }}>
            <ErrorMessage name={field.name} />
        </div>
    </Form.Field>
);

export const DiagnosisSelection = ({
    diagnoses,
    setFieldValue,
    setFieldTouched
}: {
    diagnoses: Diagnosis[];
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
    const field = "diagnosisCodes";
    const onChange = (
        _event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
    };

    const stateOptions = diagnoses.map(diagnosis => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code
    }));

    return (
        <Form.Field>
            <label>Diagnoses</label>
            <Dropdown
                fluid
                multiple
                search
                selection
                options={stateOptions}
                onChange={onChange}
            />
            <ErrorMessage name={field} />
        </Form.Field>
    );
};

interface DatePickerProps extends FieldProps {
    label: string;
    setFieldValue(field: string, value: string | undefined): void;
}

export const DatePickerField: React.FC<DatePickerProps> = ({ field, label, setFieldValue }) => {

    const formatDate = (date: Date) => {
        let month = String((date.getMonth() + 1));
        let day = String(date.getDate());
        const year = String(date.getFullYear());

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    };

    const onChange = (val: Date | null) => {
        if (val) {
            setFieldValue(field.name, formatDate(val));
        }
    };

    return (
        <Form.Field>
            <label>{label}</label>
            <DatePicker
                {...field}
                dateFormat="yyyy/MM/dd"
                selected={(field.value && new Date(field.value)) || null}
                onChange={val => onChange(val)}
            />
        </Form.Field>
    );

};

