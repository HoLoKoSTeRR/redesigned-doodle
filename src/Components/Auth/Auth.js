import Axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import validateForm from "../../utils/validateform";
import "./Auth.css";
import { AuthContext } from "../../context/auth-context";
import Spinner from "../../Containers/Spinner/Spinner";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./Auth.css";
// import "./styles.css";
// import "./styles-custom.css";

const validationRules = Yup.object().shape({
  email: Yup.string().email("Invalid email addresss`").required("Required"),
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
});

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

const LoginForm = () => (
  <>
    {({
      auth, values, errors, touched, handleChange,
    }) => (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationRules}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            Axios.post("/user/login", this.state.user)
              .then((response) => {
                this.setState(() => ({
                  isloading: false,
                }));
                this.props.history.push("/");
                auth.login(response.data.userId, response.data.token);
                return Axios.get("/profile/viewprofile");
              })
              .then((data) => {
                let profile = data.data.profile.username;
                localStorage.setItem(
                  "profileData",
                  JSON.stringify({
                    username: profile,
                  })
                );
              })
              .catch((e) => {
                this.setState({
                  isloading: false,
                  error: {
                    ...this.state.error,
                    message: e.response.data.message,
                    code: e.response.status,
                  },
                });
              });
            setSubmitting(false);
          }, 500);
        } }
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={values.email}
                placeholder="Enter email" />
            </div>
            <div className="form-group">
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password" />
            </div>
          </Form>
        )}
      </Formik>
    )}
  </>
);

const SignupForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rep_password: "",
          phone: "",
          acceptedTerms: false,
        }}
        validationSchema={validationRules}
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
            placeholder="Email"
            /* handleChange={}
            handleBlur={} */
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            /* handleChange={}
            handleBlur={} */
          />
          <TextInput
            label="Confirm Password"
            name="rep_password"
            type="password"
            placeholder="Confirm Password"
            /* handleChange={}
            handleBlur={} */
          />
          <TextInput
            label="Phone Number"
            name="phone"
            type="text"
            placeholder="800-555-3535"
            /* handleChange={}
            handleBlur={} */
          />
          <Checkbox name="acceptedTerms">
            I accept the terms and conditions
          </Checkbox>
        </Form>
      </Formik>
    </>
  );
};
export class Auth extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: "",
        rep_password: "",
        phone: "",
      },
      error: {
        message: "",
        code: "",
      },
      isloading: false,
      isLoginMode: true,

      errors: {
        email: "",
        password: "",
        rep_password: "",
      },
    };
  }

  mySubmitHandler = (event) => {
    this.setState(() => ({
      isloading: true,
    }));
    const auth = this.context;
    event.preventDefault();

    if (validateForm(this.state.errors)) {
    } else {
    }
    if (this.state.isLoginMode) {
      Axios.post("/user/login", this.state.user)
        .then((response) => {
          this.setState(() => ({
            isloading: false,
          }));
          this.props.history.push("/");
          auth.login(response.data.userId, response.data.token);
          return Axios.get("/profile/viewprofile");
        })
        .then((data) => {
          let profile = data.data.profile.username;
          localStorage.setItem(
            "profileData",
            JSON.stringify({
              username: profile,
            })
          );
        })
        .catch((e) => {
          this.setState({
            isloading: false,
            error: {
              ...this.state.error,
              message: e.response.data.message,
              code: e.response.status,
            },
          });
        });
    } else {
      this.setState(() => ({
        isloading: true,
      }));
      Axios.post("/user/signup", this.state.user)
        .then(() => {
          this.setState(() => ({
            isloading: false,
          }));
        })
        .catch(() => {
          this.setState({ error: true });
        });
    }
    this.setState({
      user: { ...this.state.user, email: "", password: "" },
    });
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let errors = this.state.errors;

    this.setState(
      { errors, user: { ...this.state.user, [nam]: val } },
      () => {}
    );
  };

  switchLoginhandler = () => {
    this.setState((pre) => ({
      isLoginMode: !pre.isLoginMode,
    }));
  };

  render() {
    let isLoading;

    if (this.state.isloading) {
      isLoading = (
        <>
          <div className="container loading">
            <div className="mar-20">
              <Spinner />
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {isLoading}

        <div className="container container-short py-5">
          <h1 className="pt-2 py-2">
            {this.state.isLoginMode ? "Login " : "Sign Up"}
          </h1>
          <hr></hr>
          {this.state.isLoginMode ? <LoginForm /> : <SignupForm />}
          <div className="form-group">
            <button
              style={{ marginRight: "15px" }}
              type="submit"
              className="btn btn-primary"
              disabled={
                this.state.user.email &&
                this.state.user.password &&
                validateForm(this.state.errors)
                  ? ""
                  : "disabled"
              }
            >
              {this.state.isLoginMode ? "Login" : "Sign Up"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.switchLoginhandler}
            >
              Switch to {this.state.isLoginMode ? "Sign Up" : "Login"}{" "}
            </button>
          </div>
        </div>

        {/*   <form onSubmit={this.mySubmitHandler} className="pt-4">
             <div className="form-group">
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                value={this.state.user.email}
                className={
                  "form-control " +
                  (this.state.errors.email ? "is-invalid" : "")
                }
                placeholder="Enter your email"
                required
                onChange={this.myChangeHandler}
              />
              {this.state.errors.email.length > 0 && (
                <div className="mt-1">
                  <span className="error text-danger">
                    {this.state.errors.email}
                  </span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                name="password"
                value={this.state.user.password}
                className={
                  "form-control " +
                  (this.state.errors.password ? "is-invalid" : "")
                }
                placeholder="Enter your Password"
                required="required"
                data-error="Please enter your password."
                onChange={this.myChangeHandler}
              />
              {this.state.errors.password.length > 0 && (
                <div className="mt-1">
                  {" "}
                  <span className="error text-danger">
                    {this.state.errors.password}
                  </span>
                </div>
              )}
            </div> 
            <div className="form-group">
              <button
                style={{ marginRight: "15px" }}
                type="submit"
                className="btn btn-primary"
                disabled={
                  this.state.user.email &&
                  this.state.user.password &&
                  validateForm(this.state.errors)
                    ? ""
                    : "disabled"
                }
              >
                {this.state.isLoginMode ? "Login" : "Sign Up"}
              </button>
        </div> 
        </form> 
        </div> */}
      </>
    );
  }
}

export default withRouter(Auth);
