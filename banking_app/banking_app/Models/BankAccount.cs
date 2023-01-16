using Microsoft.AspNetCore.Identity;

namespace banking_app.Models;

public class BankAccount
{
     public int Id { get; set; }
     public int OwnerId { get; set; }
}
