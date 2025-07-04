import { RowDataPacket } from 'mysql2';

export interface UserEntity extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: Date;
}
