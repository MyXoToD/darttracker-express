class AuthController {
  constructor(authService) {
    this.authService = authService
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await this.authService.login(username, password)
      res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  async register(req, res) {
    try {
      const { username, password } = req.body
      const user = await this.authService.register(username, password)
      res.status(201).json({ message: 'Registration successful', user })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  async logout(req, res) {
    try {
      await this.authService.logout(req.user)
      res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default new AuthController()
