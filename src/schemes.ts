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
  members: Map<UserUID, boolean>;
  track?: Map<number, CompanyUID>;
  matchTeam?: CompanyUID;
};

export type ValidRoundNumber = 0 | 1 | 2 | 3;
export type RoundNumber = ValidRoundNumber | 4;

export type Status = {
  currentPitching: CompanyUID | "";
  currentRound: RoundNumber;
  investable: boolean;
};

export type Company = {
  name: string;
  engName: string;
  logo: string;
  description: string;
  video: string;
};

export type EventStatus = Map<number, boolean>;
