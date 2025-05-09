let emailPrev;

const emailValidation = (userData) => {
    let error= {};
    let valid = true;

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (userData.email !== undefined && !userData.email) {
        error = "Please Enter Email";
        valid = false;
    } else if (userData.email !== undefined && !emailregex.test(userData.email)) {
        error = "Please Enter Valid Email";
        valid = false;
    } else if (userData.email) {
        error = '';
    }
    return { error, valid };
};

export const ApplicantFormValidation = (userData) => {
    let isErrors = {};
    let isValid = true;

    if (userData.name !== undefined && !userData.name) {
        isErrors.name = "Please Enter name";
        isValid = false;
    } else if (userData.name) {
        isErrors.name = '';
    }

    if (userData.email !== undefined) {
        const { error, valid } = emailValidation(userData);
        if (!valid) {
            isErrors.email = error;
            isValid = valid;
        } else {
            isErrors.email = "";
            emailPrev = userData.email;
        }
    }
    
    if (userData.confirmEmail !== undefined && !userData.confirmEmail) {
        isErrors.confirmEmail = "Your application and progress are linked to this email. Please ensure it is entered correctly.";
        isValid = false;
    } else if (
        userData.confirmEmail !== emailPrev && userData.confirmEmail
    ) {
        isErrors.confirmEmail = "The email addresses do not match. Please check both fields and try again";
        isValid = false;
    } else if (userData.confirmEmail === emailPrev && userData.confirmEmail) {
        isErrors.confirmEmail = "";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (userData.phone !== undefined && !userData.phone) {      
      isErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phonePattern.test(userData.phone)) {     
      isErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }else if (phonePattern.test(userData.phone) && userData.phone){
        isErrors.phone = "";        
    }

    return { isErrors, isValid };
};
