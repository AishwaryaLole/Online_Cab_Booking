import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import passengerService from "../../services/passengerService";


const PassengerDashboard = () => {


    const [passenger,setPassenger] = useState({});

    const navigate = useNavigate();



    useEffect(()=>{

        fetchProfile();

    },[]);



    const fetchProfile = async()=>{

        try{

            const data = await passengerService.getPassengerProfile();

            setPassenger(data);

        }
        catch(error){

            console.log(error);

        }

    };



    const logout = ()=>{

        localStorage.removeItem("token");

        navigate("/login");

    };




    return (

        <div className="min-h-screen bg-gray-100 p-6">


            {/* Navbar */}

            <div className="max-w-6xl mx-auto flex justify-between items-center bg-white p-5 rounded-xl shadow">


                <h1 className="text-2xl font-bold text-blue-600">
                    CabGo
                </h1>


                <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>


            </div>




            {/* Welcome Section */}

            <div className="max-w-6xl mx-auto mt-8">


                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">


                    <h2 className="text-3xl font-bold">
                        Welcome, {passenger.name || "Passenger"} 👋
                    </h2>


                    <p className="mt-2">
                        Book your ride quickly and safely.
                    </p>


                    <Link
                    to="/book-ride"
                    className="inline-block mt-5 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
                    >
                        Book Ride
                    </Link>


                </div>



            </div>





            {/* Cards */}


            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-8">



                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-xl font-bold">
                        My Profile
                    </h3>


                    <p className="text-gray-500 mt-2">
                        View and update your details
                    </p>


                    <Link
                    to="/passenger/profile"
                    className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        View Profile
                    </Link>


                </div>






                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-xl font-bold">
                        Ride History
                    </h3>


                    <p className="text-gray-500 mt-2">
                        Check your previous rides
                    </p>


                    <Link
                    to="/passenger/rides"
                    className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        View Rides
                    </Link>


                </div>






                <div className="bg-white shadow rounded-xl p-6">


                    <h3 className="text-xl font-bold">
                        Notifications
                    </h3>


                    <p className="text-gray-500 mt-2">
                        Check latest updates
                    </p>


                    <Link
                    to="/notifications"
                    className="inline-block mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
                    >
                        Open
                    </Link>


                </div>



            </div>



        </div>

    );

};


export default PassengerDashboard;