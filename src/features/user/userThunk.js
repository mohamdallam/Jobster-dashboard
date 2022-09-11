import customFetch from "../../utils/axios";

// ? Register User Function ////////////
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// ? Login User Function ////////////
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// ? Update User Function ////////////
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
