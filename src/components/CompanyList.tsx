import styled from "@emotion/styled";
import { useCompanies, useRoundData } from "../firebase";

import { colors } from "../styles";

const List = styled.ul({
  padding: 0,
  margin: 0,
  listStyleType: "none",
});

const Item = styled.li({
  display: "flex",
  alignItems: "center",
});

const LogoContainer = styled.div({
  backgroundColor: colors.lightGray,

  height: 56,
  width: 56,
  borderRadius: "100%",

  flex: "0 0 auto",
  padding: "0 0.3rem",

  margin: "0 0.7rem 0 0",
});

const Logo = styled.img({
  height: "100%",
  width: "100%",
  objectFit: "fill",
});

const Container = styled.div({
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gridTemplateColumns: "2fr 1fr",
  rowGap: "0.2rem",

  width: "100%",
  fontSize: "1.2rem",
});

const CompanyTitle = styled.div({
  fontWeight: 600,
});

const Valuation = styled.div({
  "&::before": {
    content: "'₩'",
  },
  justifySelf: "end",
});

const InvestAmount = styled.div({
  color: colors.darkGray,
  fontSize: "1rem",

  alignSelf: "end",
});

const Change = styled.div({
  backgroundColor: colors.key,
  color: "white",
  borderRadius: 5,

  padding: "0.1rem 0.3rem",
  fontSize: "0.9rem",

  justifySelf: "end",
  alignSelf: "end",
});

type CompanyListProps = {
  className?: string;
  round: number;
  teamID: number;
};

function CompanyList({ className, round, teamID }: CompanyListProps) {
  const [companies] = useCompanies();
  const [roundData] = useRoundData(round);

  if (!companies || !roundData) return null;

  const companiesData = Object.entries(companies).map(
    ([companyID, { name, logo }]) => ({
      name,
      logo,
      valuation: roundData.valuation[companyID],
      investAmount: roundData.investAmount[companyID][teamID],
      change: 31.4,
    })
  );

  return (
    <List className={className}>
      {companiesData.map((data) => (
        <Item key={data.name}>
          <LogoContainer>
            <Logo src={data.logo} />
          </LogoContainer>
          <Container>
            <CompanyTitle>{data.name}</CompanyTitle>
            <Valuation>{data.valuation.toLocaleString("en")}</Valuation>
            <InvestAmount>
              {data.investAmount
                ? `투자액 ${data.investAmount.toLocaleString("en")}원`
                : "투자하지 않음"}
            </InvestAmount>
            {data.change !== null && (
              <Change>
                {data.change >= 0 ? "+" : "-"}
                {data.change.toPrecision(3)}%
              </Change>
            )}
          </Container>
        </Item>
      ))}
      <Item></Item>
    </List>
  );
}

export default CompanyList;
