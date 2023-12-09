import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single("file"), (req, res) => {
    try {
        // Handle the uploaded file here
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
