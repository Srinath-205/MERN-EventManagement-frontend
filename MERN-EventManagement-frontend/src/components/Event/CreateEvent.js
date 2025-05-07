// src/components/Events/CreateEvent.js
import React, { useState } from 'react';
import { createEvent } from '../../api/api';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await createEvent({ name: eventName, date: eventDate, location: eventLocation });
            console.log('Event created', response.data);
        } catch (error) {
            console.error('Error creating event', error);
        }
    };

    return (
        <form onSubmit={handleCreateEvent}>
            <h2>Create Event</h2>
            <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Event Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Event Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
            />
            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEvent;
