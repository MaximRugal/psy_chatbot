import OpenAI from 'openai';
import { createReadStream } from 'fs';
import * as dotenv from 'dotenv';
import { Logger } from '../utils/logger.utils.js';

dotenv.config({ path: `.env${process.env.NODE_ENV}` });
const API_KEY = process.env.OPENAI_API_KEY;

console.log(API_KEY);

class OpenAIApi {
  roles = {
    SYSTEM: 'system',
    USER: 'user',
    ASSISTANT: 'assistant',
  };
  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  // Getting ChatGPT response
  async chat(messages) {
    console.log('CHAT:');
    console.log(messages);
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.5,
        // max_tokens: 64,
        // top_p: 1,
      });
      console.log(response);

      return response.choices[0].message;
    } catch (err) {
      Logger.error('Request to ChatGPT', 'openAi.api', '', err.message, 'ERROR');
    }
  }

  async chat2(messages, context) {
    console.log('CHAT:');
    console.log(messages);
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [],
        temperature: 0.5,
        // max_tokens: 64,
        // top_p: 1,
      });
      console.log(response);

      return response.choices[0].message;
    } catch (err) {
      Logger.error('Request to ChatGPT', 'openAi.api', '', err.message, 'ERROR');
    }
  }

  // Translating .mp3 to text
  async speechToText(filePath) {
    try {
      const response = await this.openai.createTranscription(createReadStream(filePath), 'whisper-1');
      return response.data.text;
    } catch (err) {
      Logger.error('Speech to text', 'openAi.api', '', err.message, 'ERROR');
    }
  }

  async getPicture(message) {}
}

export const openAi = new OpenAIApi(API_KEY);
