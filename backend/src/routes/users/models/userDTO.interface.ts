export interface UserDTO {
  id: number;
  username: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
  created_at: Date;
  updated_at: Date;
}
