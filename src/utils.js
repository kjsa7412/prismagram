import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
// import nodemailer from "nodemailer";
// import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

console.log(process.env.SENDGRID_API_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const email = (address, secret) => ({
  from: "kyungjin@prismagram.com",
  to: address,
  subject: "🔒Login Secret for Prismagram🔒",
  html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
});

sgMail.send(email("kjsa7412@gmail.com", "123"));
