"use server";

// This is a function that logs a message to the server console
// easier to read than browser console, also, it is server side.
export default async function serverLog(message: string) {
  console.log(message);
}
