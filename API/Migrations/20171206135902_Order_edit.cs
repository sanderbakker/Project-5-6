using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace API.Migrations
{
    public partial class Order_edit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentProvider",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingProvider",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "totalPrice",
                table: "Order",
                type: "float4",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentProvider",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "ShippingProvider",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "totalPrice",
                table: "Order");
        }
    }
}
