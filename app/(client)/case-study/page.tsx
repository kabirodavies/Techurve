import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllCaseStudies } from "@/sanity/queries";
import React from "react";
import CaseStudyListWithFilter from "@/components/CaseStudyListWithFilter";

const CaseStudyPage = async () => {
  const caseStudies = await getAllCaseStudies(100);

  // Extract unique topics from all case studies
  const topicMap = new Map();
  caseStudies?.forEach((cs: any) => {
    if (cs?.topic) topicMap.set(cs.topic, cs.topic);
  });
  const topics = Array.from(topicMap.values());

  // Reuse BlogListWithFilter but adapt props for case studies
  return (
    <div>
      <section className="relative bg-gradient-to-br from-black to-black text-white py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">Case Studies</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 z-10 relative">
          Explore our real-world success stories and see how we deliver value to our clients.
        </p>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/blog-bg.jpg')" }} />
      </section>
      <Container>
        <div className="mt-10" />
        <div className="mb-16">
          <CaseStudyListWithFilter caseStudies={caseStudies} topics={topics} linkBase="/case-study" />
        </div>
      </Container>
    </div>
  );
};

export default CaseStudyPage; 