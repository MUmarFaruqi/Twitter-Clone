
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: string[]; // User IDs
  following: string[]; // User IDs
  createdAt: number;
}

export interface Comment {
  id: string;
  userId: string;
  tweetId: string;
  content: string;
  createdAt: number;
}

export interface Tweet {
  id: string;
  userId: string;
  content: string;
  likes: string[]; // User IDs
  comments: Comment[];
  createdAt: number;
  editedAt?: number;
}

export interface AppState {
  currentUser: User;
  users: User[];
  tweets: Tweet[];
}
