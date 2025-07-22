import Container from "@/components/Container";
import { getAllCaseStudies } from "@/sanity/queries";
import React from "react";
import CaseStudyListWithFilter from "@/components/CaseStudyListWithFilter";
import HeroSection from "@/components/HeroSection";

const CaseStudyPage = async () => {
  const caseStudies = await getAllCaseStudies(100);

  return (
    <div>
      <HeroSection
        title="Case Studies"
        subtitle="Explore our real-world success stories and see how we deliver value to our clients."
        bannerAlt="Case Studies Banner"
        showImage={false}
      />
      <Container>
        <div className="mt-10" />
        <div className="mb-16">
          <CaseStudyListWithFilter caseStudies={caseStudies} linkBase="/case-study" />
        </div>
      </Container>
    </div>
  );
};

export default CaseStudyPage; 