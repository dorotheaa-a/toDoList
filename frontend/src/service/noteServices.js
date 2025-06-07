import axios from "axios";
import axiosInstance from "../config/axiosConfig";

import {
    API_NOTES,
    API_NOTE_DETAIL,
    API_NOTE_COLLABORATORS,
    API_PROJECTS,
    API_PROJECT_DETAIL,
    API_PROJECT_COLLABORATORS,
    API_REMINDERS,
    API_REMINDER_DETAIL
} from "../config/endpoints";

//fetch all notes
// returns {Promsie<Array>}
const getAllNotes = async () => {
    try{
        const response = await axiosInstance.get(API_NOTES);
        return response.data;
    } catch (error) {
        console.error("Error fetching all notes:", error);
        throw error;
    }
};

//make new notw
const createNote = async (noteData) => {
  try {
    const response = await axiosInstance.post(API_NOTES, noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to create note.");
    } else {
      throw new Error("Network error.");
    }
  }
};


/**
 * fetch single note by id (applies for the other CRUD func)
 */
const getNoteById = async (noteId) => {
    try{
        const response = await axiosInstance.get(`${API_NOTE_DETAIL}/${noteId}`);
        return response.data;
    } catch (error) {
    console.error(`Error fetching note ${noteId}:`, error);
    if (error.response && error.response.status === 404){
        throw new Error("Note not found.");
    }
    throw error;
    }
};

/**
 * update existing
 * @param {string} noteId & {object} updatedData
 */
const updateNote = async (noteId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API_NOTE_DETAIL}/${noteId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating note ${noteId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to update note.");
    } else {
      throw new Error("Network error.");
    }
  }
};

//del noteb by id
/**
 * 
 * @param {string} noteId  and then return Promise<void>
 */
const deleteNote = async (noteId) => {
  try {
    await axiosInstance.delete(`${API_NOTE_DETAIL}/${noteId}`);
  } catch (error) {
    console.error(`Error deleting note ${noteId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete note.");
    } else {
      throw new Error("Network error.");
    }
  }
};

// ----------Collaborator functions

/**
 * get all the collaborators
 * @returns {Promise<Array>}
 */
const getNoteCollaborators = async (noteId) => {
    try{
        const response = await axiosInstance.get(`${API_NOTE_COLLABORATORS}/${noteId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching collaborators for note ${noteId}:`, error);
        throw error;
    }
};

/**
 * add collaborator
 * @param {string} noteId 
 * @param {string} userId
 * @param {string} permission (set as default: CRU)
 */
const addNoteCollaborator = async (noteId, userId, permission) => {
  try {
    const response = await axiosInstance.post(
      `${API_NOTE_COLLABORATORS}/${noteId}/collaborators`,
      { user_id: userId, permission_level: permission }
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding collaborator to note ${noteId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to add collaborator.");
    } else {
      throw new Error("Network error.");
    }
  }
};

/**
 * remove collaborator from note
 */ 
const removeNoteCollaborator = async (noteId, collaboratorId) => {
  try {
    // assumes endpoint DELETE /api/notes/{note_id}/collaborators/{collaborator_id}
    await axiosInstance.delete(`${API_NOTE_SPECIFIC_COLLABORATOR}/${noteId}/collaborators/${collaboratorId}`);
  } catch (error) {
    console.error(`Error removing collaborator ${collaboratorId} from note ${noteId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to remove collaborator.");
    } else {
      throw new Error("Network error.");
    }
  }
};

export {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getNoteCollaborators,
  addNoteCollaborator,
  removeNoteCollaborator,
};