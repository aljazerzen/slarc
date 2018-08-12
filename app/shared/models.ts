export class Group {
  userIds: string[];
  shares: Share[];

  // needs to be loaded
  users?: UserModel[];
}

export class Share {
  userId: string;
  amount: number;
  date: Date;
  notes: string;

  user: UserModel;
}

export class UserModel {
  currentGroup: string;
  groupIds: string[];
  oweIds: string[];

  groups?: Group[];
  owes?: Owe[];
}

export class Owe {
  fromId: string;
  toId: string;
  date: Date;
  notes: string;

  from: UserModel;
  to: UserModel;
}