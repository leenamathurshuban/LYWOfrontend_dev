import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  emailValue : "" ,
  loginUserInfo:  {
    email: "",
    company: [
        {
            id: "",
            uid: "",
            company_name: ""
        },
        {
            id: "",
            uid: "",
            company_name: ""
        }
    ]} 
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
   
      setEmailValue(state, action: PayloadAction<string>) {
        state.emailValue = action.payload;
      },
      setLoginuserInfor(state, action: PayloadAction<string>){
        state.loginUserInfo = action.payload
      }
  },
});

export const { setEmailValue,setLoginuserInfor } = loginSlice.actions;
export default loginSlice.reducer;
