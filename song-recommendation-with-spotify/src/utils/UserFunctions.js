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
    .catch(err => {
      console.log(err)
    })
}

export const login = user => {
  return axios
    .post('/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response);
      localStorage.setItem('token', response.data.access_token)
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

export const setToken = (token, minutes) => {
  const now = new Date()

  const item = {
    value: token,
    expiry: now.getTime() + minutes*60*1000
  }
  localStorage.setItem("token", JSON.stringify(item))
}

export const getToken = () => {
	const tokenStr = localStorage.getItem("token")
	if (!tokenStr) {
		return null
	}
	const token = JSON.parse(tokenStr)
	const now = new Date()
	if (now.getTime() > token.expiry) {
    localStorage.removeItem("token")
    localStorage.removeItem("spotifyToken")
		return null
	}
	return token.value
}