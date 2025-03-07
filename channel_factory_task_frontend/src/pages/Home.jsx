import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  baseUrl,
  clearSearches,
  fetchDistanceFailure,
  fetchDistanceStart,
  fetchDistanceSuccess,
} from "../redux/distanceSlice";
import axios from "axios";
import notify from "utitlities/Notifications/Notify";

const Home = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const dispatch = useDispatch();
  const { searches, loading, error } = useSelector((state) => state.distance);

  const handleCalculate = async () => {
    if (source && destination) {
      //   dispatch(fetchDistance(source, destination));
      try {
        dispatch(fetchDistanceStart());
        const response = await axios.post(`${baseUrl}/distance/`, {
          source: source,
          destination: destination,
        });
        dispatch(fetchDistanceSuccess(response.data));
        setSource("");
        setDestination("");
        notify("Distance calculated successfully", "success");
        console.log("Success:", response.data);
      } catch (error) {
        dispatch(
          fetchDistanceFailure(
            error.response?.data?.error || "Something went wrong"
          )
        );
        notify("Error while getting distance, try again later", "error");
        console.error(
          "Error fetching distance:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      notify("Please enter both source and destination", "warning");
    }
  };

  const handleClear = () => {
    dispatch(clearSearches());
    notify("History cleared successfully", "success");
  };

  return (
    <div className="container">
      <h1 className="title text-center">Channel Factory Task</h1>
      <br />
      <div className="input-container">
        <div className="card">
          <h2>Distance Calculator</h2>
          <div>
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button onClick={handleCalculate} disabled={loading}>
            {loading ? "Loading..." : "Calculate Distance"}
          </button>
        </div>
      </div>
      <div>
        <div className="history-title-div">
          <h2>Previous Searches</h2>
          {searches?.length > 0 && (
            <p className="underlined-text" onClick={handleClear}>
              Clear History
            </p>
          )}
        </div>
        <div>
          {searches?.length > 0 ? (
            searches.map((search, index) => (
              <div key={index} className="list-card">
                <p>
                  <strong>Source:- </strong>
                  {search.formatted_source}
                </p>
                <p>
                  <strong>Destination:- </strong>
                  {search.formatted_destination}
                </p>
                <p>
                  <strong>Distance:- </strong>
                  {search.distance_km}
                </p>
              </div>
            ))
          ) : (
            <div>
              <p className="list-card text-center">
                <strong>No Data Available</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
