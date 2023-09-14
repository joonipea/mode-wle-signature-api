import * as app from "http";
import { signUrl } from "./sign.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 7002;
const server = app.createServer(async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Methods", "POST");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.writeHead(200);
            res.end();
            return;
        }
        let body;
        req.on("data", async (data) => {
            body = JSON.parse(data);
        });
        req.on("end", async () => {
            let { url, access_key, timestamp } = body;
            let secret = process.env.SECRET_KEY;
            let signedUrl = await signUrl(url, access_key, secret, timestamp);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ signedUrl }));
        });
    } catch (error) {
        console.log(error);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
