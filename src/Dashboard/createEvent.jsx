import React, { useState } from "react";
import { createEvent } from "../services/eventService";

const CreateEventForm = ({ onEventCreated }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !description || !capacity) {
      setError("Please fill all fields.");
      return;
    }

    const eventData = {
      name: eventName,
      description,
      capacity: Number(capacity),
      image,
    };

    setIsLoading(true);
    try {
      await createEvent(eventData);
      onEventCreated(); // Notify parent component about the new event
      // Reset the form
      setEventName("");
      setDescription("");
      setCapacity("");
      setImage("");
      setError(""); // Clear error
    } catch (err) {
      setError("Error creating event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Event</h3>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEventForm;
