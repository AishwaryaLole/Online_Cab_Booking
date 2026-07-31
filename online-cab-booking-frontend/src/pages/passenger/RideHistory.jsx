import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getDriverRideHistory,
} from "../../services/rideService";



const RideHistory = () => {


  const [rides, setRides] = useState([]);

  const [loading, setLoading] = useState(true);





  useEffect(() => {

    fetchRideHistory();

  }, []);






  const fetchRideHistory = async () => {


    try {


      setLoading(true);



      const response =
        await getDriverRideHistory();



      setRides(
        response.data
      );



    } catch(error) {


      toast.error(
        "Failed to load ride history"
      );


    } finally {


      setLoading(false);


    }


  };








  if(loading){


    return (

      <div className="
        flex
        justify-center
        items-center
        h-[70vh]
      ">

        <h2 className="
          text-xl
          font-semibold
        ">

          Loading Ride History...

        </h2>


      </div>

    );


  }







  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-6
    ">



      <div className="mb-8">


        <h1 className="
          text-3xl
          font-bold
        ">

          📜 Ride History

        </h1>



        <p className="
          text-gray-500
          mt-2
        ">

          View your completed rides and earnings.

        </p>


      </div>







      {
        rides.length === 0 ?


        (

          <div className="
            bg-white
            rounded-xl
            shadow
            p-10
            text-center
          ">


            <h2 className="
              text-2xl
              font-semibold
            ">

              No Completed Rides

            </h2>



            <p className="
              text-gray-500
              mt-2
            ">

              Your completed rides will appear here.

            </p>


          </div>


        )



        :



        (

          <div className="
            grid
            gap-5
          ">


          {
            rides.map(
              (ride)=>(


                <div

                  key={
                    ride.id
                  }

                  className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    border
                  "

                >


                  <div className="
                    flex
                    justify-between
                    items-center
                    mb-4
                  ">


                    <h2 className="
                      text-xl
                      font-bold
                    ">

                      Ride #{ride.id}

                    </h2>



                    <span className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                    ">

                      Completed

                    </span>


                  </div>






                  <p className="mb-2">

                    👤

                    <b>
                      Passenger:
                    </b>

                    {" "}
                    {ride.passengerName}

                  </p>




                  <p className="mb-2">

                    📍

                    <b>
                      Pickup:
                    </b>

                    {" "}
                    {ride.pickupAddress}

                  </p>





                  <p className="mb-2">

                    🏁

                    <b>
                      Drop:
                    </b>

                    {" "}
                    {ride.dropAddress}

                  </p>





                  <p className="mb-2">

                    💰

                    <b>
                      Earnings:
                    </b>

                    {" "}
                    ₹{ride.fare}

                  </p>





                  <p className="text-gray-500">

                    📅

                    {ride.completedAt}

                  </p>



                </div>


              )

            )

          }



          </div>


        )

      }




    </div>

  );

};


export default RideHistory;