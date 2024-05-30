import MODEL_USER from '../models/user.model.js'

export default class SessionManager {
    async register(first_name, last_name, email, age, password) {
        const exists = await MODEL_USER.findOne({ email })
        if (exists) {
            return { code: 400, status: 'Usuario ya existe' }
        }

        const isAdmin = email.startsWith('admin');

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
            role: isAdmin ? 'admin' : 'usuario'
        }
    
        const result = await MODEL_USER.create(user)
        return { code: 200, status: `Usuario creado con id: ${result.id}` }
    }

    async login(email, password) {
        const user = await MODEL_USER.findOne({ email, password })
        if (!user) return { code: 401, status: "Credenciales incorrectas" }
        let sessionUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }
        return {code: 200, message: `Bienvenido ${sessionUser.name}`, sessionUser}
    }
}