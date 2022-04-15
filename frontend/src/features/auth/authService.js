import axios from 'axios'

//the url from the backend 
const API_URL = '/api/users/'

//register user
const register = async (userData) =>{
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//login user and also concating the login url
const login = async (userData) =>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//logout user
const logout = ()=>{
    localStorage.removeItem('user')
}

//destructuring
const authService = {
    register,
    logout,
    login
}

export default authService


