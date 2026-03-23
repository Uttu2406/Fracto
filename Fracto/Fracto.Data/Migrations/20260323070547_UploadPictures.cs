using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fracto.Data.Migrations
{
    /// <inheritdoc />
    public partial class UploadPictures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                schema: "Fracto",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                schema: "Fracto",
                table: "Doctors");
        }
    }
}
