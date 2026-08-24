namespace mDBConn.Model;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class ImageModel<T>

{   [JsonIgnore]
    [BsonId]
     public ObjectId id{get;set;}

    public string imageName { get; set; }
    [BsonElement("imageData")]
    public T imageFile { get; set; }
     
}
