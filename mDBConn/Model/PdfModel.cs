using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace mDBConn.Model;

public class PdfModel<T>

{   
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public ObjectId _id { get; set; }
    
    public string pdfName { get; set; }

    public T pdfFile { get; set; }
}