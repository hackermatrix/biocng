import { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./Signup";
import AddDistrict from "../components/AddDistrict";
import AddTaluka from "../components/AddTaluka";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const [userResponse, districtResponse, talukaResponse] =
        await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token.access}` },
          }),
          axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/district`,
            {
              headers: { Authorization: `Bearer ${token.access}` },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/subdistrict`,
            {
              headers: { Authorization: `Bearer ${token.access}` },
            }
          ),
        ]);

      setUsers(userResponse.data);
      setDistricts(districtResponse.data);
      setTalukas(talukaResponse.data);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "AddDistrict":
        return <AddDistrict />;
      case "AddTaluka":
        return <AddTaluka />;
      default:
        return <Signup />;
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-4/5 my-4">
          <div className="w-full bg-gray-50 rounded-lg pt-6 pb-2 px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Users:
              </h4>
              <p className="text-md font-semibold text-green-600">
                {users.length}
              </p>
            </div>
            <div className="text-center pt-3">
              <button
                onClick={() => handleComponentChange(null)}
                className="rounded-lg bg-green-700 text-gray-50 font-semibold text-sm py-2 px-6 my-2"
              >
                Add new user
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-lg pt-6 pb-2 px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Districts:
              </h4>
              <p className="text-md font-semibold text-green-600">
                {districts.length}
              </p>
            </div>
            <div className="text-center pt-3">
              <button
                onClick={() => handleComponentChange("AddDistrict")}
                className="rounded-lg bg-green-700 text-gray-50 font-semibold text-sm py-2 px-6 my-2"
              >
                Add new District
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-lg pt-6 pb-2 px-8 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-semibold text-green-700">
                Total Talukas:
              </h4>
              <p className="text-md font-semibold text-green-600">
                {talukas.length}
              </p>
            </div>
            <div className="text-center pt-3">
              <button
                onClick={() => handleComponentChange("AddTaluka")}
                className="rounded-lg bg-green-700 text-gray-50 font-semibold text-sm py-2 px-6 my-2"
              >
                Add new Taluka
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>{renderActiveComponent()}</div>
    </div>
  );
};

export default Dashboard;
