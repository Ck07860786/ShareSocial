import userModel from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";


export const submitHandleController = async (req, res) => {
    try {
      const { name, socialMediaHandle } = req.fields;
      const images = req.files.images;
  
      
      console.log("Images uploaded:", images);
  
      if (!name || !socialMediaHandle || !images) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const uploadedImages = [];
  
      
      if (Array.isArray(images)) {
        
        for (let file of images) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'ShareSocial',
            use_filename: true,
          });
  
          uploadedImages.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      } else {
        
        const result = await cloudinary.uploader.upload(images.path, {
          folder: 'ShareSocial',
          use_filename: true,
        });
  
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      
      const submission = new userModel({
        name,
        socialMediaHandle,
        images: uploadedImages,
      });
  
      await submission.save();
  
      res.status(201).send({
        success: true,
        message: "Submission created successfully!",
        submission,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create submission", error });
    }
  };
  
  
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await userModel.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch submissions", error });
  }
};




