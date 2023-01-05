export type UserUID = string;
export type TeamUID = string;
export type CompanyUID = string;

export type UserData = {
  name: string;
  teamUID: string;
  mail: string | null;
};

export type Team = {
  account: number;
  members: Record<UserUID, boolean>;
};

export type Status = {
  currentRound: number;
  investable: boolean;
  roundTitle: string;
};

export type RoundData = {
  valuation: Record<CompanyUID, number>;
  investAmount: Record<TeamUID, Record<CompanyUID, number>>;
  investResult: Record<TeamUID, Record<CompanyUID, number>>;
};

export type Company = {
  name: string;
  engName: string;
  logo: string;
  description: string;
  video: string;
};
