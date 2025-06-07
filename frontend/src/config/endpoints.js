const API_URL = "http://localhost:3001";

//auth api
const SIGNUP = "/auth/signup";
const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
const POST_FORGOT_PASSWORD = "/auth/forgot-password";
const PUT_RESET_PASSWORD = "/auth/reset-password";
const PROFILE_DATA = "/profile";

//get data
//all note api
const API_NOTES = "/notes"; //POST & GET all
const API_NOTE_DETAIL = "/notes"; //for GET, PUT, DEL (i.e /notes/{id})
const API_NOTE_COLLABORATORS = "/notes/collaborators";

//all project api
const API_PROJECTS = "/projects"; //POST & GET all
const API_PROJECT_DETAIL = "/projects"; //for GET, PUT, DEL (i.e /notes/{id})
const API_PROJECT_COLLABORATORS = "/projects/collaborators";

//tasks renamed as reminder
const API_REMINDERS = "/reminders"; //POST & GET all
const API_REMINDER_DETAIL = "/reminders"; //for GET, PUT, DEL (i.e /notes/{id})

// const 

export {
    API_URL,
    SIGNUP,
    LOGIN,
    LOGOUT,
    POST_FORGOT_PASSWORD,
    PUT_RESET_PASSWORD,
    PROFILE_DATA,
    API_NOTES,
    API_NOTE_DETAIL,
    API_NOTE_COLLABORATORS,
    API_PROJECTS,
    API_PROJECT_DETAIL,
    API_PROJECT_COLLABORATORS,
    API_REMINDERS,
    API_REMINDER_DETAIL
};