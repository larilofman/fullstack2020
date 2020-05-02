import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { Header, Container, Icon, Button } from "semantic-ui-react";
import { useStateValue, editPatient, addEntry } from "../state";
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(response.data);
                dispatch(editPatient(response.data));
            } catch (e) {
                console.error(e);
            }
        };
        // nonsensitive patient data has been fetched(to fix error refreshing while in id route)
        if (patients[id]) {
            // patient's sensitive data hasn't been fetched yet
            if (!patients[id].ssn) {
                fetchPatient();
            } else {
                setPatient(patients[id]);
            }
        }

    }, [id, dispatch, patients]);

    if (!patient) return null;

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(id, newEntry));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    const getIconName = () => {
        if (patient.gender === 'male') {
            return 'mars';
        } else if (patient.gender === 'female') {
            return 'venus';
        } else {
            return 'genderless';
        }
    };

    return (
        <Container>
            <Header as="h2" style={{ display: 'inline-block' }}>{patient.name}</Header>
            <Icon name={getIconName()} size="big" style={{ marginBottom: '0.5em' }} />
            <p style={{ marginBottom: 0 }}>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add Entry</Button>
            <Header as="h3">Entries</Header>
            {patient.entries.length === 0
                ? <p>No entries.</p>
                : patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)
            }
        </Container>

    );
};

export default PatientPage;
