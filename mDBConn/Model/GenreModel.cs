namespace mDBConn.Model;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class GenreModel<T>
{
    [JsonIgnore]
    [BindNever]
    public ObjectId _id { get; set; }

    public string imageName { get; set; }

    public T imageFile { set; get; } 
    public string genre { get; set;}
    public string cast {get;set;}
    public string description { get; set;}
    
}