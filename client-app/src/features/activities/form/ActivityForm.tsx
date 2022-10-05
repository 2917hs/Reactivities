import { ChangeEvent, useState } from 'react';
import { Button, Form, FormInput, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <FormInput placeholder='Title' name='title' value={activity.title} onChange={handleInputChange}></FormInput>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} />
                <FormInput placeholder='Category' name='category' value={activity.category} onChange={handleInputChange}></FormInput>
                <FormInput placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}></FormInput>
                <FormInput placeholder='City' name='city' value={activity.city} onChange={handleInputChange}></FormInput>
                <FormInput placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}></FormInput>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}