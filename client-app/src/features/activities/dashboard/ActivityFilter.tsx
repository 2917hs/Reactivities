import { Calendar } from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function AcitvityFilter() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='filter' />
                <Menu.Item content='All Filters' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}