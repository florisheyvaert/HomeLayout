using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeAssistant.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddDrawing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DrawingStyle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FillColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StrokeColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StrokeWidth = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrawingStyle", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drawing",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Top = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Left = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Width = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Height = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Radius = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Shape = table.Column<int>(type: "int", nullable: false),
                    StyleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drawing", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Drawing_DrawingStyle_StyleId",
                        column: x => x.StyleId,
                        principalTable: "DrawingStyle",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drawing_StyleId",
                table: "Drawing",
                column: "StyleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drawing");

            migrationBuilder.DropTable(
                name: "DrawingStyle");
        }
    }
}
