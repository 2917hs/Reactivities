import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './Duck';
import DuckItem from './DuckItem';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:7294/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <Header as='h2' icon='users' context='reactivities'></Header>
      <List>
        {activities.map((acitvity: any) => (
          <List.Item key={acitvity.id}>
            {acitvity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
