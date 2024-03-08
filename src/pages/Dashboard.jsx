import { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./Signup";
import AddDistrict from "../components/AddDistrict";
import AddTaluka from "../components/AddTaluka";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const getUsers = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );

        const getDistricts = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );

        const getTalukas = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/subdistrict`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        console.log("Total users:", getUsers.data);
        console.log("Total districts:", getDistricts.data);
        console.log("Total talukas:", getTalukas.data);
        setUsers(getUsers.data);
        setDistricts(getDistricts.data);
        setTalukas(getTalukas.data);
      } catch (error) {
        console.log("Error occurred while getting users.", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-4/5 my-4">
          <div className="w-full bg-gray-50 rounded-lg pt-6 pb-2 px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Users:
              </h4>
              <p className="hext-md font-semibold text-green-600">
                {users.length}
              </p>
            </div>
            <div className="text-center pt-3">
              <button className=" rounded-lg bg-green-700 text-gray-50 font-semibold text-sm py-2 px-6 my-2">
                Add new user
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-lg pt-6 pb-2 px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Districts:
              </h4>
              <p className="hext-md font-semibold text-green-600">
                {districts.length}
              </p>
            </div>

            <div className="text-center pt-3">
              <button className=" rounded-lg bg-green-700 text-gray-50 font-semibold text-sm py-2 px-6 my-2">
                Add new District
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-lg pt-6 pb-2 px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Talukas:
              </h4>
              <p className="hext-md font-semibold text-green-600">
                {talukas.length}
              </p>
            </div>
            <div className="text-center pt-3">
              <button className=" rounded-lg bg-green-700 text-gray-50 font-semibold text-sm py-2 px-6 my-2">
                Add new Taluka
              </button>
            </div>
          </div>
        </div>

        <div>
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
