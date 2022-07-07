const axios = require("axios");
const instance = axios.create({
    baseURL:"http://localhost:8888/.netlify/functions"
})


module.exports = instance;