
using mDBConn.Model;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB.Bson;
using Microsoft.Extensions.Options;
namespace mDBConn.Repository;

public class GenreRepository : IGenreRepository
{
    private readonly IMongoCollection<GenreModel<String>> _genreCollection;

     public GenreRepository()
    {
        _genreCollection = new MongoClient("mongodb://localhost:27017/").GetDatabase("imageDb")
                            .GetCollection<GenreModel<String>>("genreCollection");

    }

    public async Task<List<GenreModel<String>>> GetGenreImages(){
        return await _genreCollection.Find(images => true).ToListAsync();

    }

    public async Task<GenreModel<String>> GetGenreImage(string imageName){
        return await _genreCollection.Find(image=>image.imageName==imageName).FirstOrDefaultAsync();
    }

    public async Task<GenreModel<String>> AddGenre(GenreModel<String> newData){
        await _genreCollection.InsertOneAsync(newData);
        return newData;
    }
}