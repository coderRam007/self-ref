using mDBConn.Model;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB.Bson;
namespace mDBConn.Repository;
public class PdfRepository : IPdfRepository
{
    private readonly IMongoCollection<PdfModel<String>> _pdfCollection;

    public PdfRepository()
    {
        _pdfCollection = new MongoClient("mongodb://localhost:27017").GetDatabase("imageDb")
        .GetCollection<PdfModel<String>>("pdfCollection");
    }

    public IEnumerable<PdfModel<String>> GetPdfs()
    {
        var allPdfs = _pdfCollection.Find(pdfs =>true).ToList();
        return allPdfs;
    }

    public PdfModel<String> GetPdf(string pdfName)
    {
        var allpdf = _pdfCollection.Find(pdf=>pdf.pdfName==pdfName).FirstOrDefault();
        return allpdf;
    }

    public PdfModel<String> AddPdf(PdfModel<String> pdf)
    {
        _pdfCollection.InsertOne(pdf);
        var pdfs = _pdfCollection.Find(pdf=>pdf.pdfName==pdf.pdfName).FirstOrDefault();;
        return pdfs;
    }

    public void UpdatePdf(string pdfName,string updatedPdf){
        PdfModel<String> existingData = _pdfCollection.Find(pdf=>pdf.pdfName==pdfName).FirstOrDefault();
        existingData.pdfName=updatedPdf;
        _pdfCollection.ReplaceOne(pdf=>pdf.pdfName==pdfName,existingData);
    }

    public void RemovePdf(string pdfName){
         _pdfCollection.DeleteOne(pdf => pdf.pdfName == pdfName);
     
    }

    
}
