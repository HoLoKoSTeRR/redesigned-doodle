/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./Auth.css";
import "./styles-custom.css";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {"\n"}
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

let values = {
  email: "",
  password: "",
  rep_password: "",
  remember: false,
};
let handleChange = (event) => {
  values = {
    ...values,
    [event.target.name]: event.target.value,
  };
};
let handleBlur = (event) => {
  values = {
    ...values,
    [event.target.name]: event.target.value,
  };
};

const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rep_password: "",
          phone: "",
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .min(8, "Password must be 8 characters or longer")
            .required("No password provided.")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              "Password must contain at least one letter and one number"
            ),
          rep_password: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
          phone: Yup.string()
            .matches(/^\d{3}\s*-*\d{3}\s*-*\d{4}$/, "Phone number is not valid")
            .required("Phone number is required"),

          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <TextInput
            label="Confirm Password"
            name="rep_password"
            type="password"
            placeholder="Confirm Password"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <TextInput
            label="Phone Number"
            name="phone"
            type="text"
            placeholder="800-555-3535"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <Checkbox name="acceptedTerms">
            I accept the terms and conditions
          </Checkbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;
