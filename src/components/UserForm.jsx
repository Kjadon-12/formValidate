import "../App.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { differenceInYears } from "date-fns";
import { registerUserAction } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { cityAction, countryAction, stateAction } from "../redux/slices/CitySlice";


//Form schema
const formSchema = Yup.object({
  firstName: Yup.string()
    .required("firstName is required")
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets"),
  lastName: Yup.string()
    .required("lastName  is required")
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets"),
  email: Yup.string()
    .required("Email  is required")
    .email("Invalid email format"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("city is required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("gender is required"),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  age: Yup.string().required("Age is required"),
});

export default function UserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryCodeS , setCountryCode] = useState('');

  useEffect(() => {
    dispatch(countryAction());
  }, [dispatch]);

  // select store data
  const country = useSelector((state) => state?.city?.countryList);

  const handleCountryChange =  (event) => {
    const selectedCountryCode = event.target.value;
    formik.handleChange(event);
     
    setCountryCode(selectedCountryCode)
    // console.log(countryCodeS)
    dispatch(stateAction(selectedCountryCode));
    

   
  };

  const state = useSelector((state) => state?.city?.stateList);
 // console.log(state);

  const handleStateChange =  (event) => {
    const selectedStateCode = event.target.value;
    
    
    formik.handleChange(event);
     

     console.log(`countryCodeS: ${countryCodeS} , selectedStateCode: ${selectedStateCode}`)
    dispatch(cityAction(countryCodeS, selectedStateCode));
    
   
  };

  
  const city   = useSelector((state) => state?.city?.cityList);

  //formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      state: "",
      city: "",
      gender: "",
      dob: "",
      age: "",
    },
    onSubmit: (values) => {
      //console.log(values);

      const data = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        country: values?.country,
        state: values?.state,
        city: values?.city,
        gender: values?.gender,
        dob: values?.dob,
        age: values?.age,
      };
      dispatch(registerUserAction(data));
      console.log(data);

      navigate("/user-data", { state: { data } });
    },
    validationSchema: formSchema,
  });

  const handleDateChange = (event) => {
    const currentDate = new Date();
    const birthDate = new Date(event.target.value);
    const age = differenceInYears(currentDate, birthDate);
    formik.setFieldValue("dob", event.target.value);
    formik.setFieldValue("age", age.toString());
  };

  return (
    <>
      <div className="container text-center formUser my-5 p-3">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email">First Name</label>
            <div className="mt-1">
              <input
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                id="firstName"
                name="firstName"
                type="firstName"
              />
            </div>
            {/* Err msg */}
            <div className="form-err">
              {formik.touched.firstName && formik.errors.firstName}
            </div>
          </div>
          <div>
            <label htmlFor="email">Last Name</label>
            <div className="mt-1">
              <input
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                id="lastName"
                name="lastName"
                type="lastName"
              />
            </div>
            {/* Err msg */}
            <div className="form-err">
              {formik.touched.lastName && formik.errors.lastName}
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <div className="mt-1">
              <input
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                id="email"
                name="email"
                type="email"
              />
            </div>
            {/* Err msg */}
            <div className="form-err">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="email" className="block me-4">
              Country
            </label>
            <select
              name="country"
              value={formik.values.country}
              onChange={handleCountryChange}
              onBlur={formik.handleBlur}
            >
              <option value="">--Select Country--</option>
              {country?.map((getCon, index) => (
                <option key={index} value={getCon.isoCode}>
                  {getCon.name}
                </option>
              ))}
            </select>
          </div>

          {/* Err msg */}
          <div className="form-err">
            {formik.touched.country && formik.errors.country}
          </div>

          <div className="mt-2">
            <label htmlFor="email" className="block me-4">
              State
            </label>
            <select
              name="state"
              value={formik.values.state}
              onChange={handleStateChange}
              onBlur={formik.handleBlur}
            >
              <option value="">--Select State--</option>
              {state?.map((getState, index) => (
                <option key={index} value={getState.isoCode}>
                  {getState.name}
                </option>
              ))}
            </select>
          </div>

          {/* Err msg */}
          <div className="form-err">
            {formik.touched.state && formik.errors.state}
          </div>

           <div className='mt-2'> 
                 <label 
                 htmlFor="email"
                 className="block me-4"
                >City</label> 
           <select
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
                  <option value="">--Select City--</option>
                   {
                    city?.map((getCity , index) => (
                      <option key={index} value = {getCity.name}>{getCity.name}</option>
                    ))
                  } 
          </select> 
                </div>

                {/* Err msg */}
          <div className="form-err">
                    {formik.touched.city && formik.errors.city}
                  </div> 

          <div>
            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                  id="maleGender"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                  id="femaleGender"
                />
                Female
              </label>
            </div>
            <div className="form-err">
              {formik.touched.gender && formik.errors.gender}
            </div>
          </div>

          <div>
            <label htmlFor="email">Date Of Birth</label>
            <div className="mt-1">
              <input
                value={formik.values.dob}
                // onChange={formik.handleChange("dob")}
                onChange={handleDateChange}
                onBlur={formik.handleBlur("dob")}
                id="dob"
                name="dob"
                type="date"
              />
            </div>
            {/* Err msg */}
            <div className="form-err">
              {formik.touched.dob && formik.errors.dob}
            </div>
          </div>

          <div>
            <label htmlFor="email">Age</label>
            <div className="mt-1">
              <input
                value={formik.values.age}
                id="age"
                name="age"
                type="text"
                readOnly
              />
            </div>
            {/* Err msg */}
            <div className="form-err">
              {formik.touched.age && formik.errors.age}
            </div>
          </div>

          <div className="mt-4">
           
            <button type="submit" className="bg-success">
              Submit
            </button>
            {/* )} */}
          </div>
        </form>
      </div>
    </>
  );
}
