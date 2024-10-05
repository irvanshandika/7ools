// server/api/chat.ts
import { defineEventHandler, readBody, createError } from "h3";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default defineEventHandler(async (event) => {
  console.log("Chatbot API called");

  try {
    const body = await readBody(event);
    console.log("Request body:", body);

    if (!body || !body.messages || !Array.isArray(body.messages)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request body",
      });
    }

    console.log("Sending request to OpenAI");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });

    console.log("Received response from OpenAI");
    return {
      message: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("Error in chat API:", error);

    if (error instanceof Error) {
      if (error.message.includes("429") || error.message.includes("exceeded your current quota")) {
        throw createError({
          statusCode: 429,
          statusMessage: "API quota exceeded. Please check your OpenAI plan and billing details.",
        });
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: `Error processing your request: ${error.message}`,
        });
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "An unexpected error occurred",
      });
    }
  }
});
