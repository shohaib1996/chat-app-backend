export interface IGroup {
  id: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface ICreateGroupPayload {
  name: string;
  avatarUrl?: string;
  memberIds: string[];
}

export interface IUpdateGroupPayload {
  name?: string;
  avatarUrl?: string;
}
