async function use(req, res, func) {
    let body = {};
    let headers = req.headers;
    req.on("error", (err) => {
        console.log(err);
    })
        .on("data", async (data) => {
            body = JSON.parse(data);
        })
        .on("end", async () => {
            const msg = await func(body, headers);
            res.on("error", (err) => {
                console.error(err);
                res.writeHead(500);
                res.end();
            });
            res.end(JSON.stringify(msg));
        });
}

export { use };
