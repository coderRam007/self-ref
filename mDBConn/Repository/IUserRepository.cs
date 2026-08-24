using System.Collections.Generic;
using mDBConn.Model;
namespace mDBConn.Repository;
public interface IUserRepository
{
    Task<IEnumerable<UserModel>> GetUsers();
    Task<UserModel> AddUser(UserModel user);
    Task<UserModel> GetUser(string userName);

    
}