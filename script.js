import PDFMerger from 'pdf-merger-js';

var merger = new PDFMerger();

export const mergerpdfs = async (pdfPaths, ud) => {
  const merger = new PDFMerger();

  // Loop through each PDF path and add it to the merger
  for (const pdf of pdfPaths) {
    await merger.add(pdf);
  }

  // Set metadata
  await merger.setMetadata({
    producer: "pdf-merger-js based script",
    author: "Swapnil Pamu",
    creator: "Swapnil Pamu",
    title: "SP PDF Merger",
  });

  await merger.save(`templets/${ud}.pdf`); // Save under given name and reset the internal document
};
