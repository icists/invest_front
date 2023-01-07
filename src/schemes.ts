export type UserUID = string;
export type TeamUID = string;
export type CompanyUID = string;

export type UserData = {
  name: string;
  teamUID: string;
  mail: string | null;
};

export type Team = {
  members: Record<UserUID, boolean>;
};

export type Status = {
  currentRound: number;
  investable: boolean;
};

export type Company = {
  name: string;
  engName: string;
  logo: string;
  description: string;
  video: string;
};
