import { Box, Button } from "@twilio-paste/core";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as toastr from "toastr";

import { useAppState } from "../../core/AppStateContext";
import { useApi } from "../../core/api";

export default function Register() {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();
  const { setUser } = useAppState();
  const { post } = useApi();

  function signup(data) {
    post("auth/register", data)
      .then((user) => {
        setUser(user);
        router.push("/");
      })
      .catch((error) => {
        toastr.error(error.response.data.message, "Registration Failed!");
      });
  }

  return (
    <div className="container">
      <div className="py-5 text-center">
        <img
          className="mb-4"
          src="/brand.svg"
          alt=""
          width="132"
          height="132"
        />
        <h2>Register a new account</h2>
        <p className="lead">Register with us to get started</p>
      </div>
      <div className="row justify-content-md-center">
        <div className="col col-lg-6 register-form">
          <form
            className="needs-validation"
            noValidate
            onSubmit={handleSubmit(signup)}
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  ref={register}
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  ref={register}
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                ref={register}
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for login.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                ref={register}
              />
              <div className="invalid-feedback">
                Please enter a valid password.
              </div>
            </div>
            <Box marginTop="space60" className="text-center">
              <Button variant="primary" type="submit" fullWidth>
                Register
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}
