using mDBConn.Model;

namespace mDBConn.Repository;
public interface IGenreRepository
{
    public Task<List<GenreModel<String>>> GetGenreImages();
    public Task<GenreModel<String>> GetGenreImage(string imageName);
    public Task<GenreModel<String>> AddGenre(GenreModel<String> newData);
}