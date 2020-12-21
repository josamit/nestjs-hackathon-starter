import { Box, Flex } from "@twilio-paste/core";
import { Router, useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { useAppState } from "../../core/AppStateContext";
import api from "../../core/api";
import { UserDto } from "../domain/UserDto";

const Navbar: FC = () => {
  const router = useRouter();

  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  Router.events.on("routeChangeStart", () => setIsNavExpanded(false));

  const {
    state: { user },
    setUser,
  } = useAppState();

  useEffect(() => {
    api
      .get<UserDto>("/user-sessions")
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => console.error(e));
  }, []);

  function logout() {
    api.delete("/user-sessions").then(() => {
      setUser(null);
      router.push("/");
    });
  }

  const isConsole = router.pathname.startsWith("/console");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-xl">
        <Flex vAlignContent="center">
          <Flex grow>
            <Box width="100%">
              <a
                className="navbar-brand"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                <img
                  src="/brand.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
              </a>
            </Box>
          </Flex>
          <Flex grow>
            <Box width="100%">
              <a
                className="navbar-brand"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                Hackathon Starter
              </a>
            </Box>
          </Flex>
        </Flex>
        <button
          className="navbar-toggler"
          type="button"
          onClick={(e) => setIsNavExpanded(!isNavExpanded)}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={
            isNavExpanded
              ? "navbar-collapse collapse show"
              : "navbar-collapse collapse"
          }
          id="navbarSupportedContent"
        >
          {user ? (
            <ul className="navbar-nav ml-auto">
              {!isConsole && user.canAccessAdminDashboard && (
                <li className="nav-item p-1 ml-auto">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => router.push("/console/dashboard")}
                  >
                    Go to dashboard
                  </button>
                </li>
              )}
              <li className="nav-item p-1 ml-auto">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item p-1 ml-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item p-1  ml-auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => router.push("/register")}
                >
                  Sign up
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
