import express, { Request, Response } from "express";
import proxy from "express-http-proxy";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const port = process.env.PORT || 4040;

const API_HOST = process.env.API_HOST || "localhost";

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use("/api", proxy(`http://${API_HOST}:4050`));

    server.use(function (req, res, n) {
      res.setHeader(
        "Access-Control-Allow-Headers",
        "accept, authorization, content-type, x-requested-with"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
      );
      const origin = req.header("origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
      if (false && origin) {
        res.setHeader("Access-Control-Allow-Origin", req.header("origin"));
      }

      n();
    });

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
