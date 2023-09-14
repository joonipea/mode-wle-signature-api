import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

async function signUrl(url, key, secret, timestamp) {
    try {
        if (
            key === undefined ||
            secret === undefined ||
            timestamp === undefined
        ) {
            throw new Error(
                "Missing required parameters. Please check your configuration."
            );
        }
        if (key !== process.env.ACCESS_TOKEN) {
            throw new Error(
                "Invalid access token. Please check your configuration."
            );
        }
        var requestType = "GET";
        var contentType = null;
        var contentBody = "";
        var contentDigest = crypto
            .createHash("md5")
            .update(contentBody)
            .digest()
            .toString("base64");

        var requestString = [
            requestType,
            contentType,
            contentDigest,
            url,
            timestamp,
        ].join(",");

        var signature = crypto
            .createHmac("sha256", secret)
            .update(requestString)
            .digest("hex");

        var signedUrl = url + "&signature=" + signature;
        return signedUrl;
    } catch (err) {
        console.log(err);
    }
}

export { signUrl };
