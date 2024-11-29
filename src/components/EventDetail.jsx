import { useState, useEffect } from "react";
import { getAllEvents, updateEvent, deleteEvent } from "../services/eventService";
import defaultImage from "../assets/img1.jpg";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Open the modal for editing
  const handleEdit = (event) => {
    setSelectedEvent(event); // Set the selected event
    setIsModalOpen(true); // Open modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Clear selected event
  };

  // Handle form submission to update the event
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
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Handle event deletion
  const handleDelete = async (id) => {
    try {
      const deletedEvent = await deleteEvent(id);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== deletedEvent._id)
      );
      console.log("Event deleted:", deletedEvent);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-32 ml-10">
        {events.map((event) => (
          <div
            key={event._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="rounded-t-lg"
              src={event.image || defaultImage}
              alt="Event"
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {event.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {event.description || "No description available."}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(event)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-2xl mb-4">Edit Event</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={selectedEvent.name}
                  className="w-full border rounded p-2"
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
    </div>
  );
};

export default Events;
