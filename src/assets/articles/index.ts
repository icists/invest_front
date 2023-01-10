import { CompanyUID } from "@/schemes";

import NUV from "./NUV.json";
import NUT from "./NUT.json";
import RFY from "./RFY.json";
import SHZ from "./SHZ.json";
import SWT from "./SWT.json";
import AET from "./AET.json";
import INB from "./INB.json";
import QTC from "./QTC.json";

type Article = {
  title: string;
  body: string;
};

const data: Record<CompanyUID, Article[]> = {
  NUV,
  NUT,
  RFY,
  SHZ,
  SWT,
  AET,
  INB,
  QTC,
};

export default data;
