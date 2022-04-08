import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Login = ({ theme }) => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify("Invalid username or password")
    );
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { align: "right", margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          name="username"
          placeholder="Enter username"
          fullWidth
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Typography>
          {" "}
          Do you have an account ? <Link href="signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
