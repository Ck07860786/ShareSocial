import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    socialMediaHandle: {
        type: String,
        required: true,
    },
    // Change 'images' to an array of objects to store multiple images
    images: [
        {
            public_id: { type: String },
            url: { type: String },
        }
    ]
}, { timestamps: true });  // Adding timestamps for creation and update tracking

export default mongoose.model("User", userSchema);




