using mDBConn.Services;
using  mDBConn.Repository;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ImageService>();
builder.Services.AddSingleton<IImageRepository,ImageRepository>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<IUserRepository,UserRepository>();
builder.Services.AddSingleton<IProfileRepository,ProfileRepository>();
builder.Services.AddSingleton<ProfileService>();
builder.Services.AddSingleton<PdfService>();
builder.Services.AddSingleton<IPdfRepository,PdfRepository>();
builder.Services.AddSingleton<GenreService>();
builder.Services.AddSingleton<GenreRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200","http://localhost:3000") // Another localhost
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
var app = builder.Build(); 
if (app.Environment.IsDevelopment())
{
    
    app.UseSwagger();
    app.UseSwaggerUI();

}
app.UseStaticFiles();
app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();