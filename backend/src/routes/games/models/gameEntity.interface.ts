import { RowDataPacket } from 'mysql2';
import { WinType } from '../enums/winType.enum';

export interface GameEntity extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  played_at: Date;
  winner_id?: number;
  win_type?: WinType;
  created_at: Date;
  updated_at: Date;
}
