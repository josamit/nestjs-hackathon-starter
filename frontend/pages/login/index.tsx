import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as toastr from "toastr";

import { UserDto } from "../../components/domain/UserDto";
import { useAppState } from "../../core/AppStateContext";
import { useApi } from "../../core/api";
import "../../styles/login.scss";

export default function Register() {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();
  const { setUser } = useAppState();
  const { post } = useApi();

  function login(data) {
    post<UserDto>("auth/login", data)
      .then((response) => {
        setUser(response.data);
        router.push("/");
      })
      .catch((error) => {
        toastr.error(error.response.data.message, "Login Failed!");
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-lg-6 login-form">
          <form className="form-signin" onSubmit={handleSubmit(login)}>
            <div className="text-center">
              <img
                className="mb-4"
                src="/brand.svg"
                alt=""
                width="132"
                height="132"
              />
              <h1 className="h3 mb-4 font-weight-normal">Please log in</h1>
            </div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={register}
              className="form-control"
              placeholder="Email address"
              required
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={register}
              className="form-control mb-3"
              placeholder="Password"
              required
            />
            <div className="text-center">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: "8rem" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
