import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface Props {
  fileUrl: string;
}

const NouraniaPdfViewer = ({ fileUrl }: Props) => {
  const [numPages, setNumPages] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const width = Math.floor(entries[0].contentRect.width);
      if (width > 0) setContainerWidth(width);
    });
    observer.observe(node);
    const w = Math.floor(node.offsetWidth);
    if (w > 0) setContainerWidth(w);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {containerWidth > 0 && (
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="py-8 text-center text-sm text-muted-foreground">
              Chargement du cours...
            </div>
          }
          error={
            <div className="py-8 text-center text-sm text-destructive">
              Impossible de charger le PDF
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={containerWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className="block w-full"
            />
          ))}
        </Document>
      )}
    </div>
  );
};

export default NouraniaPdfViewer;
