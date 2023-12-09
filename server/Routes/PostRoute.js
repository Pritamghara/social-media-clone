import  express  from "express";
import { createpost, deletepost, getpost, gettimelinepost, likepost, updatepost } from "../Controllers/Postcontroller.js";

const router=express.Router()



router.post('/',createpost)
router.get('/:id',getpost)
router.put('/:id',updatepost)
router.delete('/:id',deletepost)
router.put('/:id/like',likepost)
router.get('/:id/timeline',gettimelinepost)

export  default router