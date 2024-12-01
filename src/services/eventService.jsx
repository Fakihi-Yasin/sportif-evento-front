import axios from "axios";

export const getAllEvents = async () => {
  try {
    const token = localStorage.getItem("token"); // Ensure token is stored here
    const response = await axios.get("http://localhost:3000/events/my-events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

};


export const updateEvent = async (id, updatedData) => {
    const response = await axios.patch(`http://localhost:3000/events/${id}`, updatedData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
  };


  export const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    console.log("Token for deleting event:", token); // Ensure the token is there
  
    try {
      const response = await axios.delete(`http://localhost:3000/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  export const createParticipant = async (participantData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/participants",
        participantData, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error creating participant:", error.response?.data || error.message);
      throw error;
    }
  };


  export const getAllParticipants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/participants/AllParticipants", {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Error fetching participants:", error);
      throw error;
    }
  };
  