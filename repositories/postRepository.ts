import supabaseClient from '../src/utils/supabase/client';
import { Post } from '../src/types';

interface PostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | null>;
  getPostsByUserId(userId: string): Promise<Post[]>;
  createPost(post: Post): Promise<Post>;
  updatePost(id: string, post: Post): Promise<Post>;
  deletePost(id: string): Promise<void>;
}

const postRepository: PostRepository = {
  async getAllPosts() {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getPostById(id: string) {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data[0];
  },

  async getPostsByUserId(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const { data, error } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createPost(post: Post) {
    const { data, error } = await supabaseClient
      .from('posts')
      .insert(post)
      .single();
    if (error) throw error;
    return data[0];
  },

  async updatePost(id: string, post: Post) {
    const { data, error } = await supabaseClient
      .from('posts')
      .update(post)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data[0];
  },

  async deletePost(id: string) {
    const { error } = await supabaseClient.from('posts').delete().eq('id', id);
    if (error) throw error;
  },
};

export default postRepository;
