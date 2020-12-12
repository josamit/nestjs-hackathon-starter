import { Box, Heading } from "@twilio-paste/core";
import { useEffect } from "react";

import { useAppState } from "../core/AppStateContext";
import api from "../core/api";

const Home = () => {
  const {
    state: { user },
  } = useAppState();

  useEffect(() => {
    api
      .get("/")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <Box marginTop="space120" marginBottom="space120" alignContent="center">
        <Heading as="h1" variant="heading10">
          {user && <>{`Hello, ${user.email}!`}</>}
          {!user && <>Hello!</>}
        </Heading>
      </Box>
    </div>
  );
};

export default Home;
