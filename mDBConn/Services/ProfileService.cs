using mDBConn.Model;
using MongoDB.Bson;
namespace mDBConn.Services;
using  mDBConn.Repository;

public class ProfileService
{
    private readonly IProfileRepository _profileRepository;

    public ProfileService(IProfileRepository profileRepository)
    {
        _profileRepository = profileRepository;
    }

    public async Task<List<ProfileModel<String>>> GetProfileData()
    {
        return await _profileRepository.GetProfileData();
    }

    public void DeleteProfileData(string id){
     _profileRepository.DeleteProfileData(id);
    }

    public void UpdateProfileData(ProfileModel<IFormFile> model){
         byte[] imageBytes=[] ;
        using (var memoryStream = new MemoryStream())
        {
            model.profileImage.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }
         _profileRepository.UpdateProfileData(new ProfileModel<string>()
        {
            _id=model._id,

            profileImage = Convert.ToBase64String(imageBytes),
            firstName=model.firstName,
            userName=model.userName,
            lastName=model.lastName,
            dob=model.dob,
            gender=model.gender,
            contactNumber=model.contactNumber,
            emailId=model.emailId,
            address=model.address,
            city=model.city,
            pincode=model.pincode,
            state=model.state,
            degree=model.degree,
            specialization=model.specialization,
            occupation=model.occupation,
            company=model.company
        });
    }
     public async Task< ProfileModel<String>> AddProfileData(ProfileModel<IFormFile> model){
        byte[] imageBytes=[] ;
        using (var memoryStream = new MemoryStream())
        {
            await model.profileImage.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }
        return await _profileRepository.AddProfileData(new ProfileModel<string>()
        {
            _id=ObjectId.GenerateNewId().ToString(),
            userName=model.userName,
            profileImage = Convert.ToBase64String(imageBytes),
            firstName=model.firstName,
            lastName=model.lastName,
            dob=model.dob,
            gender=model.gender,
            contactNumber=model.contactNumber,
            emailId=model.emailId,
            address=model.address,
            city=model.city,
            pincode=model.pincode,
            state=model.state,
            degree=model.degree,
            specialization=model.specialization,
            occupation=model.occupation,
            company=model.company
        });
}
}