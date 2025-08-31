


// reducers/authReducer.js
const initialState = {
    token: localStorage.getItem('authToken') || null, // Recupera el token de localStorage
    user: null,
    userId: null,
};



const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                userId: action.payload.id,
            };

        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;