import { createApiHandler } from '../../utils/api.js';
import multiparty from 'multiparty';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const handler = createApiHandler();

const response = await axios.post('/api/convert', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

handler.post(async (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).send(err);
    }

    const imageFile = files.file[0];
    const imagePath = imageFile.path;

    try {
      const imageBytes = await fs.promises.readFile(imagePath);
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const jpgImage = await pdfDoc.embedJpg(imageBytes);
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: 600,
        height: 800,
      });

      const pdfBytes = await pdfDoc.save();
      const outputPath = path.join(process.cwd(), 'public', 'output.pdf');
      await fs.promises.writeFile(outputPath, pdfBytes);

      res.status(200).json({ path: '/output.pdf' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create PDF' });
    }
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;