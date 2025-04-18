"use client"

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation
import { useRouter } from 'next/navigation';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const SignUp = () => {
  const router = useRouter();

  // Formik setup with validation schema
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      try {
          let result = await fetch("/api/register.js", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          console.log(result,'result')
          if (result.status === 403) {
              // Handle forbidden error
              console.error("Forbidden: Token missing or invalid");
          } else if (result.ok) {
              result = await result.json();
              console.log(result);
              localStorage.setItem('users', JSON.stringify(result.result));
              localStorage.setItem('token', JSON.stringify(result.auth));
              router.push("/");
          } else {
              console.error("Registration failed");
          }
      } catch (error) {
          console.error("An error occurred during registration:", error);
      }
  }
  
  });

  React.useEffect(() => {
    const auth = localStorage.getItem('users');
    if (auth) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className='mtusa'>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-6 col-xl-5">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="text-center">
                    <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Register
                    </p>
                  </div>
                  <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw" />
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-label" htmlFor="form3Example1c">
                          Your Name
                        </label>
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-label" htmlFor="form3Example3c">
                          Your Email
                        </label>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw" />
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-label" htmlFor="form3Example4c">
                          Password
                        </label>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-6 col-xl-7 d-flex align-items-center justify-content-center order-1 order-lg-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
