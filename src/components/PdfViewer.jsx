import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../assets/sample_pdf1.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import "../../node_modules/react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../../node_modules/react-pdf/dist/esm/Page/TextLayer.css";

const PdfViewer = ({ fileUrl, initialPage = 1, viewFullPdf = false }) => {
  const [numPages, setNumPages] = useState(null);
  console.log("fileUrl", fileUrl);
  console.log("initialPage", initialPage);
  const handleDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 2,
      }}
    >
      {" "}
      {/* PDF Content */}
      <Document
        file={pdf}
        onLoadSuccess={handleDocumentLoad}
        onLoadError={(err) => console.error("PDF Load Error:", err)}
      >
        {viewFullPdf ? (
          Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={800}
              renderMode="canvas"
            />
          ))
        ) : (
          <Page pageNumber={initialPage} width={800} />
        )}
      </Document>
    </Box>
  );
};

export default PdfViewer;
