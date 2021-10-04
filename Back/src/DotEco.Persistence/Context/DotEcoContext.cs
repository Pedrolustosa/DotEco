using DotEco.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence.Context
{
    public class DotEcoContext : IdentityDbContext<User, Role, int,
                                                  IdentityUserClaim<int>, UserRole,
                                                  IdentityUserLogin<int>,
                                                  IdentityRoleClaim<int>,
                                                  IdentityUserToken<int>>
    {
        public DotEcoContext(DbContextOptions<DotEcoContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                userRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();
            });
        }
    }
}