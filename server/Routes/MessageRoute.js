import express from 'express'
import { addmessage, getmessage } from '../Controllers/Messagecontroller.js'

const router=express.Router()


router.post('/',addmessage)
router.get('/:chatid',getmessage)


export default router