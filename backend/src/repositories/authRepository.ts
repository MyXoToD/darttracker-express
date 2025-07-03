import db from '../config/database';

export class AuthRepository {
  db;

  constructor(db: any) {
    this.db = db;
  }

  async findByEmail(email: string) {
    return this.db.users.findOne({ email });
  }

  async create(userData: any) {
    return this.db.users.insert(userData);
  }

  async update(userId: number, updateData: any) {
    return this.db.users.update({ _id: userId }, { $set: updateData });
  }

  async delete(userId: number) {
    return this.db.users.remove({ _id: userId });
  }
}
export default new AuthRepository(db);
