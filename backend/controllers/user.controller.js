// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, password, role } = req.body;
         
//         if (!fullname || !email || !phoneNumber || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         const file = req.file;
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: 'User already exist with this email.',
//                 success: false,
//             })
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             role,
//             profile:{
//                 profilePhoto:cloudResponse.secure_url,
//             }
//         });

//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
        
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         };
        
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             })
//         };

//         const tokenData = {
//             userId: user._id
//         }
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const logout = async (req, res) => {
//     try {
//         return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//             message: "Logged out successfully.",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
      
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id;
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }
  
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray
      
      
//         if(cloudResponse){
//             user.profile.resume = cloudResponse.secure_url
//             user.profile.resumeOriginalName = file.originalname
//         }


//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully.",
//             user,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if profile photo is uploaded
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Please upload a profile photo.",
                success: false,
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Check password match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role.",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        // Remove sensitive data before sending response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production", // Secure in production
            })
            .json({
                message: `Welcome back, ${user.fullname}!`,
                user,
                success: true,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id; // Get user ID from middleware

        // Find user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        // Handle file upload for resume (optional)
        let cloudResponse;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        // Update fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        // Handle skills array
        if (skills) {
            user.profile.skills = skills.split(",");
        }

        // Update resume only if a new file is uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        // Save updated user
        await user.save();

        // Return updated user info
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};
