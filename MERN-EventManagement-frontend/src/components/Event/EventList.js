// src/components/Events/EventList.js
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../api/api';

const EventList = () => {
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const response = await fetchEvents();
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events', error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        {event.name} - {new Date(event.date).toLocaleDateString()} at {event.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
