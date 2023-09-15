import mode from "mode-embed-url";

function sign(body, headers) {
    let { agency } = body;
    let timestamp = Math.floor(Date.now() / 1000);
    let signedUrl = mode({
        organization: process.env.ORGANIZATION,
        report: process.env.REPORT_ID,
        key: process.env.ACCESS_TOKEN,
        secret: process.env.SECRET_KEY,
        maxAge: 86400,
        timestamp: timestamp,
        params: {
            agency: agency,
        },
    });
    return signedUrl;
}

export { sign };
