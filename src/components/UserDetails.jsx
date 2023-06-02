import { useLocation } from "react-router-dom"


function UserDetails() {
  const location = useLocation();
  console.log(location.state.data)
  return (
    <>
    <div className="container text-center formUser my-5 p-3">
      <h1 className="my-5">User Information</h1>
      <div>First Name: <span>{location.state.data.firstName}</span></div> 
      <div>Last Name: <span>{location.state.data.lastName}</span></div> 
      <div>Email: <span>{location.state.data.email}</span></div> 
      <div>Country: <span>{location.state.data.country}</span></div> 
      <div>State: <span>{location.state.data.state}</span></div> 
      <div>City: <span>{location.state.data.city}</span></div> 
      <div>Gender: <span>{location.state.data.gender}</span></div> 
      <div>Date of Birth: <span>{location.state.data.dob}</span></div> 
      <div>Age: <span>{location.state.data.age}</span></div> 
      
    </div>
    </>
  )
}

export default UserDetails