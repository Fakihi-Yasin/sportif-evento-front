import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {
  getAllEvents,
  updateEvent,
  deleteEvent,
  createParticipant,
} from "../services/eventService";
import defaultImage from "../assets/img1.jpg";
import { CalendarIcon, PlusIcon, EditIcon, TrashIcon, XIcon, UserPlusIcon ,MapPinIcon,UsersIcon} from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Create Participant
  const handleCreateParticipant = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const phoneNumber = e.target.phoneNumber.value.trim();
  
    if (!username || !email || !phoneNumber) {
      toast.error("All fields are required.");
      return;
    }
  
    // Prepare the participant data
    const participantData = {
      username,
      email,
      phoneNumber,
      eventId: selectedEvent?._id,
    };

    try {
      const response = await createParticipant(participantData);
      console.log("Participant Created:", response);
  
      // Close modal and show success message
      setIsParticipantModalOpen(false);
      toast.success("Participant registered successfully!");
    } catch (error) {
      console.error("Error creating participant:", error.response?.data || error.message);
      toast.error("Failed to register participant. Please try again.");
    }
  };

  // Create Event
  const handleCreate = async (e) => {
    e.preventDefault();

    const newEventData = {
      name: e.target.name.value,
      description: e.target.description.value,
      capacity: e.target.capacity.value,
      location: e.target.location.value,
      date: e.target.date.value,
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const createdEvent = await response.json();
      setEvents([...events, createdEvent]);
      setIsCreateModalOpen(false);
      toast.success('Event created successfully!');
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error('Failed to create event');
    }
  };

  // Close Create Modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Delete Event Handling
  const handleDelete = (event) => {
    setEventToDelete(event);
    setIsDeleteConfirmOpen(true);
  };

  // Edit Event
  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close Edit Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Update Event
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: e.target.name.value,
      description: e.target.description.value,
      capacity: e.target.capacity.value,
    };

    try {
      const updatedEvent = await updateEvent(selectedEvent._id, updatedData);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
      handleCloseModal();
      toast.success('Event updated successfully!');
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error('Failed to update event');
    }
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete._id);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventToDelete._id)
        );
        setIsDeleteConfirmOpen(false);
        setEventToDelete(null);
        toast.success('Event deleted successfully!');
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error('Failed to delete event');
      }
    }
  };

  // Cancel Delete
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <CalendarIcon className="mr-3 text-blue-600" size={32} />
          Event Management
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          <PlusIcon className="mr-2" size={20} />
          Create New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {events.map((event) => (
    <div
      key={event._id}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <img
        className="w-full h-48 object-cover"
        src={event.image || defaultImage}
        alt="Event"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {event.name}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description || "No description available."}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon size={16} className="mr-2 text-blue-500" />
            {event.date || "No date specified"}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon size={16} className="mr-2 text-red-500" />
            {event.location || "No location specified"}
          </div>
          <div className="flex items-center text-gray-600">
            <UsersIcon size={16} className="mr-2 text-green-500" />
            Capacity: {event.capacity || "Not specified"}
          </div>
        </div>
        <div className="flex justify-between space-x-2">
          <button
            onClick={() => handleEdit(event)}
            className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            <EditIcon size={16} className="mr-1" /> Edit
          </button>
          <button
            onClick={() => {
              setSelectedEvent(event);
              setIsParticipantModalOpen(true);
            }}
            className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            <UserPlusIcon size={16} className="mr-1" /> Register
          </button>
          <button
            onClick={() => handleDelete(event)}
            className="flex items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            <TrashIcon size={16} className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Create New Event</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participant Registration Modal */}
      {isParticipantModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Register for Event</h3>
              <button
                onClick={() => setIsParticipantModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateParticipant} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsParticipantModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     {/* Edit Event Modal */}
     {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Event</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={selectedEvent.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={selectedEvent.description}
                  className="w-full border rounded p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="capacity" className="block mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  defaultValue={selectedEvent.capacity}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-3 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;