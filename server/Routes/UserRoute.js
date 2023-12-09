


import express from 'express'
import { deleteuser, followuser, getAllUsers, getuser, unfollowuser, updateuser } from '../Controllers/Usercontroller.js'
import authmiddleware from '../Middleware/authmiddleware.js'
const router=express.Router()

router.get('/',getAllUsers)
router.get('/:id',getuser)
router.put('/:id',updateuser)
router.delete("/:id",deleteuser)
router.put('/:id/follow',followuser)
router.put('/:id/unfollow',unfollowuser)
export default router