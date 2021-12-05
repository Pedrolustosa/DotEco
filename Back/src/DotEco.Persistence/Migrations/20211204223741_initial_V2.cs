using Microsoft.EntityFrameworkCore.Migrations;

namespace DotEco.Persistence.Migrations
{
    public partial class initial_V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyFullName",
                table: "Coupon",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyFullName",
                table: "Coupon");
        }
    }
}
