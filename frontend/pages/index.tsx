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
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">cards here</div>
        <div className="col-sm-12 col-md-12 col-lg-6">map here</div>
      </div>
    </div>
  );
};

export default Home;
