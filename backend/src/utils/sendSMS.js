import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (phone, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}`,
    });

    console.log("SMS sent successfully");
  } catch (error) {
    console.log("SMS sending failed:", error.message);
  }
};
