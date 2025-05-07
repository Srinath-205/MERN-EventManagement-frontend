// src/components/Dashboard/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchEvents, fetchMyRegistrations, registerUserForEvent, cancelRegistrationForEvent } from '../api/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead
import '../css/studentdashboard.css';

const StudentDashboard = () => {
    const [events, setEvents] = useState([]);
    const [myRegistrations, setMyRegistrations] = useState([]);
    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        const loadEvents = async () => {
            const response = await fetchEvents();
            setEvents(response.data);
        };

        const loadMyRegistrations = async () => {
            const response = await fetchMyRegistrations();
            console.log(response.data);
            setMyRegistrations(response.data);
        };

        loadEvents();
        loadMyRegistrations();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/login'); // Use navigate to redirect
    };

    const registerForEvent = async (eventId) => {
        try {
            const responses = await registerUserForEvent(eventId);
            console.log(responses);
            alert('Successfully registered for the event!');
            
            // Refresh the list of registrations to reflect the new one
            const response = await fetchMyRegistrations();
            setMyRegistrations(response.data);
        } catch (error) {
            console.error('Error registering for event', error);
    
            // Check for specific error message (assuming error response includes a message field)
            if (error.response && error.response.data.message === 'You are already registered for another event on this date.') {
                alert('You are already registered for another event on this date.');
            } else {
                alert('Registration failed!');
            }
        }
    };
    const cancelRegistration = async (eventId) => {
        try {
            await cancelRegistrationForEvent(eventId);
            alert('Successfully cancelled registration for the event');
            
            // Refresh the list of registrations after cancellation
            const updatedRegistrations = await fetchMyRegistrations();
            setMyRegistrations(updatedRegistrations.data);
        } catch (error) {
            console.error('Error cancelling registration', error);
            alert('Error cancelling registration');
        }
    };
    

    return (
        <div className="admin-dashboard">
            <h1>Student Dashboard</h1>
            <h2>Register for an Event</h2>
            <ul className="event-list">
                {events.map((event) => (
                    <li className="event-item" key={event._id}>
                        <span className="event-title">{event.title} - {new Date(event.date).toLocaleDateString()}</span>
                        <button onClick={() => registerForEvent(event._id)}>Register</button>
                    </li>
                ))}
            </ul>
    
            <h2>My Registrations</h2>
            <ul className="registration-list">
                {myRegistrations.map((registration) => (
                    <li className="registration-item" key={registration._id}>
                        <span className="event-title">{registration.title} - {new Date(registration.date).toLocaleDateString()}</span>
                        <button onClick={() => cancelRegistration(registration._id)}>Cancel Registration</button>
                    </li>
                ))}
            </ul>
    
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StudentDashboard;
