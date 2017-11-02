import axios from 'axios';

export class UserService {
  constructor() {}

  // Get all users
  getUsers(page, limit) {
    const endpoint = 
      typeof page === 'number' && typeof page === 'number' 
        ? `/api/users?_page=${page}&_limit=${limit}` 
        : '/api/users';

    return axios.get(endpoint)
      .then(res => (
        // patch response to notify if there's no more data to get
        Object.assign(
          { }, 
          res,
          { 
            isExhausted : res.data.length < limit
          }
        )
      ));
  }

  createUser(data) {
    const payload = JSON.stringify(data);
    const headers = { "Content-Type": "application/json" };
    
    return axios.post('/api/users', payload, { headers }); 
  }

  deleteUser(id) {
    return axios.delete(`/api/users/${id}`);
  }

  getNumberOfPages(totalItems, itemsPerPage) {
    const pages = (
      totalItems < itemsPerPage 
          ? 1 
          : totalItems % itemsPerPage 
            ? Math.floor(totalItems / itemsPerPage) + 1 
            : totalItems / itemsPerPage
    );

    return pages;
  }

} 
