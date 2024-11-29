import axios from "axios";

export const getAllEvents = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ensure token is stored here
    const response = await axios.get("http://localhost:3000/events", {
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
    const token = localStorage.getItem("authToken");
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
  

  export const createEvent = async (eventData) => {
    const token = localStorage.getItem("authToken"); // Ensure token is stored here
  
    try {
      const response = await axios.post("http://localhost:3000/events", eventData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
        },
      });
  
      return response.data; // Return the response data after event is created
    } catch (error) {
      console.error("Error creating event:", error);
      throw error; // Throw error to be handled by the calling component
    }
  };
