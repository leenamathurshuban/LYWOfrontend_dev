import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: LoginState = {
   
    email : ""
    
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
   
      setEmail(state, action: PayloadAction<string>) {
        state.email = action.payload;
      },
      clearLoginData(state) {
        return initialState;
      }
  },
});

export const { setEmail,clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;
