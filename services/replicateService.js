// // const Replicate =
// //   require("replicate");

// // const replicate =
// //   new Replicate({
// //     auth:
// //       process.env
// //         .REPLICATE_API_TOKEN,
// //   });

// // exports.generatePose =
// //   async (
// //     image,
// //     gender,
// //     pose,
// //     background,
// //     seed
// //   ) => {
// //     const prompt = `
// //     Ultra realistic ecommerce fashion photography.

// //     Professional ${gender} fashion model.

// //     ${pose} pose.

// //     ${background} studio background.

// //     Myntra catalog style.

// //     Preserve exact clothing design.

// //     Preserve logo and texture.

// //     Ultra HD.
// //     `;

// //     const output =
// //       await replicate.run(
// //         "black-forest-labs/flux-schnell",
// //         {
// //           input: {
// //             prompt,

// //             width: 1024,

// //             height: 1024,

// //             seed,

// //             num_outputs: 1,

// //             num_inference_steps: 4,
// //           },
// //         }
// //       );

// //     console.log(
// //       "REPLICATE OUTPUT:",
// //       output
// //     );

// //     // =========================
// //     // HANDLE OUTPUT
// //     // =========================

// //     if (
// //       Array.isArray(output)
// //     ) {
// //       return output[0].url
// //         ? output[0].url()
// //         : output[0];
// //     }

// //     if (
// //       typeof output ===
// //       "string"
// //     ) {
// //       return output;
// //     }

// //     if (output.url) {
// //       return output.url();
// //     }

// //     return output;
// //   };
// const axios = require("axios");

// exports.generatePose = async (clothImageUrl, pose, gender) => {
//   // Using free API for demo - Replace with your actual API
//   const prompt = `A professional ${gender} fashion model wearing this exact clothing. ${pose}. Studio lighting, e-commerce quality, realistic, HD.`;
  
//   // For now, return placeholder with cloth image
//   // In production, replace with actual AI API call
//   return clothImageUrl;
// };
const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

exports.generateModelPose = async (clothingImageUrl, pose, gender, background) => {
  // Different prompts for different genders
  const genderText = gender === 'female' ? 'beautiful female' : gender === 'male' ? 'handsome male' : 'cute kid';
  
  const poseText = {
    front: 'standing straight, facing the camera directly, full frontal view',
    left: 'standing, turned 45 degrees to the left, showing left side profile',
    right: 'standing, turned 45 degrees to the right, showing right side profile',
    back: 'standing, facing away from camera, showing back side'
  };
  
  const bgText = background === 'cream' ? 'cream colored' : background === 'lightgrey' ? 'light gray' : 'professional studio';
  
  const prompt = `A professional ${genderText} fashion model wearing this exact clothing. ${poseText[pose]}. ${bgText} background. Professional e-commerce fashion photoshoot, Myntra catalog quality, Ultra HD, realistic skin texture, natural pose, sharp details, 4K resolution. The model must wear EXACTLY the same clothing as shown in the reference image - same design, same colors, same patterns.`;

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          image: clothingImageUrl,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          num_inference_steps: 4,
        },
      }
    );

    if (Array.isArray(output)) {
      return output[0];
    }
    return output;
  } catch (error) {
    console.error("Error generating pose:", error);
    throw error;
  }
};