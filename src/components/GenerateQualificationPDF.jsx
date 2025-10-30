import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../public/logo.png"; 

export const GenerateQualificationPDF = (
  numericValues,
  litigationStatus,
  litigationDetails,
  projects
) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleString(); 

  const addHeader = () => {
    const pageWidth = doc.internal.pageSize.width;

    const logoWidth = 10;
    const logoHeight = 10;
    doc.addImage(logo, "PNG", 10, 6, logoWidth, logoHeight);

    doc.setFontSize(9);
    doc.text(`Downloaded on: ${currentDate}`, pageWidth - 10, 10, {
      align: "right",
    });

    doc.setFontSize(16);
    doc.text("Qualification Input Summary", pageWidth / 2, 22, {
      align: "center",
    });
  };

  const addFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      doc.setFontSize(9);
      doc.text(`Page ${i}`, pageWidth - 25, pageHeight - 5);
    }
  };

  addHeader();

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
      headStyles: { fillColor: [220, 220, 220], textColor: 0, fontStyle: "bold" },
      margin: { left: 10, right: 10 },
      didDrawPage: () => addHeader(),
    });
  }

  autoTable(doc, {
    startY: getNextY(),
    head: [["Litigation Status", "Litigation Details"]],
    body: [[litigationStatus || "-", litigationDetails || "-"]],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [220, 220, 220], textColor: 0, fontStyle: "bold" },
    margin: { left: 10, right: 10 },
    didDrawPage: () => addHeader(),
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
    head: [
      [
        {
          content: "Similar Projects", 
          colSpan: 5, 
          styles: {
            halign: "center",
            fillColor: [220, 220, 220],
            textColor: 0,
            fontStyle: "bold",
            fontSize: 12,
          },
        },
      ],
      ["#", "Project Name", "Scope", "Year", "Value"], 
    ],
    body: projectRows,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [245, 245, 245], textColor: 0, fontStyle: "bold" },
    margin: { left: 10, right: 10 },
    didDrawPage: () => addHeader(),
  });
}


  addFooter();

  doc.save("qualification_inputs.pdf");
};
