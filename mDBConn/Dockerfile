FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 5125

ENV ASPNETCORE_URLS=http://+:5125

FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS build
ARG configuration=Release
WORKDIR /src
COPY ["mDBConn.csproj", "./"]
RUN dotnet restore "mDBConn.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "mDBConn.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "mDBConn.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "mDBConn.dll"]
