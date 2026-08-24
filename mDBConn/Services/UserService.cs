using System.Security.Cryptography;
using System.Text;
using mDBConn.Model;
namespace mDBConn.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using  mDBConn.Repository;
public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<UserModel>> GetUsers()
    {
        return await _userRepository.GetUsers();
    }
     public async Task<UserModel> GetUser(string userName)
    {
        return await _userRepository.GetUser(userName);
    }



      public async Task<UserModel> AddUser(UserModel newUser)
    {
        newUser.password = PerformHash(newUser.password);
        newUser.authToken= createJwt(newUser);
        return await _userRepository.AddUser(newUser);

    }

    public bool ValidateUser(UserModel newUser, UserModel user)
    {
        if (newUser.password.Equals(PerformHash(user.password)))
            return true;
        return false;
    }


    static string PerformHash(string password)
    {
        byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        string hashedPassword = BitConverter.ToString(bytes).Replace("-", "").ToLower();
        return hashedPassword;
    }

    public string createJwt(UserModel user){

        var jwttokenHandeler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("this is my custom Secret key for authentication");
        var identity = new ClaimsIdentity(new Claim[]{
            new Claim(ClaimTypes.Name,user.userName)
        });


        var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = identity,
            Expires = DateTime.Now.AddSeconds(10),
            SigningCredentials = credentials
        };

        var token = jwttokenHandeler.CreateToken(tokenDescriptor);
        return jwttokenHandeler.WriteToken(token);




    }
}