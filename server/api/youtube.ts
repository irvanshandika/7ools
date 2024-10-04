import { defineEventHandler, readBody } from "h3";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url } = body;

  if (!url) {
    return {
      status: "error",
      message: "URL is required",
    };
  }

  try {
    const response = await axios.get("https://mr-apis.com/api/downloader/ytbv", {
      params: { url },
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    return {
      status: "error",
      message: "Failed to fetch video information",
    };
  }
});
