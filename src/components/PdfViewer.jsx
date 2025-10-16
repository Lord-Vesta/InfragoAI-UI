import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import "../../node_modules/react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../../node_modules/react-pdf/dist/esm/Page/TextLayer.css";

const PdfViewer = ({ fileUrl, initialPage = 1 }) => {
  const [numPages, setNumPages] = useState(null);
  const pageRefs = useRef([]);

  const handleDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (
      numPages &&
      initialPage >= 1 &&
      initialPage <= numPages &&
      pageRefs.current[initialPage - 1]
    ) {
      pageRefs.current[initialPage - 1].scrollIntoView({
        block: "start",
      });
    }
  }, [numPages, initialPage]);

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
        file={fileUrl}
        onLoadSuccess={handleDocumentLoad}
        onLoadError={(err) => console.error("PDF Load Error:", err)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div
            key={index}
            ref={(el) => (pageRefs.current[index] = el)}
            style={{ marginBottom: "16px" }}
          >
            <Page pageNumber={index + 1} width={800} renderMode="canvas" />
          </div>
        ))}
      </Document>
    </Box>
  );
};

export default PdfViewer;
