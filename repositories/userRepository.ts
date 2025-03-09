import { createClient } from '../src/utils/supabase/client';
import { User } from '../src/types';

const supabase = createClient();

interface UserRepository {
  findUserById: (id: string) => Promise<any>;
  findUserByEmail: (email: string) => Promise<any>;
  findAllUsers: () => Promise<any>;
  createUser: (user: User) => Promise<any>;
  updateUser: (user: User) => Promise<any>;
  verifyPassword: (email: string, password: string) => Promise<any>;
}

export const userRepository: UserRepository = {
  createUser: async (user: User) => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username: user.username,
          email: user.email,
          email_verified: false,
          password: user.password,
          first_name: user.firstname,
          last_name: user.lastname,
          image_src: user.image,
          created_at: new Date(),
          updated_at: new Date(),
          is_admin: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error : ', error + ' while creating new user');
    }
    return data as User;
  },

  findUserById: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data[0];
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw error;
    return data[0];
  },

  findAllUsers: async () => {
    const { data, error } = await supabase.from('users').select('*');

    if (error) throw error;
    return data;
  },

  updateUser: async (user: User): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .update({
        username: user.username,
        email: user.email,
        email_verified: user.emailVerified,
        password: user.password,
        first_name: user.firstname,
        last_name: user.lastname,
        image_src: user.image,
        updated_at: new Date(),
        is_admin: user.isAdmin,
      })
      .eq('email', user.email)
      .select()
      .single();
    if (error) {
      console.error('Error : ', error + ' while creating new user');
    }
    return data as User;
  },

  verifyPassword: async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('users')
      .select('password')
      .eq('email', email)
      .single();
    if (error || !data) {
      console.error('Error : ', error + ' while verifying user');
      return false;
    }
    return data.password === password;
  },
};
