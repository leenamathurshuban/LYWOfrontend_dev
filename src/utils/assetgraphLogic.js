// utils/transformChartData.js

const percentRanges = [
  { key: "percent_0_10", label: "0–10%" },
  { key: "percent_11_20", label: "11–20%" },
  { key: "percent_21_30", label: "21–30%" },
  { key: "percent_31_40", label: "31–40%" },
  { key: "percent_41_50", label: "41–50%" },
  { key: "percent_51_60", label: "51–60%" },
  { key: "percent_61_70", label: "61–70%" },
  { key: "percent_71_80", label: "71–80%" },
  { key: "percent_81_90", label: "81–90%" },
  { key: "percent_91_100", label: "91–100%" },
];

export function transformOverallAndSectionData(apiData) {
  return apiData.map((item) => {
    const overallData = percentRanges.map(({ key, label }) => ({
      range: label,
      applicants: item[key] || 0,
    }));

    // Now transform section-wise into grouped format
    const sectionWiseData = percentRanges.map(({ key, label }) => {
      const row = { range: label };

      item.section.forEach((sec) => {
        row[sec.section_title] = sec[key] || 0;
      });

      return row;
    });

    return {
      title: item.asset_title,
      overallData,
      sectionWiseData,
      sectionNames: item.section.map((s) => s.section_title),
    };
  });
}
