import axios from 'axios';
// console.log(process.env);
const clienteAxios = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL // now is premium
    // baseURL: "https://mern-djangorest-server.herokuapp.com/"
    // baseURL: "http://127.0.0.1:8000/"
    baseURL: "http://127.0.0.1:4000/"
});

export default clienteAxios;