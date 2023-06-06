"use client";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const pathname = usePathname();
  
  useEffect(() => {
    if(pathname === "/login" && localStorage.getItem("token")){
      router.push("/admin");
    }
  }, [])
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
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            router.push("/admin");
          } else {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            alert("Password or email error");
            throw new Error("nimadur xato");
          }
          console.log(res);
        })
        .catch((err) => {
          alert("Password or Email error");
          console.log(err);
        });
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
          </FormControl>
        </div>
        <Button type="submit" variant="contained" size="medium">
          Submit
        </Button>
      </form>
    </main>
  );
}
