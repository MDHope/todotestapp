import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {rootApi} from '../api';
import {RootState} from '../index';
import {removeToken, setTokenToStorage} from '../api/helpers';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      removeToken();
      state.token = null;
    },
    setToken: (_state, action: PayloadAction<string>) => ({
      token: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addMatcher(
      rootApi.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        setTokenToStorage(payload.message.token);
        state.token = payload.message.token;
      },
    );
  },
});

export default authSlice;

export const {logout, setToken} = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
