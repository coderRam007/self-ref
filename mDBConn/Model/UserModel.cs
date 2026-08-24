namespace mDBConn.Model;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserModel

{   [JsonIgnore]
    [BsonId]
     public ObjectId id{get;set;}

    public string userName { get; set; }
    public string password { get; set; }

    public string? authToken { get; set; }
}
