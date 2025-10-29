import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const GenerateQualificationPDF = (
  numericValues,
  litigationStatus,
  litigationDetails,
  projects
) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString();

  doc.setFontSize(16);
  doc.text("Qualification Input Summary", 14, 15);

  doc.setFontSize(10);
  doc.text(`Generated on: ${currentDate}`, 14, 22);

  const getNextY = () => (doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30);

   const formatLabel = (key) => {
    return key
      .replace(/_/g, " ") 
      .replace(/([a-z])([A-Z])/g, "$1 $2") 
      .replace(/\b(\d+)\s*years?\b/gi, "($1 Years)") 
      .replace(/\b(bg)\b/gi, "BG") 
      .replace(/\b(\w)/g, (c) => c.toUpperCase()) 
      .replace(/\(\(/g, "(")
      .replace(/\)\)/g, ")") 
      .replace(/\s+/g, " ") 
      .trim();
  };

  const numericRows = Object.entries(numericValues || {}).map(([key, value]) => [
    formatLabel(key),
    value || "-",
  ]);

  if (numericRows.length > 0) {
    autoTable(doc, {
      startY: getNextY(),
      head: [["Field", "Value"]],
      body: numericRows,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: 0,
        fontStyle: "bold",
      },
      margin: { left: 10, right: 10 },
    });
  }

  autoTable(doc, {
    startY: getNextY(),
    head: [["Litigation Status", "Litigation Details"]],
    body: [[litigationStatus || "-", litigationDetails || "-"]],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: 0,
      fontStyle: "bold",
    },
    margin: { left: 10, right: 10 },
  });

  if (projects?.length > 0) {
    const projectRows = projects.map((p, i) => [
      i + 1,
      p.name || "-",
      p.scope || "-",
      p.year || "-",
      p.value || "-",
    ]);

    autoTable(doc, {
      startY: getNextY(),
      head: [["#", "Project Name", "Scope", "Year", "Value"]],
      body: projectRows,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: 0,
        fontStyle: "bold",
      },
      margin: { left: 10, right: 10 },
      didDrawPage: () => {
        const pageNumber = doc.internal.getNumberOfPages();
        doc.setFontSize(9);
        doc.text(
          `Page ${pageNumber}`,
          doc.internal.pageSize.width - 25,
          doc.internal.pageSize.height - 5
        );
      },
    });
  }

  doc.save("qualification_inputs.pdf");
};
