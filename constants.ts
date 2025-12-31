
import { User, Tweet } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    username: 'skywalker',
    displayName: 'Luke Skywalker',
    avatar: 'https://picsum.photos/seed/luke/200',
    bio: 'Jedi Knight. Master of the Force. Loves binary sunsets.',
    followers: ['user-2', 'user-3'],
    following: ['user-2'],
    createdAt: Date.now() - 100000000
  },
  {
    id: 'user-2',
    username: 'leia_organa',
    displayName: 'Leia Organa',
    avatar: 'https://picsum.photos/seed/leia/200',
    bio: 'Princess of Alderaan. Leader of the Resistance.',
    followers: ['user-1'],
    following: ['user-1', 'user-3'],
    createdAt: Date.now() - 90000000
  },
  {
    id: 'user-3',
    username: 'solo_han',
    displayName: 'Han Solo',
    avatar: 'https://picsum.photos/seed/han/200',
    bio: 'Scoundrel. Pilot of the Millennium Falcon. I know.',
    followers: ['user-2'],
    following: ['user-2'],
    createdAt: Date.now() - 80000000
  }
];

export const INITIAL_TWEETS: Tweet[] = [
  {
    id: 'tweet-1',
    userId: 'user-1',
    content: 'Just finished my training on Dagobah. Master Yoda is a bit cryptic but wise.',
    likes: ['user-2', 'user-3'],
    comments: [],
    createdAt: Date.now() - 5000000
  },
  {
    id: 'tweet-2',
    userId: 'user-2',
    content: 'The Resistance will never back down. Hope is like the sun.',
    likes: ['user-1'],
    comments: [
      {
        id: 'comm-1',
        userId: 'user-3',
        tweetId: 'tweet-2',
        content: 'I like those odds.',
        createdAt: Date.now() - 4000000
      }
    ],
    createdAt: Date.now() - 6000000
  }
];
