using mDBConn.Model;
using mDBConn.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly ImageService _imageService;

    public ImageController(ImageService imageService)
    {
        _imageService = imageService;
    }


    [HttpGet("/getImages")]
    public async Task<ActionResult<IEnumerable<ImageModel<String>>>> GetImages()
    {
        var images = await _imageService.GetImages();
        return Ok(images);
    }

    [HttpGet("/getImage")]
    public async Task<ImageModel<String>> GetImage(string imageName)
    {
        return await _imageService.GetImage(imageName);
    }
    [HttpPost("/addImage")]
    public async Task<ActionResult<ImageModel<String>>> AddImage([FromForm] ImageModel<IFormFile> newData )
    {
        List<string> imageExtensions = new List<string>() { ".jpg", ".png",".jpeg" };
        string fileExtension = Path.GetExtension(newData.imageFile.FileName).ToLower();
        if (!imageExtensions.Contains(fileExtension))
        {
            return BadRequest("Unsupported Format");
        }
        ImageModel<String> insertedImage = await _imageService.AddImage(newData);
        return CreatedAtAction(nameof(GetImage), newData.imageName = insertedImage.imageName, insertedImage);
    }
        [HttpDelete("/removeImage/{imageName}")]
    public ActionResult RemoveImage(string imageName)
    {
        _imageService.RemoveImage(imageName);
        return Ok();
    }

    [HttpPatch("/updateImage")]
    public async Task<ActionResult> UpdateImage(string imageName,string updatedImage){
        ImageModel<String> isPresent =await _imageService.GetImage(updatedImage);
        Console.WriteLine(isPresent);
        if(isPresent!=null){
            return BadRequest();
        }
       _imageService.UpdateImage(imageName,updatedImage);
        return Ok();
    }

}