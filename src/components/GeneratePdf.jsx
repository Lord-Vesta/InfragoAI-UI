import React from 'react'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GeneratePDF = (data, pdfFileName = "Tender Analysis Summary.pdf") => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(16);
  doc.text("Extracted Data", 14, 20);

  // Prepare table columns
  const columns = [
    { header: "Sr. No.", dataKey: "sr_no" },
    { header: "Parameter", dataKey: "field_key" },
    { header: "Details from Tender Document", dataKey: "field_value" },
  
  ];

  // Prepare table rows
  const rows = data.map((item, i) => ({
    sr_no: i + 1,
    field_key: item.field_key,
    field_value: item.field_value,
  }));

  // Generate table
  autoTable(doc, {
    columns,
    body: rows,
    // startY: 10,
    // margin: { right: 10 },
    styles: { fontSize: 10, cellWidth: "wrap", lineWidth: 0.3, lineColor: 0 },
    headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: "bold" },
    columnStyles: {
       sr_no: { cellWidth: 10 },
      field_key: { cellWidth: 50 }, // narrower column
      field_value: { cellWidth: 130 }, // wider column
    },
    startY: 30,
    theme: "grid",
    tableWidth: "auto",
  });

  // Save PDF
  doc.save(pdfFileName);
 
}

export default GeneratePDF