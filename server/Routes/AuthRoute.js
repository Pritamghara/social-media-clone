import  express  from "express";
import  {loginuser,registeruser } from "../Controllers/Authcontroller.js";

const router=express.Router()


router.post('/register',registeruser)
router.post('/login',loginuser)
export default router

// usage of routes
