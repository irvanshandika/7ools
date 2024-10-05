<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Chat header -->
    <div class="bg-green-500 text-white p-4">
      <h1 class="text-xl font-bold">Gemini Chatbot</h1>
    </div>

    <!-- Chat messages -->
    <div class="flex-1 overflow-y-auto p-4" ref="chatContainer">
      <div v-for="(message, index) in messages" :key="index" class="mb-4">
        <div :class="['max-w-[70%] rounded-lg p-3', message.isUser ? 'bg-green-100 ml-auto' : 'bg-white']">
          <div v-html="renderMarkdown(message.content)"></div>
        </div>
      </div>
    </div>

    <!-- Input form -->
    <form @submit.prevent="sendMessage" class="bg-white p-4">
      <div class="flex items-center">
        <input v-model="userInput" type="text" placeholder="Type a message" class="flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        <button type="submit" class="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from "markdown-it";

interface Message {
  content: string;
  isUser: boolean;
}

export default defineComponent({
  setup() {
    const API_KEY = useRuntimeConfig().public.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-exp-0827",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 9999999,
      },
    });

    const messages = ref<Message[]>([]);
    const userInput = ref("");
    const chatContainer = ref<HTMLElement | null>(null);
    const md = new MarkdownIt();

    const sendMessage = async () => {
      if (!userInput.value.trim()) return;

      // Add user message
      messages.value.push({ content: userInput.value, isUser: true });

      // Clear input
      const userMessage = userInput.value;
      userInput.value = "";

      // Add loading message
      const loadingIndex = messages.value.push({ content: "Thinking...", isUser: false }) - 1;

      try {
        const result = await chat.sendMessageStream(userMessage);

        let buffer = [];
        for await (let response of result.stream) {
          buffer.push(response.text());
          // Update the loading message with the current buffer content
          messages.value[loadingIndex].content = buffer.join("");
          await nextTick();
          scrollToBottom();
        }
      } catch (e) {
        messages.value[loadingIndex].content = `Error: ${e instanceof Error ? e.message : String(e)}`;
      }

      scrollToBottom();
    };

    const renderMarkdown = (content: string): string => {
      return md.render(content);
    };

    const scrollToBottom = () => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    };

    onMounted(() => {
      scrollToBottom();
    });

    return {
      messages,
      userInput,
      sendMessage,
      renderMarkdown,
      chatContainer,
    };
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
