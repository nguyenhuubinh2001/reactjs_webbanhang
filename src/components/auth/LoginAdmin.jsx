import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import callApi from "../../callAPI/apiCaller";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginAdmin() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const showNoti = (message, variant) => {
    enqueueSnackbar(message, { variant: variant });
  }

  
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  function onChageInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setAccount({
      ...account,
      [name]: value,
    });
  }

  function onClickLogin(e) {
    e.preventDefault();
    let remember = document.getElementById("remember").checked;

    callApi("signin", "POST", {
      username: account.username,
      password: account.password,
      // remember: remember
    })
      .then((response) => {
        const { data } = response;
        if (data.roles.includes("ROLE_ADMIN")) {
          showNoti("Đăng nhập thành công", 'success')
          document.cookie = "token=" + response.data.token;
          document.cookie = "username=" + response.data.username;
          document.cookie = "fullname=" + response.data.fullname;
          window.location.href = "/admin";
        } else {
          showNoti("Sai username hoặc password", 'error')
        }
      })
      .catch(function (error) {
        showNoti("Sai username hoặc password", 'error')
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login Admin
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={onChageInput}
            value={account.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChageInput}
            value={account.password}
          />
          <FormControlLabel
            control={
              <Checkbox id="remember" value="remember" color="primary" />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
