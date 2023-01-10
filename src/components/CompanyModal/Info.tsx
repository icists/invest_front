import { useCompanies } from "@/context";
import { CompanyUID } from "@/schemes";

import { ContentParagraph, ContentTitle, Video } from "./Contents";
import articlesData from "@/assets/articles";

function Info({ companyUID }: { companyUID: CompanyUID }) {
  const companies = useCompanies();
  const company = companies.get(companyUID)!;

  return (
    <>
      <ContentTitle as="h2">소개 영상</ContentTitle>
      <Video src={company.video} key={company.video} allowFullScreen />
      {articlesData[companyUID].map((article, i) => (
        <div key={i}>
          <ContentTitle as="h2">
            {i + 1}. {article.title}
          </ContentTitle>
          {article.body.split("\n").map((p, i) => (
            <ContentParagraph key={i}>{p}</ContentParagraph>
          ))}
        </div>
      ))}
    </>
  );
}

export default Info;
