import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const GenerateQualificationPDF = (
  numericValues,
  litigationStatus,
  litigationDetails,
  projects
) => {
  const doc = new jsPDF();

  // ✅ Title
  doc.setFontSize(18);
  doc.text("Qualification Input Summary", 14, 20);

  // ✅ Section 1: Numeric values
  const numericRows = Object.entries(numericValues).map(([key, value]) => ({
    key: key.replace(/([A-Z])/g, " $1").toUpperCase(),
    value: value || "-",
  }));

  autoTable(doc, {
    startY: 30,
    head: [["Field", "Value"]],
    body: numericRows.map((row) => [row.key, row.value]),
    theme: "grid",
    styles: { fontSize: 10, lineColor: 0, },
    headStyles: { fillColor: [255, 255, 255],textColor: 0, valign: "middle",  lineColor: [0, 0, 0], 
      lineWidth: 0.2, 
    }
  });

  // ✅ Section 2: Litigation
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Litigation Status", "Litigation Details"]],
    body: [[litigationStatus, litigationDetails || "-"]],
    theme: "grid",
    styles: { fontSize: 10, lineColor: 0, },
    headStyles: { fillColor: [255, 255, 255] }, 
  });

  // ✅ Section 3: Projects
  if (projects.length > 0) {
    const projectRows = projects.map((p, i) => [
      i + 1,
      p.name || "-",
      p.scope || "-",
      p.year || "-",
      p.value || "-",
    ]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["#", "Project Name", "Scope", "Year", "Value"]],
      body: projectRows,
      theme: "grid",
      styles: { fontSize: 10, lineColor: 0, },
      headStyles: { fillColor: [255, 255, 255] }, 
    });
  }

  // ✅ Save the PDF
  doc.save("qualification_inputs.pdf");
};
