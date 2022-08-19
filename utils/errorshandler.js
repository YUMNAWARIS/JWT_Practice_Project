
function error_handler(err){

    const error = {
        email : "",
        password : ""
    }
    if(err.message.includes("Email Incorrect")){
        error.email = "Account is not registered. Please enter a valid registered Email"
    }
    if(err.message.includes("Password Incorrect")){
        error.password =  "Password Authentication failed. Please Enter a valid Password"
    }
    // duplication Error
    if(err.code === 11000){
        error.email = "Email is already registered."
        return error
    }

    // validation Error
    if(err.message.includes("users validation failed")){
        Object.values(err.errors).forEach(
            ({properties})=>{
                error[properties.path] = properties.message;
            }
        )
    }
    return error;
} 
module.exports.error_handler = error_handler
