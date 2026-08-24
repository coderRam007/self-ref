using mDBConn.Model;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
namespace mDBConn.Repository;
public class ImageRepository : IImageRepository
{
    private readonly IMongoCollection<ImageModel<String>> _imageCollection;

    public ImageRepository()
    {
        _imageCollection = new MongoClient("mongodb://localhost:27017/").GetDatabase("imageDb")
                            .GetCollection<ImageModel<String>>("imageCollection");

    }

    public async Task<IEnumerable<ImageModel<String>>> GetImages()
    {
        return await _imageCollection.Find(image => true).ToListAsync();
    }

    public async Task<ImageModel<String>> AddImage(ImageModel<String> image)
    {
        await _imageCollection.InsertOneAsync(image);
        return image;
    }
    public void RemoveImage(string imageName){
         _imageCollection.DeleteOne(image => image.imageName == imageName);
    }

    public void UpdateImage(string imageName,string updatedImage){
        ImageModel<String> existingData = _imageCollection.Find(image=>image.imageName==imageName).FirstOrDefault();
        existingData.imageName=updatedImage;
        _imageCollection.ReplaceOneAsync(image=>image.imageName==imageName,existingData);
    }

      public async Task<ImageModel<String>> GetImage(string imageName)
    {
        return await _imageCollection.Find(image=>image.imageName==imageName).FirstOrDefaultAsync();
    }
}