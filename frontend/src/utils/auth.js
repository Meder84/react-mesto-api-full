// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://localhost:3001';

const request = ({url, method = 'POST', token, body}) => {
  const config = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...!!token && {'Authorization': `Bearer ${token}`},
    },
    ...!!body && {body: JSON.stringify(body)},
    credentials: 'include',
  }
  return fetch(`${BASE_URL}${url}`, config)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  })
}

export const register = (password, email) => {
  return request({
    url: '/signup',
    body: {password, email},
  })
}

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    body: {password, email},
  })
};

export const getContent = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  })
}

// export const getContent = token => {
//   return fetch(`${BASE_URL}/users/me`, {
//     // credentials: 'include',
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization" : `Bearer ${token}`
//     }
//   })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(response.status);
//   })
// }
