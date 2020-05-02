import React from 'react';
import { Card, Icon } from "semantic-ui-react";
import { Entry, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry, IconColor } from '../types';
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Card fluid key={entry.id}>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name='hospital' size='big' />
                </Card.Header>
                <Card.Description><i>{entry.description}</i></Card.Description>
                <ul>
                    {entry.diagnosisCodes?.map(code =>
                        <li key={code}>
                            {code} {diagnoses[code].name}
                        </li>)}
                </ul>
                <Card.Description><i>Discharged on {entry.discharge.date}: {entry.discharge.criteria}</i></Card.Description>
            </Card.Content>
        </Card>
    );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();
    const iconColors = ['green', 'yellow', 'orange', 'red'];

    return (
        <Card fluid key={entry.id}>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name='doctor' size='big' />
                </Card.Header>
                <Card.Description><i>{entry.description}</i></Card.Description>
                <ul>
                    {entry.diagnosisCodes?.map(code =>
                        <li key={code}>
                            {code} {diagnoses[code].name}
                        </li>)}
                </ul>
                <Icon name={'heart'} color={iconColors[entry.healthCheckRating] as IconColor} />
            </Card.Content>
        </Card>
    );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Card fluid key={entry.id}>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name='stethoscope' size='big' />
                    {entry.employerName}
                </Card.Header>
                <Card.Description><i>{entry.description}</i></Card.Description>
                <ul>
                    {entry.diagnosisCodes?.map(code =>
                        <li key={code}>
                            {code} {diagnoses[code].name}
                        </li>)}
                </ul>
                {entry.sickLeave && entry.sickLeave.startDate && entry.sickLeave.endDate ?
                    <Card.Description><i>Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</i></Card.Description>
                    : null}
            </Card.Content>
        </Card>
    );
};

export default EntryDetails;