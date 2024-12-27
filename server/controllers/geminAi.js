const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class geminiAi {
  static async gemini(req, res, next) {
    try {
      const { input } = req.body;

      const prompt = `${input}`;

      const result = await model.generateContent(prompt);
      res.json(result.response.text());
      console.log(result.response.text());
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = geminiAi;
