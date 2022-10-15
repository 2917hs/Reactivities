import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormInput, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            });
        }
        else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

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
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})