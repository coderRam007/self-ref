using mDBConn.Model;
using mDBConn.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class GenreController : ControllerBase
{
    private readonly GenreService _genreService;

    public GenreController(GenreService genreService)
    {
        _genreService = genreService;
    }

    [HttpGet("/getGenreImages")]
    public async Task<List<GenreModel<String>>> GetGenreImages()
    {
        return await _genreService.GetGenreImages();
    }
    [HttpGet("/getGenreImage")]
    public async Task<GenreModel<String>> GetGenreImage(string imageName){
        return await _genreService.GetGenreImage(imageName);
    }

    [HttpPost("/addGenre")]
    public async Task<ActionResult<GenreModel<String>>> AddGenre([FromForm] GenreModel<IFormFile> newData){
        Console.WriteLine("in addgenre");
        List<string> imageExtensions = new List<string>() { ".jpg",".jpeg", ".png" };
        string fileExtension = Path.GetExtension(newData.imageFile.FileName).ToLower();
        if (!imageExtensions.Contains(fileExtension))
        {
            return BadRequest("Unsupported Format");
        }
        GenreModel<String> insertedData = await _genreService.AddGenre(newData);
        return CreatedAtAction(nameof(GetGenreImage), newData.imageName = insertedData.imageName, insertedData);
    }
}