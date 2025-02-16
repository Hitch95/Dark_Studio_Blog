export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  password: string;
  image: string;
  isAdmin: boolean;
}

export interface Post {
  //   id: string;
  user_id: string;
  title: string;
  description: string;
  content: string;
  username: string;
  image: string;
}

export type rolesPossible = { name: 'user' | 'admin' };

export interface roles {
  id: string;
  name: rolesPossible['name'];
}
