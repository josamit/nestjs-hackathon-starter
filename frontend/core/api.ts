import { useToaster } from "@twilio-paste/core";
import Axios from "axios";
import { useEffect, useState } from "react";

const api = Axios.create({
  baseURL: "/api",
});

export default api;

export function apiGet(path: string, dataSetter: any) {
  return api.get(path).then((res) => dataSetter(res.data));
}

export function useGet<T = any>(
  path: string,
  deps: any[] = [],
): {
  data: T;
  refetch(): void;
} {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiGet(path, setData);
  }, deps);

  return {
    data,
    refetch: () => apiGet(path, setData),
  };
}

export function useApi() {
  const toaster = useToaster();

  const methods = ["get", "post", "put", "patch", "delete"];
  const apiObj = {};

  methods.forEach((method) => {
    apiObj[method] = (...args) =>
      api[method](...args).catch((err) => {
        toaster.push({
          message: "Something went wrong with the request.",
          variant: "error",
        });

        throw err;
      });
  });

  return apiObj as typeof api;
}
