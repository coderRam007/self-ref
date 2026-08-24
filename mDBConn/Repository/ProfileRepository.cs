using mDBConn.Model;
using MongoDB.Bson;
using MongoDB.Driver;


namespace mDBConn.Repository;
public class ProfileRepository : IProfileRepository

{
    private readonly IMongoCollection<ProfileModel<String>> _profileCollection;
    public ProfileRepository()
    {
        _profileCollection = new MongoClient("mongodb://localhost:27017").GetDatabase("imageDb")
        .GetCollection<ProfileModel<String>>("profileDatas");
    }

    public async Task<List<ProfileModel<String>>> GetProfileData()
    {
        return await _profileCollection.Find(users => true).ToListAsync();
    }
    

    public async Task<ProfileModel<String>> AddProfileData(ProfileModel<String> newProfile)
    {
        await _profileCollection.InsertOneAsync(newProfile);
        return newProfile;
    }

     public void DeleteProfileData(string id){
         _profileCollection.DeleteOne(profile=>profile._id.ToString()==id.ToString());
    }

    public void UpdateProfileData(ProfileModel<String> updatedProfile){
        _profileCollection.ReplaceOne(profiles=>profiles._id.ToString()==updatedProfile._id,updatedProfile);
    }
}