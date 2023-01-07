export type UserUID = string;
export type TeamUID = string;
export type CompanyUID =
  | "AET"
  | "INB"
  | "NUT"
  | "NUV"
  | "QTC"
  | "RFY"
  | "SHZ"
  | "SWT";

export type UserData = {
  name: string;
  teamUID: string;
  mail: string | null;
  uniqueNumber: number;
};

export type Team = {
  members: Record<UserUID, boolean>;
  track?: Record<number, CompanyUID>;
  matchTeam?: CompanyUID;
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

export type EventStatus = Record<number, boolean>;
