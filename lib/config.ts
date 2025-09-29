export const config = {
  backend: {
    url: process.env.NEXT_PUBLIC_BACKEND_URL || "https://ksb-impl-be.intelligentso.com"
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "AIzaSyBwM-8qWcUoYY5TjQZYunatHsF3RGspoJo",
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent"
  }
};

