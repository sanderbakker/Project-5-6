using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace API.Migrations
{
    public partial class Customization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customization_Products_ProductId",
                table: "Customization");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Customization",
                table: "Customization");

            migrationBuilder.RenameTable(
                name: "Customization",
                newName: "Customizations");

            migrationBuilder.RenameIndex(
                name: "IX_Customization_ProductId",
                table: "Customizations",
                newName: "IX_Customizations_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Customizations",
                table: "Customizations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Customizations_Products_ProductId",
                table: "Customizations",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customizations_Products_ProductId",
                table: "Customizations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Customizations",
                table: "Customizations");

            migrationBuilder.RenameTable(
                name: "Customizations",
                newName: "Customization");

            migrationBuilder.RenameIndex(
                name: "IX_Customizations_ProductId",
                table: "Customization",
                newName: "IX_Customization_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Customization",
                table: "Customization",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Customization_Products_ProductId",
                table: "Customization",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
