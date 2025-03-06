import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState = {
  searches: [],
  loading: false,
  error: null,
};

const distanceSlice = createSlice({
  name: "distance",
  initialState,
  reducers: {
    fetchDistanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDistanceSuccess: (state, action) => {
      state.loading = false;
      console.log("entered");
      const newSearch = action.payload;
      const exists = state.searches.find(
        (item) =>
          item.source === newSearch.source &&
          item.destination === newSearch.destination
      );
      if (!exists) {
        // state.searches.push(newSearch);
        state.searches.unshift(newSearch);
      }
    },
    fetchDistanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDistanceStart,
  fetchDistanceSuccess,
  fetchDistanceFailure,
} = distanceSlice.actions;

// export const fetchDistance = (source, destination) => async (dispatch) => {
//   try {
//     dispatch(fetchDistanceStart());
//     const response = await axios.post(`${baseUrl}/distance/`, {
//       source: source,
//       destination: destination,
//     });
//     dispatch(fetchDistanceSuccess(response.data));
//   } catch (error) {
//     dispatch(
//       fetchDistanceFailure(
//         error.response?.data?.error || "Something went wrong"
//       )
//     );
//   }
// };

export default distanceSlice.reducer;
