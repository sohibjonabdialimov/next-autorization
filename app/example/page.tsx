"use client";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// async function getData(values: object) {
//   const res = await axios.post('https://reqres.in/api/login', values);

//   // Recommendation: handle errors
//   // if (!res.ok) {
//   //   throw new Error('Failed to fetch data');
//   // }

//   return res;
// }

export default async function Login() {
  // useEffect(() => {
    
  // }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("https://reqres.in/api/login", values)
        .then((res) => {
          // if(!res.ok){
          //   throw new Error("Nimadur xato")
          // }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          
        });

      console.log(values);
    },
  });

  const emailRef: any = useRef();
  const passwordRef: any = useRef();

  return (
    <main className="main">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__wrap">
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              inputRef={emailRef}
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              aria-describedby="my-helper-email"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="required">{formik.errors.email}</span>
            ) : null}
            <FormHelperText id="my-helper-email">Email</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              inputRef={passwordRef}
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              aria-describedby="my-helper-password"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="required">{formik.errors.password}</span>
            ) : null}
            <FormHelperText id="my-helper-password">Password</FormHelperText>
          </FormControl>
        </div>
        <Button type="submit" variant="contained" size="medium">
          Submit
        </Button>
      </form>
    </main>
  );
}
