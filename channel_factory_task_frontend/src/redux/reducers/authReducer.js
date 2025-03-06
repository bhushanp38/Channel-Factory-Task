const initialState = {
  user: {
    id: null,
    email: null,
    first_name: null,
    role: "",
  },
  token: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      console.log("STATE:", state);
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.token ? true : false;
      state.user = action.payload.user;
      break;

    case "LOGOUT":
      console.log("STATE:", state);
      state.user = initialState.user;
      state.token = null;
      state.isAuthenticated = false;
      break;

    default:
      console.log("STATE:", state);
  }
  return state;
};
