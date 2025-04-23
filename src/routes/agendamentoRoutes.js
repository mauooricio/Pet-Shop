import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import multer from 'multer'
import path from 'path'
import { listar, criar, atualizar, excluir } from '../controllers/agendamentoController.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './src/uploads'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage })

const router = Router()
router.use(authMiddleware)

router.get('/',       listar)
router.post('/',      upload.single('imagem'), criar)
router.put('/:id',    upload.single('imagem'), atualizar)
router.delete('/:id', excluir)

export default router
