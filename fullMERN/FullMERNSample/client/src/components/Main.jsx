import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PersonList from './PersonList';
import PersonForm from './PersonForm';
const Main = () => {
    const [message, setMessage] = useState("Loading...")
    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => setMessage(res.data.message))
    }, []);
    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/people')
            .then(res => {
                setPeople(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id != personId));
    }

    return (
        <div>
            <h2>Message from the backend: {message}</h2>
            <PersonForm />
            <hr />
            {loaded && <PersonList people={people} removeFromDom={removeFromDom} />}
        </div>
    )
}
export default Main;