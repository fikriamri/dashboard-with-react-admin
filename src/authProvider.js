const authProvider = {
  login: ({ username, password }) =>  {
      const request = new Request('http://localhost:3000/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: username, password }),
          headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      return fetch(request)
          .then(response => {
              if (response.status < 200 || response.status >= 300) {
                  throw new Error(response.statusText);
              }
              return response.json();
          })
          .then(response => {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('role', 'user');
          });
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => localStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject(),
  getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
  }
  // ...
};

export default authProvider;