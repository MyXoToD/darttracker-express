import db from '../../config/database';
import { User } from './user.model';

export class UserService {
  constructor() {
    // TODO: Add user repository
  }

  async getUsers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getUser(id: number) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const users = result as User[];
          resolve(users[0]);
        }
      });
    });
  }
}

export default new UserService();
