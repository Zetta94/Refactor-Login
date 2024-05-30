import { Router } from 'express'
import SessionManager from '../../controllers/session.controller.js'

const router = Router()
const manager = new SessionManager()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    try {
        let result = await manager.register(first_name, last_name, email, age, password)
        res.redirect('/login')
    } catch (err) {
        res.status(500).send('Error al registrar usuario')
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        let result = await manager.login(email, password)
        let payload
        if (result.code === 200) {
            req.session.user = result.sessionUser
            payload = req.session
        }
        res.redirect('/products')
    } catch (err) {
        res.status(500).send('Error al iniciar sesión')
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión')
        res.redirect('/login')
    })
})

export default router