export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  created_at: Date;
}

export interface Comment {
  id: string;
  username: string;
  comment: string;
  created_at: Date;
}

export interface Post {
  id: string;
  user_id: string;
  username: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: Date;
  likes: string[];
  comments: Comment[];
}