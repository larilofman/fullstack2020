import React, { useState } from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddHCEntryForm, AddHospitalEntryForm, AddOHEntryForm, EntryFormValues } from './AddEntryForm';
import { EntryType } from '../types';
import { useStateValue } from "../state";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}


const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
    const [{ diagnoses }] = useStateValue();

    const onTypeChange = (entryType: EntryType) => {
        setType(entryType);
    };

    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}

                {type === EntryType.HealthCheck &&
                    <AddHCEntryForm onSubmit={onSubmit} onCancel={onClose} onTypeChange={onTypeChange} diagnoses={diagnoses} />}

                {type === EntryType.Hospital &&
                    <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} onTypeChange={onTypeChange} diagnoses={diagnoses} />}

                {type === EntryType.OccupationalHealthcare &&
                    <AddOHEntryForm onSubmit={onSubmit} onCancel={onClose} onTypeChange={onTypeChange} diagnoses={diagnoses} />}

            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;
