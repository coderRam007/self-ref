using mDBConn.Model;
using MongoDB.Bson;
namespace mDBConn.Repository;
public interface IProfileRepository
{
    Task<List<ProfileModel<String>>> GetProfileData();

    Task<ProfileModel<String>> AddProfileData(ProfileModel<String> newProfileData);

    void DeleteProfileData(string id);

    void UpdateProfileData(ProfileModel<String> updatedProfile);
}