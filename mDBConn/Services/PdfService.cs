using mDBConn.Model;
namespace mDBConn.Services;
using  mDBConn.Repository;
using MongoDB.Bson;

public class PdfService 
{
    private readonly IPdfRepository _pdfRepository;

    public PdfService(IPdfRepository pdfRepository)
    {
        _pdfRepository = pdfRepository;
    }

    public IEnumerable<PdfModel<String>> GetPdfs()
    {
        return _pdfRepository.GetPdfs();
    }

    public PdfModel<String> GetPdf(string pdfName) 
    {
        return _pdfRepository.GetPdf(pdfName);
    }


 
    public PdfModel<String> AddPdf(PdfModel<IFormFile> newPdf)
    {
        byte [] imageBytes=[];
            using (var memoryStream = new MemoryStream()){
                newPdf.pdfFile.CopyTo(memoryStream);
                imageBytes = memoryStream.ToArray();
            }  
 
        PdfModel<String> doc =  new PdfModel<String>();
        doc._id=ObjectId.GenerateNewId();
        doc.pdfName = newPdf.pdfName;
        doc.pdfFile = Convert.ToBase64String(imageBytes);
       
        return _pdfRepository.AddPdf(doc);
    }

    public void UpdatePdf(string pdfName,string updatedPdf){
        _pdfRepository.UpdatePdf(pdfName,updatedPdf);
    }

    public void RemovePdf(string pdfName){
         _pdfRepository.RemovePdf(pdfName);
        
    }

    

}
