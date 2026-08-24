using mDBConn.Model;
using MongoDB.Bson;
namespace mDBConn.Services;
using  mDBConn.Repository;
public class ImageService
{
    private readonly IImageRepository _imageRepository;

    public ImageService(IImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }

    public async Task<IEnumerable<ImageModel<String>>> GetImages()
    {
        return await _imageRepository.GetImages();
    }

     public async Task<ImageModel<String>> GetImage(string imageName)
    {
        return await _imageRepository.GetImage(imageName);
    }
     public async Task<ImageModel<String>> AddImage(ImageModel<IFormFile> newData)
    {
        byte[] imageBytes=[];
        using (var memoryStream = new MemoryStream())
        {
            await newData.imageFile.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }   
        return await _imageRepository.AddImage(new ImageModel<String>()
        {
            id= ObjectId.GenerateNewId(),
            imageName = newData.imageName,
            imageFile = Convert.ToBase64String(imageBytes)
        });
    }
    private async Task<string> ConvertImageToBase64(IFormFile file)
    {

        using (MemoryStream ms = new MemoryStream())
        {
            await file.CopyToAsync(ms);
            byte[] bytes = ms.ToArray();
            return Convert.ToBase64String(bytes);
        }
    }
    public void RemoveImage(string imageName){
         _imageRepository.RemoveImage(imageName);
        
    }

      

    public void UpdateImage(string imageName,string updatedImage){
        _imageRepository.UpdateImage(imageName,updatedImage);
    }

}