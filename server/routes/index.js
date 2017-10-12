import express from 'express'

import handleRender from '../render'

const router = express.Router()

router.get('/', handleRender)

export default router
