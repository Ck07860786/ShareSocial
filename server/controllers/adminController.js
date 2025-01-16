import { comparePassword, hashedPassword } from "../helper/authHelper.js";
import adminModel from "../models/adminModel.js";
import JWT from 'jsonwebtoken'



export const registerController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "All fields are required."
        });
      }
  
      const existingUser = await adminModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "User already registered."
        });
      }
  
      const hashPassword = await hashedPassword(password);
      const user = new adminModel({ username, email, password: hashPassword, });
      await user.save();
  
      res.status(200).send({
        success: true,
        message: "Registration successful",
        user: {
          name: user.username,
          email: user.email,
          admin:user._id,
        }
      });
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
        
      });
    }
  };


  
  export const loginController = async (req, res) => {
      try {
          const { username, password } = req.body;
  
          if (!username || !password) {
              return res.status(400).send({
                  success: false,
                  message: "Username and password are required."
              });
          }
  
          const admin = await adminModel.findOne({ username });
          if (!admin) {
              return res.status(400).send({
                  success: false,
                  message: "Admin not registered."
              });
          }
  
          const match = await comparePassword(password, admin.password);
          if (!match) {
              return res.status(400).send({
                  success: false,
                  message: "Incorrect password."
              });
          }
  
          const token = JWT.sign({ _id: admin._id }, process.env.JWT_KEY, { expiresIn: '1d' });
  
          res.status(200).send({
              success: true,
              message: 'Login successful',
              user: {
                  name: admin.username,
                  email: admin.email,
              },
              token
          });
      } catch (error) {
          console.log("Error during admin login:", error); 
          res.status(500).send({
              success: false,
              message: 'Something went wrong',
              error: error.message || error
          });
      }
  };
  