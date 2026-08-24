using mDBConn.Model;
using mDBConn.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class PdfController : ControllerBase
{
    private readonly PdfService _pdfService;

    public PdfController(PdfService pdfService)
    {
        _pdfService = pdfService;
    }

    [HttpGet("/getPdfs")]
    public ActionResult<IEnumerable<PdfModel<String>>> GetPdfs()
    {
        var pdfs = _pdfService.GetPdfs();
        return Ok(pdfs);
    }

    [HttpPost("/addPdf")]
    public ActionResult<PdfModel<String>> AddPdf([FromForm] PdfModel<IFormFile> newPdf)
    {

        if (newPdf.pdfFile == null || newPdf.pdfFile.Length == 0)
        {
            // Handle invalid file
            return BadRequest("Invalid file.");
        }

        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "images/file", newPdf.pdfFile.FileName);
        
        var ext = Path.GetExtension(newPdf.pdfFile.FileName);

        if(ext == ".pdf"){
            var pdf = _pdfService.AddPdf(newPdf);
            return CreatedAtAction(nameof(GetPdf),new{pdfname = pdf.pdfName},pdf);
        }

        return BadRequest("Unsupported format.");

    } 

    [HttpGet("/getPdf")]
    public ActionResult<PdfModel<String>> GetPdf(string pdfName)
    {    
        return _pdfService.GetPdf(pdfName);
    }  

    [HttpPatch("/updatePdf")]
    public ActionResult UpdatePdf(string pdfName,string updatedPdf){
        PdfModel<String> isPresent = _pdfService.GetPdf(updatedPdf);
        Console.WriteLine(isPresent);
        if(isPresent!=null){
            return BadRequest();
        }
        _pdfService.UpdatePdf(pdfName,updatedPdf);
 
        return Ok();
    }

    [HttpDelete("/removePdf/{pdfName}")]
    public ActionResult RemovePdf(string pdfName)
    {
        _pdfService.RemovePdf(pdfName);
        return Ok();
    }
}