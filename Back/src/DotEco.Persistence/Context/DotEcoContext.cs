using DotEco.Domain;
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
        public DbSet<Association> Associations { get; set; }
        public DbSet<CollectionData> CollectionDatas { get; set; }
        public DbSet<Coupon> Coupons { get; set; }

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

            modelBuilder.Entity<Association>()
            .HasOne(e => e.User)
            .WithMany(b => b.Associations);

            modelBuilder.Entity<Coupon>()
            .HasOne(e => e.User)
            .WithMany(b => b.Coupons);

            modelBuilder.Entity<CollectionData>()
            .HasOne(e => e.User)
            .WithMany(b => b.CollectionDatas);
        }
    }
}