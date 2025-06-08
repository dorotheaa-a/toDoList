import axiosInstance from "../config/axiosConfig";

import {
    API_PROJECTS,
    API_PROJECT_DETAIL,
    API_PROJECT_COLLABORATORS
} from "../config/endpoints";

/**
 * fetch all project
 * @returns {Promise<Array>}
 */
const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get(API_PROJECTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw error;
  }
};

/**
 * new project
 * @param {object} projectData
 * @returns {Promise<object>}
 */
const createProject = async (projectData) => {
  try {
    const response = await axiosInstance.post(API_PROJECTS, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to create project.");
    } else {
      throw new Error("Network error.");
    }
  }
};

// Individual Project stuff (by id things)

/**
 * fetch single project
 */
const getProjectById = async (projectId) => {
  try {
    const response = await axiosInstance.get(`${API_PROJECT_DETAIL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    if (error.response && error.response.status === 404) {
      throw new Error("Project not found.");
    }
    throw error;
  }
};

/**
 * update existing proj
 * @param {string} projectId
 * @param {object} updatedData
 */
const updateProject = async (projectId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API_PROJECT_DETAIL}/${projectId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to update project.");
    } else {
      throw new Error("Network error.");
    }
  }
};

/**
 * Delete by id
 */
const deleteProject = async (projectId) => {
  try {
    await axiosInstance.delete(`${API_PROJECT_DETAIL}/${projectId}`);
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to delete project.");
    } else {
      throw new Error("Network error.");
    }
  }
};

// collaborator funcs
const getProjectCollaborators = async (projectId) => {
  try {
    const response = await axiosInstance.get(`${API_PROJECT_COLLABORATORS}/${projectId}/collaborators`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching collaborators for project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Adds a collaborator to a specific project.
 * @param {string} projectId.
 * @param {string} userId 
 * @param {string} permission set as default: CRU
 *  */
const addProjectCollaborator = async (projectId, userId, permission) => {
  try {
    const response = await axiosInstance.post(
      `${API_PROJECT_COLLABORATORS}/${projectId}/collaborators`,
      { user_id: userId, permission_level: permission }
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding collaborator to project ${projectId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to add collaborator.");
    } else {
      throw new Error("Network error.");
    }
  }
};

/**
 * kick someone
 */
const removeProjectCollaborator = async (projectId, collaboratorId) => {
  try {
    // This assumes an endpoint like DELETE /api/projects/{project_id}/collaborators/{collaborator_id}
    await axiosInstance.delete(`${API_PROJECT_SPECIFIC_COLLABORATOR}/${projectId}/collaborators/${collaboratorId}`);
  } catch (error) {
    console.error(`Error removing collaborator ${collaboratorId} from project ${projectId}:`, error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to remove collaborator.");
    } else {
      throw new Error("Network error.");
    }
  }
};

export {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectCollaborators,
  addProjectCollaborator,
  removeProjectCollaborator,
};