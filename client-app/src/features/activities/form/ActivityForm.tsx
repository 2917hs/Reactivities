import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, FormInput, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { closeForm, selectedActivity, createActivity, updateActivity, loading } = activityStore;

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
        activity.id ? updateActivity(activity) : createActivity(activity);
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
                <FormInput type='date' placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}></FormInput>
                <FormInput placeholder='City' name='city' value={activity.city} onChange={handleInputChange}></FormInput>
                <FormInput placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}></FormInput>
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})