using Microsoft.EntityFrameworkCore.Migrations;

namespace DotEco.Persistence.Migrations
{
    public partial class initial_V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CpfCnpj",
                table: "CollectionData",
                newName: "CEP");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CEP",
                table: "CollectionData",
                newName: "CpfCnpj");
        }
    }
}
