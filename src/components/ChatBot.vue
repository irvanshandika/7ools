<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Chat header -->
    <div class="bg-green-600 text-white p-4 flex items-center">
      <div class="w-10 h-10 rounded-full bg-white mr-3 flex items-center justify-center">
        <img src="/bard.svg" alt="Gemini" class="w-6 h-6" />
      </div>
      <div>
        <h1 class="text-xl font-bold">Gemini Chatbot</h1>
        <p class="text-sm">{{ currentTime }}</p>
      </div>
    </div>

    <!-- Chat messages -->
    <div class="flex-1 overflow-y-auto p-4 bg-[#e5ded8]" ref="chatContainer">
      <div v-for="(message, index) in messages" :key="index" class="mb-4 flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
        <div class="flex items-end" :class="message.isUser ? 'flex-row-reverse' : ''">
          <div class="w-8 h-8 rounded-full flex-shrink-0 mr-2" :class="message.isUser ? 'ml-2' : ''">
            <img :src="message.isUser ? 'https://api.iconify.design/material-symbols:person.svg' : '/bard.svg'" alt="Avatar" class="w-full h-full rounded-full" />
          </div>
          <div :class="['max-w-[70%] rounded-lg p-3 relative', message.isUser ? 'bg-green-100' : 'bg-white']">
            <div v-html="renderMarkdown(message.content)"></div>
            <div class="text-xs text-gray-500 mt-1 text-right">{{ message.time }}</div>
            <div
              :class="['absolute bottom-0 w-0 h-0', message.isUser ? '-right-2 border-l-[10px] border-l-green-100' : '-left-2 border-r-[10px] border-r-white']"
              style="border-top: 10px solid transparent; border-bottom: 10px solid transparent"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input form -->
    <form @submit.prevent="sendMessage" class="bg-gray-200 p-4">
      <div class="flex items-center bg-white rounded-full">
        <input v-model="userInput" type="text" placeholder="Type a message" class="flex-1 py-2 px-4 rounded-full focus:outline-none" />
        <button type="submit" class="bg-green-500 text-white rounded-full p-2 mx-1 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          <SendIcon class="w-20" />
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import { SendIcon, User2 } from "lucide-vue-next";

interface Message {
  content: string;
  isUser: boolean;
  time: string;
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
    const currentTime = ref("");

    const updateCurrentTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const sendMessage = async () => {
      if (!userInput.value.trim()) return;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Add user message
      messages.value.push({ content: userInput.value, isUser: true, time: timeString });

      // Clear input
      const userMessage = userInput.value;
      userInput.value = "";

      // Add loading message
      const loadingIndex = messages.value.push({ content: "Thinking...", isUser: false, time: timeString }) - 1;

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
      updateCurrentTime();
      setInterval(updateCurrentTime, 60000); // Update time every minute
    });

    return {
      messages,
      userInput,
      sendMessage,
      renderMarkdown,
      chatContainer,
      currentTime,
    };
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
