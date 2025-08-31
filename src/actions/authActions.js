
export const loginUser = (token) => {
    localStorage.setItem('authToken', token); // Guarda el token en localStorage
    return {
      type: 'SET_TOKEN',
      payload: token,
    };
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
    return {
      type: 'LOGOUT',
    };
  };