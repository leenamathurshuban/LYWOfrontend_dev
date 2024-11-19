// Store the token in localStorage
export const storeToken = (token) => {
    localStorage.setItem('authToken', token);
};

// remove the token from localStorage
export const removeToken = () => {
   localStorage.removeItem('authToken');
};