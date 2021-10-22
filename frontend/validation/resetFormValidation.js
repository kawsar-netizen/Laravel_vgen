const Validation = (values) => {
    let errors = {}

    if(!values.token){
        errors.token = "Token is required"
    }
    if(!values.password){
        errors.password = "password is required"
    }else if(values.password.length < 6){
        errors.password = "password must be more than 6 characters"
    }
    if(!values.confirm_password){
        errors.confirm_password = "Password confirmation is required"
    }else if(values.password !==  values.confirm_password){
        errors.confirm_password = "Password and confirm password should be matched"
    }
    return errors;
};

export default Validation;