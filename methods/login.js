import { sign } from "./sign.js";

async function login(body, headers) {
    try {
        let users = JSON.parse(process.env.AGENCY_USERS);
        if (body.password !== users[body.agency] || !users[body.agency]) {
            throw new Error("Invalid credentials");
        }
        return sign(body, headers);
    } catch (error) {
        return error;
    }
}

export { login };
