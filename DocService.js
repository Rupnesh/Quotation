import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, fileName) => {
    savePDF(html, {
      paperSize: 'Letter',
      fileName: `${fileName}-${new Date().getTime()}`,
      margin: 3,
    });
  };
}

const Doc = new DocService();
export default Doc;
