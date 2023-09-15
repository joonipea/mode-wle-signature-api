import * as app from "http";
import dotenv from "dotenv";
import { use } from "./use.js";
import { login } from "./methods/login.js";
dotenv.config();

const PORT = process.env.PORT || 7002;
const WHITELIST = process.env.WHITELIST;

const routes = {
    "/login": async (req, res) => {
        use(req, res, login);
    },
};
const server = app.createServer(async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", WHITELIST);
        // preflight request
        if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Methods", "POST");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.writeHead(200);
            res.end();
            return;
        }
        // handle routes
        if (routes[req.url]) {
            routes[req.url](req, res);
            return;
        }
    } catch (error) {
        console.log(error);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
