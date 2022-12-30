import { Company } from "@/schemes";

function Info({ company }: { company: Company }) {
  return (
    <>
      <ContentTitle as="h2">기업 정보</ContentTitle>
      <ContentParagraph>{company.description}</ContentParagraph>
      <ContentTitle as="h2">소개 영상</ContentTitle>
      <Video src={company.video} key={company.video} allowFullScreen />
    </>
  );
}

export default Info;
