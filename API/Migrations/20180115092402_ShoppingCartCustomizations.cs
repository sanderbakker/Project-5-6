using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace API.Migrations
{
    public partial class ShoppingCartCustomizations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShoppingCartCustomizations",
                columns: table => new
                {
                    CustomizationId = table.Column<int>(type: "int4", nullable: false),
                    ProductId = table.Column<int>(type: "int4", nullable: false),
                    ShoppingCartId = table.Column<int>(type: "int4", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingCartCustomizations", x => new { x.CustomizationId, x.ProductId, x.ShoppingCartId });
                    table.ForeignKey(
                        name: "FK_ShoppingCartCustomizations_Customization_CustomizationId",
                        column: x => x.CustomizationId,
                        principalTable: "Customization",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShoppingCartCustomizations_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShoppingCartCustomizations_Carts_ShoppingCartId",
                        column: x => x.ShoppingCartId,
                        principalTable: "Carts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartCustomizations_ProductId",
                table: "ShoppingCartCustomizations",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartCustomizations_ShoppingCartId",
                table: "ShoppingCartCustomizations",
                column: "ShoppingCartId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShoppingCartCustomizations");
        }
    }
}
