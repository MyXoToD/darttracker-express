import { RowDataPacket } from 'mysql2';

export interface UserEntity extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
  created_at: Date;
  updated_at: Date;
}
