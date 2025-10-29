
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatKey = (key = "") => {
  if (!key) return "";

  let formatted = key.replace(/[_-]+/g, " ").trim();
  const words = formatted.split(" ");
  const acronyms = ["EMD", "PBG", "DLP", "JV", "BOQ", "NIT", "WC"];

  formatted = words
    .map((word) => {
      const upper = word.toUpperCase();
      if (acronyms.includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  if (/(_cr|cr$|value|amount)/i.test(key)) {
    formatted = formatted.replace(/\s*\(₹ Cr\)/gi, "");
    formatted += " (₹ Cr)";
  }

  if (/percent|percentage|pct|%/i.test(key)) {
    formatted = formatted.replace(/\s*\(%\)/gi, "");
    formatted += " (%)";
  }

  return formatted;
};

const GeneratePDF = (data, pdfFileName = "Tender Analysis Summary.pdf") => {
  const doc = new jsPDF("p", "mm", "a4");
  doc.setFontSize(16);
  doc.text("Extracted Tender Data", 14, 20);

  const rows = [];
  let srNo = 1;

  Object.entries(data).forEach(([section, fields]) => {
   
    if (typeof fields === "object" && Object.keys(fields).length > 1) {
      const bullets = Object.entries(fields)
        .map(([key, val]) => `• ${formatKey(key)}: ${val?.value || "—"}`)
        .join("\n\n");

      rows.push({
        sr_no: srNo++,
        field_key: formatKey(section),
        field_value: bullets,
      });
    } else {
     
      Object.entries(fields).forEach(([key, val]) => {
        rows.push({
          sr_no: srNo++,
          field_key: formatKey(key),
          field_value: val?.value || "—",
        });
      });
    }
  });

  const columns = [
    { header: "Sr. No.", dataKey: "sr_no" },
    { header: "Parameter", dataKey: "field_key" },
    { header: "Details from Tender Document", dataKey: "field_value" },
  ];

  autoTable(doc, {
    columns,
    body: rows,
    startY: 30,
    styles: {
      fontSize: 9,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: 20,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      sr_no: { cellWidth: 12, halign: "center" },
      field_key: { cellWidth: 60 },
      field_value: { cellWidth: 110 },
    },
    theme: "grid",
    tableWidth: "auto",
  });

  doc.save(pdfFileName);
};

export default GeneratePDF;
