
export function getAuthorizationHeader() {
    const authToken = localStorage.getItem('authToken'); // Replace with your authentication logic
    if (authToken) {
        return { Authorization: authToken };
        // return { Authorization: `Bearer ${authToken}` };
    }
    return {};
}