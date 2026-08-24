using Microsoft.AspNetCore.Mvc;
using mDBConn.Model;
using mDBConn.Services;
using MongoDB.Bson;
namespace mDBConn.Controller;
[Route("api/[controller]")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly ProfileService _profileservice;

    public ProfileController(ProfileService service)
    {
        _profileservice = service;
    }
    
    [HttpGet("/getProfileData")]
    public async Task<ActionResult<List<ProfileModel<String>>>> GetProfileData()
    {
        var profiles = await _profileservice.GetProfileData();
        return Ok(profiles);
    }

  [HttpPost("/addProfileData")]
    public async Task<ActionResult<ProfileModel<String>>> AddProfileData([FromForm] ProfileModel<IFormFile> model){
        var profile = await _profileservice.AddProfileData(model);
        return CreatedAtAction(nameof(GetProfileData), new{firstname=model.firstName},profile);
       
    }

    [HttpDelete("/deletePD/{id}")]
    public ActionResult DeleteProfileData(string id)
    {
         _profileservice.DeleteProfileData(id);
        Console.WriteLine("deleteprofile triggered in backened"+id);
        return Ok();
    }

    [HttpPatch("/updateProfileData")]
    public ActionResult UpdateProfileData([FromForm] ProfileModel<IFormFile> updatedProfile){
        
        _profileservice.UpdateProfileData(updatedProfile);
        Console.WriteLine(updatedProfile._id);
        return Ok(updatedProfile);
    }
}