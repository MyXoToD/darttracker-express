import { RowDataPacket } from 'mysql2';
import { UserDTO } from '../users/models/userDTO.interface';
import { GameDTO } from './models/gameDTO.interface';
import { GameEntity } from './models/gameEntity.interface';

export interface GameWithRelationsRow extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  played_at: Date;
  winner_id?: number;
  win_type?: string;
  created_at: Date;
  updated_at: Date;
  winner_username?: string;
  winner_email?: string;
  winner_created_at?: Date;
  winner_updated_at?: Date;
  player_id?: number;
  player_username?: string;
  player_email?: string;
  player_created_at?: Date;
  player_updated_at?: Date;
}

export interface GameWithRelations extends GameEntity {
  winner: UserDTO | null;
  players: UserDTO[];
}

export class GameMapper {
  static toGameDTO(gameWithRelations: GameWithRelations): GameDTO {
    return {
      id: gameWithRelations.id,
      title: gameWithRelations.title,
      description: gameWithRelations.description,
      played_at: gameWithRelations.played_at,
      win_type: gameWithRelations.win_type ?? null,
      created_at: gameWithRelations.created_at,
      updated_at: gameWithRelations.updated_at,
      winner: gameWithRelations.winner,
      players: gameWithRelations.players,
    };
  }

  static groupGameRows(rows: GameWithRelationsRow[]): GameWithRelations[] {
    const gamesMap = new Map<number, GameWithRelations>();

    for (const row of rows) {
      if (!gamesMap.has(row.id)) {
        // Erstelle das Game-Objekt mit Winner
        const winner: UserDTO | null = row.winner_id
          ? {
              id: row.winner_id,
              username: row.winner_username!,
              email: row.winner_email!,
              created_at: row.winner_created_at!,
              updated_at: row.winner_updated_at!,
            }
          : null;

        gamesMap.set(row.id, {
          id: row.id,
          title: row.title,
          description: row.description,
          played_at: row.played_at,
          winner_id: row.winner_id,
          win_type: row.win_type as any,
          created_at: row.created_at,
          updated_at: row.updated_at,
          winner,
          players: [],
        } as GameWithRelations);
      }

      // Füge Player hinzu, wenn vorhanden
      const game = gamesMap.get(row.id)!;
      if (row.player_id && !game.players.some((p) => p.id === row.player_id)) {
        game.players.push({
          id: row.player_id,
          username: row.player_username!,
          email: row.player_email!,
          created_at: row.player_created_at!,
          updated_at: row.player_updated_at!,
        });
      }
    }

    return Array.from(gamesMap.values());
  }
}
