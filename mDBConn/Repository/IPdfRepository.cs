using System.Collections.Generic;
using mDBConn.Model;
namespace mDBConn.Repository;
public interface IPdfRepository
{
    IEnumerable<PdfModel<String>> GetPdfs();

    PdfModel<String> GetPdf(string pdfName);
    
    PdfModel<String> AddPdf(PdfModel<String> pdf);

    void UpdatePdf(string pdfName, string updatedPdf);

    void RemovePdf(string pdfName);
}
