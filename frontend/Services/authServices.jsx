import axios from "axios"
// import { toast } from "react-toastify";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL



//login
export const LoginUser = async(userData) =>{
    try{
        // console.log(userData)

        const response = await axios.post(`${BACKEND_URL}/api/auth`,userData)
        if(response==="OK"){
            // toast.success("Login successfuly!...")
        }

        return response.data
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)
    }
}

export const Logout = async() =>{
    try{
        const respone = await axios.get(`${BACKEND_URL}/api/auth`)
        if(respone==="OK"){
            console.log("log out user");
            // toast.success("Login logout...")
        }
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            // toast.error(message)
            console.log(error);
    }
}


//register user
export const registerUser = async(userData)=>{
    try{
        const  response = await axios.post(`${BACKEND_URL}/api/auth/register`,userData,{ withCredentials: true })
        console.log(userData);
        if(response.statusText ==="OK"){
            // toast.success("Registration successfuly!...")
            
        }
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            // toast.error(message)
            console.log(message);
    }
}


