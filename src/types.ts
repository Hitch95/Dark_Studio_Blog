export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailVerified: boolean;
  password: string;
  image: string;
  isAdmin: boolean;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  content: string;
  username: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type rolesPossible = { name: 'user' | 'moderator' | 'admin' };

export interface roles {
  id: string;
  name: rolesPossible['name'];
}
