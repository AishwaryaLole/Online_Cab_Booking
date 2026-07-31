import axios from "axios";


const API = axios.create({
  baseURL:"http://localhost:8080/api",
});


API.interceptors.request.use((config)=>{

  const token = localStorage.getItem("token");

  if(token){
    config.headers.Authorization = 
    `Bearer ${token}`;
  }

  return config;

});



export const getVehicleDetails = () => {

  return API.get("/vehicles/driver");

};



export const updateVehicleDetails = (data) => {

  return API.put(
    "/vehicles/update",
    data
  );

};