import { UserDTO } from '../users/models/userDTO.interface';
import { GameDTO } from './models/gameDTO.interface';

export class GameMapper {
  static toGameDTO(
    entity: any,
    players: UserDTO[],
    winner: UserDTO | null,
  ): GameDTO {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      played_at: entity.played_at,
      win_type: entity.win_type,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      winner,
      players,
    };
  }
}
