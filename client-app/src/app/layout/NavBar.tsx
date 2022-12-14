import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item content='Errors' as={NavLink} to='/errors' />
                <Menu.Item>
                    <Button positive content='Create Acitiuvties'
                        as={NavLink} to='/createActivity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}