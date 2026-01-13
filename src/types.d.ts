// export type User = {
//   id: number;
//   username: string;
//   password: string;
//   password_date: string;
//   eliminado: boolean;
//   cuenta_habilitada: boolean;
//   failed_access_attempt_count: number;
// };

export type User = {
  name: string;
  username: string;
  roles: Role[];
};

export type Role = {
  id?: string;
  name: string;
  deleted: boolean;
};
