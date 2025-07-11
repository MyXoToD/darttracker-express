import { RowDataPacket } from 'mysql2';

export interface SessionEntity extends RowDataPacket {
  id: number;
  user_id: number;
  refresh_token: string;
  ip_address: string;
  user_agent: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}
