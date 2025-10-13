import React from 'react'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GeneratePDF = (data, pdfFileName = "extracted_data.pdf") => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(16);
  doc.text("Extracted Data", 14, 20);

  // Prepare table columns
  const columns = [
    { header: "Field Key", dataKey: "field_key" },
    { header: "Field Value", dataKey: "field_value" },
    { header: "Confidence", dataKey: "confidence_score" },
    { header: "Page No", dataKey: "source_page_number" },
  ];

  // Prepare table rows
  const rows = data.map((item) => ({
    field_key: item.field_key,
    field_value: item.field_value,
    confidence_score: item.confidence_score,
    source_page_number: item.source_page_number ?? "-",
  }));

  // Generate table
  autoTable(doc, {
    columns,
    body: rows,
    startY: 10,
    margin: { right: 30 },
    styles: { fontSize: 10, cellWidth: "wrap" },
    headStyles: { fillColor: [41, 128, 185] },
    columnStyles: {
      field_value: { cellWidth: 60 },
    },
  });

  // Save PDF
  doc.save(pdfFileName);
 
}

export default GeneratePDF