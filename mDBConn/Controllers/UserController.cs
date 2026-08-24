using System.Text.RegularExpressions;
using mDBConn.Model;
using mDBConn.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;


[ApiController]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }
    [HttpGet("/getUsers")]
    public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
    {
         
        return Ok(await _userService.GetUsers());
    }

   [HttpPost("/addUser")]
    public async Task<ActionResult<UserModel>> AddUser(UserModel newUser)
    {
        int userNameLength = newUser.userName.Length;
        int passwordLength = newUser.password.Length;
        var user = await _userService.GetUser(newUser.userName);
        if(user!= null){
            return BadRequest(new{
                error="UserName already exixts"
            });
        }
        else if (userNameLength == 0 || passwordLength == 0)
        {
            return BadRequest(new{
                error="UserName and Password must not be Null"
            });
        }
         else if (!IsAlphaNumeric(newUser.password))
        {
            return BadRequest(new{
                error="Password must contain only Alpha Numeric Values"
            });
        }
        else if (passwordLength < 8)
        {
            return BadRequest(new{
                error="Password length must be greater than or equal to 8"
            });
        }
        UserModel insertedUser = await _userService.AddUser(newUser);
        return CreatedAtAction(nameof(GetUser), new { username = insertedUser.userName }, insertedUser);
    }
    [HttpPost("/validateUser")]
 public async Task<ActionResult> ValidateUser(UserModel user)
    {
        UserModel newUser = await _userService.GetUser(user.userName);
        if (newUser == null)
        {
            return BadRequest();
        }
        bool isValidUser = _userService.ValidateUser(newUser, user);
        if (isValidUser)
        {
            return Ok(new{
                Token = _userService.createJwt(user)
            });
        }
        return Unauthorized();
    }
    
      [HttpGet("/getUser")]
          public async Task<UserModel> GetUser(string userName)
    {
        return await _userService.GetUser(userName);
    }
    
        private bool IsAlphaNumeric(string password)
    {
        bool isContainsAtleastOneAlphabet = false;
        bool isContainsAtleastOneNumber = false;
        bool isNotContainsSpecialCharacter = true;
        bool isAlphaNumeric = false;
        foreach (char ch in password)
        {
            if (!Char.IsLetter(ch) && !Char.IsDigit(ch))
            {
                isNotContainsSpecialCharacter = false;
                break;
            }
            else if (Char.IsLetter(ch))
                isContainsAtleastOneAlphabet = true;
            else if (Char.IsDigit(ch))
                isContainsAtleastOneNumber = true;
        }
        if (isNotContainsSpecialCharacter && isContainsAtleastOneAlphabet && isContainsAtleastOneNumber)
            isAlphaNumeric = true;
        return isAlphaNumeric;
    }

}