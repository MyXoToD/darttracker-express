class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }
    return this.userRepository.create(userData)
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email)
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials')
    }
    return user
  }
  async logout(user) {
    // Implement logout logic, e.g., invalidate session or token
    return true
  }
}

export default new AuthService()
