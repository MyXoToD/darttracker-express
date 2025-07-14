import { UserDTO } from '../../users/models/userDTO.interface';
import { WinType } from '../enums/winType.enum';

export interface GamesWithPlayers {
  id: number;
  title: string;
  description: string;
  played_at: Date;
  win_type: WinType;
  created_at: Date;
  updated_at: Date;
  winner: UserDTO | null;
  players: UserDTO[];
}
