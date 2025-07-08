import { RowDataPacket } from 'mysql2';
import db from '../config/database';

// TODO: Is this needed?
export interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

export abstract class BaseRepository<T extends RowDataPacket> {
  protected abstract tableName: string;

  async findAll(): Promise<T[]> {
    const [rows] = await db.query<T[]>(`SELECT * FROM ${this.tableName}`);
    return rows as T[];
  }

  async findById(id: number): Promise<T | null> {
    const [rows] = await db.query<T[]>(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id],
    );
    return rows[0] ?? null;
  }

  async create(data: Partial<T>): Promise<T> {
    const [result] = await db.query(`INSERT INTO ${this.tableName} SET ?`, [
      data,
    ]);
    const insertId = (result as any).insertId;
    return this.findById(insertId) as Promise<T>;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id]);
    return this.findById(id) as Promise<T>;
  }

  async delete(id: number): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}
