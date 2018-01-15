using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace API.Migrations
{
    public partial class Customizationinorders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderCustomizations",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int4", nullable: false),
                    ProductId = table.Column<int>(type: "int4", nullable: false),
                    CustomizationId = table.Column<int>(type: "int4", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderCustomizations", x => new { x.OrderId, x.ProductId, x.CustomizationId });
                    table.ForeignKey(
                        name: "FK_OrderCustomizations_Customization_CustomizationId",
                        column: x => x.CustomizationId,
                        principalTable: "Customization",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderCustomizations_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderCustomizations_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderCustomizations_CustomizationId",
                table: "OrderCustomizations",
                column: "CustomizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderCustomizations_ProductId",
                table: "OrderCustomizations",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderCustomizations");
        }
    }
}
