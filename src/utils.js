import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "kyungjin@prismagram.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
  };
  return sgMail.send(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
