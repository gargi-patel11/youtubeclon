import React , {useState , useEffect} from 'react'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const [formdata , setformdata]=useState({
        fullName:"",
        username:"",
        email:"",
        password:"",
        conpassword:"",
        avatar:null,
        coverImage:null,
    })

    const [errorMessage, setErrorMessage] = useState("");
    const [buttontext , setbuttontext] = useState("Submit");
    const [loading , setloading]=useState(false);

    const handleChange=(e)=>{
        setformdata({
            ...formdata, [e.target.name]:e.target.value 
        })
    }
    const handlefileChange=(e)=>{
        setformdata(
            {
                ...formdata,[e.target.name]:e.target.files[0]
            }
        )
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        setErrorMessage("");
        setloading(true);
        console.log("this function is being");
        
        const dataToSend=new FormData();
        dataToSend.append("fullName" , formdata.fullName)
        dataToSend.append("username" , formdata.username)
        dataToSend.append("email" , formdata.email)
        dataToSend.append("password" , formdata.password)
        dataToSend.append("conpassword" , formdata.conpassword)
        if(formdata.avatar){
        dataToSend.append("avatar" , formdata.avatar)
        }
        if(formdata.coverImage){
        dataToSend.append("coverImage" , formdata.coverImage)
        }

        try {
            // console.log("data is being fetched")
            const response= await axios.post(
                "http://localhost:5000/api/v1/user/register",
                dataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("User registered successfully!");
            console.log(response.data);
            setloading(false)

            const dataToSendforlogin = {
                username: formdata.username,
                email: formdata.email,
                password: formdata.password
            };
            
            console.log(dataToSendforlogin)
                try {
                    const loginuser=await axios.post(
                        "http://localhost:5000/api/v1/user/login",
                        dataToSendforlogin
                    )
                    navigate("/editAvatar");  
                } catch (error) {
                    console.log(error.response.data);
                }
          
            
        } catch (error) {
            setloading(false)
            const errorHtml = error.response.data;     // fetching error from html response 

        // Extract error message using regex
        const match = errorHtml.match(/<pre>(.*?)<\/pre>/s);
        const extractedMessage = match ? match[1].split("<br>")[0].replace("Error: ", "") : "Something went wrong!";

            setErrorMessage(extractedMessage);

            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            // setErrorMessage(error.response?.data?.message || "Something went wrong!");
           
        }
    }

    useEffect(() => {
        setbuttontext(loading ? "" : "Submit");
      }, [loading]);
    
  return (
    <>
    {errorMessage && (
        <div className="p-4 text-white bg-red-500 text-center">
            {errorMessage}
        </div>
    )}
<form onSubmit={handleSubmit} > 
    <div className='container mx-auto px-100 py-10'>
    <div className=" mb-6 ">
        <div className=" mb-6 ">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Full Name</label>
            <input type="text" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}  name= "fullName" required />
        </div>
        <div className=" mb-6 ">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} name='username' required />
        </div>
        
    </div>
    <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" name='email' onChange={handleChange} required />
    </div> 
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='password' onChange={handleChange} required />
    </div> 
    <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='conpassword' onChange={handleChange} required />
    </div> 
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <button type="submit" className="text-white bg-purple-600 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:bg-purple-800"  >{buttontext}</button>
    </div>
</form>

    </>
  )
}

