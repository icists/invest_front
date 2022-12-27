export type TeamUID = string;
export type CompanyUID = string;

export type UserData = {
  name: string;
  team: number;
  mail: string | null;
};

export type Status = {
  currentRound: number;
};

export type RoundData = {
  valuation: Record<CompanyUID, number>;
  investAmount: Record<CompanyUID, Record<TeamUID, number>>;
  investResult: Record<CompanyUID, Record<TeamUID, number>>;
};

export type Company = {
  name: string;
  engName: string;

  logo: string;
  description: string;
};
