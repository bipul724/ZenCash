"use server";

import { Resend } from "resend";
//a function sendEmail that accepts email details.
export async function sendEmail({ to, subject, react }) {
  //new Resend will create a instance that can communicate with resend api
  const resend = new Resend(process.env.RESEND_API_KEY || "");


  //Actually sends the email.

// from: the sender name + address.

// to: the recipient(s).

// subject: subject line of the email.

// react: a React component for the email body (React Email renders it to HTML).
  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}