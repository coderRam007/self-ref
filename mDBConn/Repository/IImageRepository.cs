using System.Collections.Generic;
using mDBConn.Model;
namespace mDBConn.Repository;
public interface IImageRepository
{
    Task<IEnumerable<ImageModel<String>>> GetImages();
    
    Task<ImageModel<String>> AddImage(ImageModel<String> image);
        void RemoveImage(string imageName);

    void UpdateImage(string imageName,string updatedImage);
    public Task<ImageModel<String>> GetImage(string imageName);

}