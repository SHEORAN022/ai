const axios =
  require("axios");

axios
  .get(
    "https://api-inference.huggingface.co"
  )
  .then((res) => {
    console.log(
      "Connected"
    );
  })
  .catch((err) => {
    console.log(
      err.message
    );
  });