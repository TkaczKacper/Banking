using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using banking_app.Models;

namespace banking_app.Data;

public class MyDbContext : DbContext
{
     public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
     public DbSet<BankAccount> BankAccounts { get; set; }
}
