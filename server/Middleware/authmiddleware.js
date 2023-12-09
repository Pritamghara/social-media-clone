import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_KEY;

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, secret);

      // Add the decoded user ID to the request body
      req.body._id = decoded?.id;
    }

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    // Handle authentication errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // For any other errors, you can respond with a generic message
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export default authmiddleware;
