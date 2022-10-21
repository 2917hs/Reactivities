import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/CategoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('error'),
        category: Yup.string().required('error'),
        date: Yup.string().required('error').nullable(),
        venue: Yup.string().required('error'),
        city: Yup.string().required('error')
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
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

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value });
    // }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeHolder='Title' />
                        <MyTextArea rows={3} placeHolder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeHolder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeHolder='City' name='city' />
                        <MyTextInput placeHolder='Venue' name='venue' />
                        <Button
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                            loading={loading}
                            disabled={isSubmitting || !dirty || !isValid}
                        />
                        <Button
                            as={Link}
                            to='/activities'
                            floated='right'
                            type='button'
                            content='Cancel'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})