import axios from 'axios';

//This will be the connection to our API hosted temporarily on localhost. After preliminary setup, the API will be hosted on Heroku.

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:7467/api',
    baseURL: 'https://gymjot-v1-server.onrender.com/api',
    // baseURL: 'https://gymjot.herokuapp.com/api',
    withCredentials: true,
    headers: {
        Authorization: JSON.parse(localStorage.getItem('jwt')),
    },
});

/*
    Using axios interceptors was just what I needed to remove the window reload on user log in that I was using to temporarily set the JWT. In the past, it appears that the JWT token is 'undefined' when initially sent to the server on first page load (initial login)--> meaning that unless there was a refresh, the server will always unauthorize the request meaning that the user will not recieve their info.

    I used a hacky way to bypass it temporarily while I worked on other things, meaning that right after the user logged in there would be a page refresh, which was NOT React friendly and definitely not aesthetically appealing.

    The JWT was undefined because the above axios instance was loaded on app load, meaning that since the user was not logged in, localstorage 'jwt' is indeed undefined.

    Interceptors update the authorization header on every request... which solve this issue.
*/

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');

        if (token) {
            config.headers.Authorization = JSON.parse(token);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
