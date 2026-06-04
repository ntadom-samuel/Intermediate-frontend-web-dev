import { createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk } from "@reduxjs/toolkit";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//Vid 322: Redux thunk with createAsyncThunk
//This function takes two arguments. 1. The action name. 2. An async function that will return the payload for the reducer
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    console.log("🥹🥹🥹🥹🥹🥹🥹🥹");
    const positionObj = await getPosition();
    console.log(positionObj);
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in. This data becomes the payload of the fulfilled state
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  //Vid 322(Watch Again):Redux Thunks With createAsyncThunk
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchAddress.pending,
        (state, action) => (state.status = "loading"),
      )
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        // state.error = action.error.message;
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
