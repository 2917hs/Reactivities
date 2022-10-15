import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import AcitvityFilter from './ActivityFilter';

export default observer(function AcitvityDashbaord() {

    const { activityStore } = useStore();
    const { activityRegistry, loadActivities } = activityStore;

    useEffect(() => {
        if (activityRegistry.size < 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities])

    if (activityStore.loadingInitial) {
        return <LoadingComponent content='Loading app' />
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <AcitvityFilter />
            </Grid.Column>
        </Grid>
    )
}) 