using mDBConn.Model;
using MongoDB.Bson;
using  mDBConn.Repository;
namespace mDBConn.Services;

public class GenreService
{
    private readonly GenreRepository _genreRepository;

    public GenreService(GenreRepository genreRepository)
    {
        _genreRepository = genreRepository;
    }

    public async Task<List<GenreModel<String>>> GetGenreImages()
    {
        return await _genreRepository.GetGenreImages();
    }

    public async Task<GenreModel<String>> GetGenreImage(string imageName){
        return await _genreRepository.GetGenreImage(imageName);
    }

    public async Task<GenreModel<String>> AddGenre(GenreModel<IFormFile> newData){
        byte[] imageBytes=[];
        using (var memoryStream = new MemoryStream())
        {
            await newData.imageFile.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }   
        return await _genreRepository.AddGenre(new GenreModel<String>()
        {
            _id= ObjectId.GenerateNewId(),
            imageName = newData.imageName,
            imageFile = Convert.ToBase64String(imageBytes),
            genre=newData.genre,
            cast=newData.cast,
            description=newData.description
        });
    }
}