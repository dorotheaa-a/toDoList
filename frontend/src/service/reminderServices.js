import axiosInstance from "../config/axiosConfig";

import {
    API_REMINDERS,
    API_REMINDER_DETAIL,
    API_REMINDER_COMPLETE
} from "../config/endpoints";

/**
 * fetch all reminder
 * can add more param for filter/sort
 */
const getAllReminders = async (params = {}) => {
  try {
    const response = await axiosInstance.get(API_REMINDERS, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching all reminders:", error);
    throw error;
  }
};


/**
 * make new reminder
 */
const createReminder = async (reminderData) => {
  try {
    const response = await axiosInstance.post(API_REMINDERS, reminderData);
    return response.data;
  } catch (error) {
    console.error("Error creating reminder:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to create reminder.");
    } else {
      throw new Error("Network error.");
    }
  }
};

// --reminder detailsss for by id stuff
const getReminderById = async (reminderId) => {
  try {
    const response = await axiosInstance.get(`${API_REMINDER_DETAIL}/${reminderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reminder ${reminderId}:`, error);
    if (error.response && error.response.status === 404) {
      throw new Error("Reminder not found.");
    }
    throw error;
  }
};

//update existing
const updateReminder = async (reminderId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API_REMINDER_DETAIL}/${reminderId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating reminder ${reminderId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to update reminder.");
    } else {
      throw new Error("Network error.");
    }
  }
};

// del reminder by id as usual
const deleteReminder = async (reminderId) => {
  try {
    await axiosInstance.delete(`${API_REMINDER_DETAIL}/${reminderId}`);
  } catch (error) {
    console.error(`Error deleting reminder ${reminderId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete reminder.");
    } else {
      throw new Error("Network error.");
    }
  }
};


/**
 * mark as completed or incomplete
 * GO api handle patch/put update status
 * @param {string} reminderId
 * @param {boolean} isCompleted
 */
const markReminderComplete = async (reminderId, isCompleted) => {
  try {
    const response = await axiosInstance.put(
      `${API_REMINDER_COMPLETE}/${reminderId}/complete`,
      { is_completed: isCompleted } // Send only the status or desired fields
    );
    return response.data;
  } catch (error) {
    console.error(`Error marking reminder ${reminderId} complete:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to update completion status.");
    } else {
      throw new Error("Network error.");
    }
  }
};

export {
  getAllReminders,
  createReminder,
  getReminderById,
  updateReminder,
  deleteReminder,
  markReminderComplete,
};