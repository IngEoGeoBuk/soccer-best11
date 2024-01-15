import { Player, Post } from '@prisma/client';

export interface CreatePost {
  title: string;
  description: string;
  playerIds: number[];
}

export interface ChangedPlayer {
  postPlayerId: number;
  changedId: number;
}

export interface UpdatePost {
  title: string;
  description: string;
  changedPlayers: ChangedPlayer[];
}

export interface ViewPostList {
  id: number;
  email: string;
  image: string;
  title: string;
  createdAt: string;
  likes: number;
}

export interface PostLike extends Post {
  likes: number;
}

export interface ViewPlayer extends Player {
  postPlayerId: number;
}

export interface ViewPost extends Post {
  email: string;
  players: ViewPlayer[];
}
