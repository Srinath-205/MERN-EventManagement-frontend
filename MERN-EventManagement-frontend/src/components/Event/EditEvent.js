// EditEvent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEvent = ({ eventId, setEvents, setEditingEvent, existingEvent }) => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });

    // If editing an event, prefill the form with existing event data
    useEffect(() => {
        if (eventId && existingEvent) {
            setNewEvent({
                title: existingEvent.title,
                description: existingEvent.description,
                date: existingEvent.date,
                location: existingEvent.location,
            });
        }
    }, [eventId, existingEvent]);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to edit events.');
            return;
        }

        try {
            let response;
            if (eventId) {
                // Update event
                response = await axios.put(`http://localhost:4242/api/events/${eventId}`, newEvent, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === eventId ? response.data : event
                    )
                );
            } else {
                // Add new event
                response = await axios.post('http://localhost:4242/api/events', newEvent, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(prevEvents => [...prevEvents, response.data]);
            }
            alert('Event saved successfully!');
            setEditingEvent(null); // Clear editing mode
            setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset form
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Error saving event. Please try again.');
        }
    };

    return (
        <div className="edit-event-form">
            <h2>{eventId ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={newEvent.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={newEvent.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{eventId ? 'Update Event' : 'Add Event'}</button>
            </form>
        </div>
    );
};

export default EditEvent;
