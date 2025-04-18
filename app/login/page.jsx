"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LogIn = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      router.push("/");
    }
  }, [router]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      let result = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();
      console.log(result,'result')
       if (result.auth) {
        localStorage.setItem('token', JSON.stringify(result?.auth));
        router.push("/");
      } 
      else {
        setErrors({ password: 'Please enter correct details' });
      }
    } catch (error) {
      setErrors({ password: 'Error logging in' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginSuccess = async(response) => {
   let result = window.open("http://localhost:5000/auth/google/callback", "_self")
    // result = await result.json();
   try {
    if (result.user) {
      localStorage.setItem('users', JSON.stringify(result?.user));
      router.push("/");
    }  
   } catch (error) {
    console.log(error);
   }
  //   console.log('Login Successful:', response);
  //   // Extract token and send to your backend if needed
  //   const token = response.credential;

  //   // Example: send token to backend
  //   fetch('http://localhost:5000/auth/google/callback', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Handle user data from backend
  //       console.log('User Data:', data);
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       localStorage.setItem('token', token);
  //       router.push('/');
  //     })
  //     .catch((error) => console.error('Error:', error));
  // };

  // const handleLoginFailure = (error) => {
  //   console.error('Login Failed:', error);
  };

  return (
    <>
      <section className="my-5 vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex-row d-flex align-items-center justify-content-center justify-content-lg-start">
                      <p className="mb-0 lead fw-normal me-3">Log in</p>
                      <button type="button" className="mx-1 btn btn-primary btn-floating">
                        <i className="fab fa-facebook-f" />
                      </button>
                      <button type="button" className="mx-1 btn btn-primary btn-floating">
                        <i className="fab fa-twitter" />
                      </button>
                      <button type="button" className="mx-1 btn btn-primary btn-floating">
                        <i className="fab fa-linkedin-in" />
                      </button>
                    </div>
                    <div className="my-4 divider d-flex align-items-center">
                      <p className="mx-3 mb-0 text-center fw-bold">Or</p>
                    </div>

                    <div data-mdb-input-init="" className="mb-4 form-outline">
                      <Field
                        type="email"
                        name="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                      <ErrorMessage name="email" component="span" className="text-danger w-25" />
                    </div>

                    <div data-mdb-input-init="" className="mb-3 form-outline">
                      <Field
                        type="password"
                        name="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <ErrorMessage name="password" component="span" className="text-danger w-25" />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="mb-0 form-check">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="form-check-input me-2"
                          id="form2Example3"
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                          Remember me
                        </label>
                      </div>
                      <a href="#!" className="text-body">
                        Forgot password?
                      </a>
                    </div>

                    <div className="pt-2 mt-4 text-center text-lg-start">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </button>
                      <p className="pt-1 mt-2 mb-0 small fw-bold">
                        Don't have an account?{" "}
                        <a href="#!" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>

                    
                  </Form>
                )}
              </Formik>
              <div className="pt-2 mt-4 text-center text-lg-start">
                    {/* <GoogleOAuthProvider clientId="usamaqazi1234567@gmail.com"> */}
                    <div>
      {/* <h1>Google Sign-In</h1> */}
      <button className='login-with-google-btn' onClick={handleLoginSuccess}>Sign In With Google</button>
      {/* <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      /> */}
    </div>
    {/* </GoogleOAuthProvider> */}
                    </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LogIn;
