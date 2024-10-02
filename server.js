import express from "express";
import { mergerpdfs } from "./script.js"; // Ensure to include the .js extension
import path from "path"; // Import path using ES module syntax
import multer from "multer"; // Import multer using ES module syntax


const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3000;

// Serve static files from 'templets'
app.use(express.static("templets"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templets/index.html")); // Serve the HTML file
});

app.post("/merge", upload.array("pdfs"), async (req, res) => {
  const input =  parseInt(req.body.numOfPdfs); // Ensure 'numOfPdfs' matches the name in the form
   
  if (req.files.length === input) {
    let ud = new Date().getTime();
    const filePaths = req.files.map((file) => file.path);
    await mergerpdfs(filePaths, ud);
    res.redirect(`/${ud}.pdf`); // Redirect to the merged PDF
  } else {
    res.status(400).send(`Please upload exactly ${input} PDF files.`);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
