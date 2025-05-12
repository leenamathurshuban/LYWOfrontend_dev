let emailPrev;

const emailValidation = (userData) => {
    let error = {};
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
    } else if (phonePattern.test(userData.phone) && userData.phone) {
        isErrors.phone = "";
    }

    return { isErrors, isValid };
};

export const CreateJobFormValidation = (userData) => {
    let isErrors = {};
    let isValid = true;

    if (userData.jobTitle !== undefined && !userData.jobTitle) {
        isErrors.jobTitle = "Please Enter jobTitle";
        isValid = false;
    } else if (userData.jobTitle) {
        isErrors.jobTitle = '';
    }

    if (userData.noOfPosition !== undefined && !userData.noOfPosition) {
        isErrors.noOfPosition = "No Of Position is required";
        isValid = false;
    } else if (/[^0-9]/.test(userData.noOfPosition) && userData.noOfPosition) {
        isErrors.noOfPosition = "Please enter only numeric values";
        isValid = false;
    } else if (!/[^0-9]/.test(userData.noOfPosition) && userData.noOfPosition) {
        isErrors.noOfPosition = "";
    }

    if (userData.department !== undefined && !userData.department) {
        isErrors.department = "Please Enter department";
        isValid = false;
    } else if (userData.department) {
        isErrors.department = '';
    }

    if (userData.jobType !== undefined && !userData.jobType) {
        isErrors.jobType = "Please Enter jobType";
        isValid = false;
    } else if (userData.jobType) {
        isErrors.jobType = '';
    }

    if (userData.workPlaceType !== undefined && !userData.workPlaceType) {
        isErrors.workPlaceType = "Please Enter workPlaceType";
        isValid = false;
    } else if (userData.workPlaceType) {
        isErrors.workPlaceType = '';
    }

    return { isErrors, isValid };
}
