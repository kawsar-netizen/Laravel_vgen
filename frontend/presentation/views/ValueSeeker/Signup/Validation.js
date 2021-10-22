const Validation = (values) => {
    let errors = {}

    if(!values.first_name){
        errors.first_name = "First name is required"
    }
    if(!values.last_name){
        errors.last_name = "Last name is required"
    }
    if(!values.user_name){
        errors.user_name = "User name is required"
    }
    if(!values.email){
        errors.email = "Email is required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid"
    }
    if(!values.password){
        errors.password = "password is required"
    }else if(values.password.length < 6){
        errors.password = "password must be more than 6 characters"
    }
    if(!values.password_confirmation){
        errors.password_confirmation = "Password confirmation is required"
    }else if(values.password !==  values.password_confirmation){
        errors.password_confirmation = "Password and confirm password should be matched"
    }
    return errors;
};

export default Validation;