import { useState, useEffect } from "react";
import { getAllEvents, updateEvent, deleteEvent } from "../services/eventService";
import defaultImage from "../assets/img1.jpg";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation
  const [eventToDelete, setEventToDelete] = useState(null); // Track event to be deleted

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

  // Open the delete confirmation dialog
  const handleDelete = (event) => {
    setEventToDelete(event); // Set the event to delete
    setIsDeleteConfirmOpen(true); // Open confirmation dialog
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

    const token = localStorage.getItem("authToken");
    console.log("Token for updating event:", token); // Ensure the token is there

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

  // Handle the deletion of an event
  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete._id); // Call the delete API
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventToDelete._id)
        );
        setIsDeleteConfirmOpen(false); // Close confirmation dialog
        setEventToDelete(null); // Reset the event to delete
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false); // Close confirmation dialog without deleting
    setEventToDelete(null); // Reset the event to delete
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
                  onClick={() => handleDelete(event)} // Trigger delete confirmation
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
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

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl mb-4">Are you sure you want to delete this event?</h3>
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
