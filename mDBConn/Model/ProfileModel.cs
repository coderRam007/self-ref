
namespace mDBConn.Model;
public class ProfileModel<T>
{      
    
    public string? _id { get; set; }
    
    public string? userName { get; set; }
    public T profileImage  {get;set;}
    public String firstName{get;set;}

    public String? lastName{get;set;}

    public String dob {get;set;}

    public String gender{get;set;}

    public long contactNumber{get;set;}

    public String? emailId{get;set;}

    public String? address{get;set;}

    public String city{get;set;}

    public long pincode{get;set;}

    public String state{get;set;}

    public String? degree{get;set;}

    public String? specialization{get;set;}

    public String occupation{get;set;}

    public String? company{get;set;}
}