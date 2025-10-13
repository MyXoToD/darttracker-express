import { UserDTO } from '../../users/models/userDTO.interface';
import { WinType } from '../enums/winType.enum';

export interface GameDTO {
  id: number;
  title: string;
  description: string;
  played_at: Date;
  win_type: WinType | null;
  created_at: Date;
  updated_at: Date;
  winner: Partial<UserDTO> | null;
  players: Partial<UserDTO>[];
}
