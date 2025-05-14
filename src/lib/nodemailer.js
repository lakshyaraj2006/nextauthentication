import { createTransport } from "nodemailer";
import { config } from "./config-env";

export const transporter = createTransport({
    host: config.NODEMAILER_HOST,
    port: config.NODEMAILER_PORT,
    auth: {
        user: config.NODEMAILER_USERNAME,
        pass: config.NODEMAILER_PASSWORD
    }
});