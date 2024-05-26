import React from "react";
import { RISK_FACTOR_CATEGORIES } from "@/constants";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";

const RiskAnalysis: React.FC<{ section: any; riskFactors: string[] }> = ({
  section,
  riskFactors,
}) => {
  const getRiskColorClass = (riskFactor: string) => {
    switch (riskFactor) {
      case "Low":
        return "text-[#52C41A]";
      case "Medium":
        return "text-[#F4CD00]"; //TODO change to medium Low
      case "Medium-High":
        return "text-[#F99107]";
      case "High":
        return "text-[#FF4D4F]";
      default:
        return "text-[#C9D0D8]";
    }
  };
  //bg high FFDFDF
  //bg medium-high #fff1c6
  //bg medium-low  #FEFFC1
  //bg low #dffbcc

  return (
    <>
      {section.content.map((content: any, contentIndex: number) => (
        <React.Fragment key={contentIndex}>
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="body_section">
                {RISK_FACTOR_CATEGORIES[contentIndex]}
              </div>
              <div className="h-8 justify-end items-center gap-2 flex">
                <div
                  className={`${getRiskColorClass(
                    riskFactors[contentIndex]
                  )} text-sm font-medium leading-tight`}
                >
                  {riskFactors[contentIndex]} risk
                </div>
                <div className="w-8 h-8 justify-center items-center flex">
                  <div
                    className={`w-8 h-8 bg-${riskFactors[
                      contentIndex
                    ].toLowerCase()}-100 rounded-full`}
                  ></div>
                  {/**TODO bg circles for numbers */}
                  <div
                    className={`text-center text-${riskFactors[
                      contentIndex
                    ].toLowerCase()}-600 text-base font-bold font-['Hack']`}
                  >
                    {contentIndex + 1}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-between items-end inline-flex">
                <div className="grow shrink basis-0 body_subsection">
                  {content.title}
                </div>
              </div>
              <div className="self-stretch">
                {parseTextWithLinks(content.content)}
              </div>
            </div>
          </div>
          {contentIndex < section.content.length - 1 && (
            <div className="border-b border-slate-300 my-12"></div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default RiskAnalysis;
