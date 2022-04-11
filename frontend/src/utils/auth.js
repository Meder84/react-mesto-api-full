// export const BASE_URL = 'https://asman.students.nomoredomains.xyz';
// export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://auth.nomoreparties.co';
// const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)

const request = ({url, method = 'POST', token, body, credentials}) => {
  const config = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...!!token && {'Authorization': `Bearer ${token}`},
    },
    ...!!body && {body: JSON.stringify(body)},
    ...!!credentials && {credentials: 'include'},
    // credentials: 'include', // на разных доменах, посылает куки.
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

// export const authorize = (password, email) => {
//   return fetch(`${BASE_URL}/signin`, {
//     credentials: 'include',
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({password, email})
//   })
//   .then(handleResponse)
//   .then((data) => {
//     if (data.token) {
//       localStorage.setItem('jwt', data.token)
//       return data.token
//     }
//   })
// }

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    body: {password, email},
    // credentials: 'include',
  })
};

export const getContent = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  })
}

