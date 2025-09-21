/** @format */

import dotenv from 'dotenv'
dotenv.config()

function getApiKey() {
  const apiKeyArg = process.argv.find(arg => arg.startsWith('--apikey='));
  if (apiKeyArg) {
    return apiKeyArg.split('=')[1];
  }
  return process.env.GEMINI_API_KEY;
}

export const GEMINI_API_KEY = getApiKey();

export const MODELS = {
  TEXT_ONLY: 'gemini-2.5-flash',
  TEXT_AND_IMAGE: 'gemini-2.5-pro',
  // Add other models as they become available
}

export const DEFAULT_MODEL = MODELS.TEXT_ONLY

export function getModel(type = DEFAULT_MODEL) {
  if (!Object.values(MODELS).includes(type)) {
    console.warn(`Model type "${type}" not recognized. Using default model: ${DEFAULT_MODEL}`)
    return DEFAULT_MODEL
  }
  return type
}
