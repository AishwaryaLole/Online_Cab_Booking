import axios from "axios";

const API_URL = "http://localhost:8080/api/passenger";


const getPassengerProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/profile`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;
};



const updatePassengerProfile = async(data)=>{

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/update`,
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};



const getRideHistory = async()=>{

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/rides`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );


    return response.data;

};



export default {

    getPassengerProfile,
    updatePassengerProfile,
    getRideHistory

};