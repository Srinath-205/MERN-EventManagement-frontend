import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/admin.css';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [viewParticipants, setViewParticipants] = useState([]); // State for participants
    const [viewingEventId, setViewingEventId] = useState(null); // State for the ID of the event being viewed

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://mern-eventmanagement-backend.onrender.com/api/events', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error.response?.data || error.message);
            }
        };
        fetchEvents();
    }, []);

    // Add new event
    const addEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, please log in.");
            alert("No token found, please log in.");
            return;
        }
    
        try {
            const response = await axios.post('https://mern-eventmanagement-backend.onrender.com/api/events', newEvent, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEvents([...events, response.data]);
            setNewEvent({ title: '', description: '', date: '', location: '' });
        } catch (error) {
            console.error('Error adding event:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to add event');
        }
    };

    // Handle deleting an event
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`https://mern-eventmanagement-backend.onrender.com/api/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error.response?.data || error.message);
        }
    };

    // Handle editing an event
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setNewEvent({
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
        });
    };

    // Handle viewing participants
    const handleViewEvent = async (eventId) => {
        try {
            const response = await axios.get(`https://mern-eventmanagement-backend.onrender.com/api/events/${eventId}/getparticipants`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setViewParticipants(response.data.participants);
            console.log(response.data.participants)
            setViewingEventId(eventId);
        } catch (error) {
            console.error('Error fetching participants:', error.response?.data || error.message);
        }
    };

    // Update event
    const updateEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, please log in.");
            alert("No token found, please log in.");
            return;
        }

        try {
            const response = await axios.put(`https://mern-eventmanagement-backend.onrender.com/api/events/${editingEvent._id}`, newEvent, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEvents(events.map(event => event._id === editingEvent._id ? response.data : event));
            setEditingEvent(null);
            setNewEvent({ title: '', description: '', date: '', location: '' });
        } catch (error) {
            console.error('Error updating event:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to update event');
        }
    };

    return (
        <div className='admin-dashboard'>
            <h1>Admin Dashboard</h1>

            {/* Event Form for Adding or Editing */}
            <form onSubmit={editingEvent ? updateEvent : addEvent}>
                <input 
                    type="text" 
                    placeholder="Event Title" 
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
                    required 
                />
                <textarea 
                    placeholder="Event Description" 
                    value={newEvent.description} 
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} 
                    required 
                />
                <input 
                    type="date" 
                    value={newEvent.date} 
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} 
                    required 
                />
                <button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</button>
            </form>

            {/* List of Existing Events */}
            <h2>Existing Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        {event.title} - {new Date(event.date).toLocaleDateString()} - No of Participants: {event.participants.length}
                        <button onClick={() => handleEditEvent(event)}>Edit</button>
                        <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                        <button onClick={() => handleViewEvent(event._id)}>View Participants</button>
                    </li>
                ))}
            </ul>

            {/* Display Participants for the Selected Event */}
            {viewingEventId && (
                <div>
                    <h3>Participants for Event ID: {viewingEventId}</h3>
                    <ul>
                        {viewParticipants.length > 0 ? (
                            viewParticipants.map((participant, index) => (
                                <li key={index}>{participant.username}-{participant.RollNo}</li>
                            ))
                        ) : (
                            <p>No participants found for this event.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
