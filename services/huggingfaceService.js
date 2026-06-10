const axios = require("axios");

const generateAIImage = async (
  prompt
) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",

      {
        inputs: prompt,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },

        responseType: "arraybuffer",
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = generateAIImage;