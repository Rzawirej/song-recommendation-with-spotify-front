import axios from 'axios'

export const register = newUser => {
  return axios
    .post('/register', {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.access_token)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
