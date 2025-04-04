/* eslint-disable prettier/prettier */
export const isDev = process.env.NODE_ENV === "development";

export const ORIGIN_URL = isDev ? "http://localhost:3000" : 'https://summarizer-ji6psu4fv-aritra25s-projects.vercel.app'