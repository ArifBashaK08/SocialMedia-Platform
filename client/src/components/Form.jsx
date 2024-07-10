import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  profilePic: yup.mixed(),
});

const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const signUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  profilePic: "",
};

const signInInitialValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("signin");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isSignin = pageType === "signin";
  const isSignUp = pageType === "signup";

  const apiURL = "https://vibes-server.onrender.com"

  const signUp = async (values, onsubmitProps) => {
    // Allows us to send form data with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePic", values.profilePic.name);

    const saveResponse = await fetch(`${apiURL}/signup`, {
      method: "POST",
      body: formData,
    });
    const savedUser = await saveResponse.json();
    onsubmitProps.resetForm();

    if (savedUser) {
      setPageType("signin");
    }
  };

  const signIn = async (values, onsubmitProps) => {
    try {
      const logInResponse = await fetch(`${apiURL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await logInResponse.json();
      onsubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      } else {
        navigate("*", { state: { message: loggedIn.message } })
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  }

  const formHandler = async (values, onsubmitProps) => {
    if (isSignin) await signIn(values, onsubmitProps);
    if (isSignUp) await signUp(values, onsubmitProps);
  };

  return (
    <Formik
      onSubmit={formHandler}
      initialValues={isSignin ? signInInitialValues : signUpInitialValues}
      validationSchema={isSignin ? signInSchema : signUpSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isSignUp && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("profilePic", acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.profilePic ? (
                          <p>Add Image here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.profilePic.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            {isSignin && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
          </Box>
          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                fontSize: "1rem",
                fontWeight: 900,
                m: "2rem 0",
                p: "1rem",
                background: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isSignin ? "Sign In" : "Sign Up"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isSignin ? "signup" : "signin");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              {isSignin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
