import React from "react";
import { Field } from "formik";

import { Form } from "semantic-ui-react";
import { EntryType } from "../types";

// structure of a single option
export type EntryTypeOption = {
    value: EntryType;
    label: string;
};

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
};

export const EntrySelectField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
    onChange
}: SelectFieldProps) => (
        <Form.Field>
            <label>{label}</label>
            <Field as="select" name={name} className="ui dropdown" onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </Field>
        </Form.Field>
    );