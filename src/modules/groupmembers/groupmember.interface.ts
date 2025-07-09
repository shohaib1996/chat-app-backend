export interface IGroupMember {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: Date;
  isAdmin: boolean;
}

export interface ICreateGroupMemberPayload {
  userId: string;
  groupId: string;
  isAdmin?: boolean;
}

export interface IUpdateGroupMemberPayload {
  isAdmin?: boolean;
}
