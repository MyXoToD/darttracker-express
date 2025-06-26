class AuthRepository {
  constructor(db) {
    this.db = db
  }

  async findUserByEmail(email) {
    return this.db.users.findOne({ email })
  }

  async createUser(userData) {
    return this.db.users.insert(userData)
  }

  async updateUser(userId, updateData) {
    return this.db.users.update({ _id: userId }, { $set: updateData })
  }

  async deleteUser(userId) {
    return this.db.users.remove({ _id: userId })
  }
}
export default new AuthRepository()
