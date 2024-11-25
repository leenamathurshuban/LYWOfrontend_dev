import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  emailValue : "" ,
  loginUserInfo:  {
    email: "",
    default_company: {
            uid: "",
            company_name: ""
        },
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
    ]},
    CompanyProfileDetails:{} 

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
      },
      setCompanyProfileDetails(state, action: PayloadAction<string>){
        console.log("slice maiaiiaii",action.payload)
        state.CompanyProfileDetails = action.payload
      },
    logout: (state) => {
      state.emailValue = "";
      state.loginUserInfo = initialState.loginUserInfo;
    }

  },
});

export const { setEmailValue,setLoginuserInfor,logout,setCompanyProfileDetails } = loginSlice.actions;
export default loginSlice.reducer;
