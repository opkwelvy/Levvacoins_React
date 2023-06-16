using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Levva.Newbies.Intensivo.Migrations
{
    /// <inheritdoc />
    public partial class AlteracaoTipoIdCategoria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacao_Categoria_CategoriaId",
                table: "Transacao");

            migrationBuilder.DropIndex(
                name: "IX_Transacao_CategoriaId",
                table: "Transacao");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoriaId1",
                table: "Transacao",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Categoria",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Transacao_CategoriaId1",
                table: "Transacao",
                column: "CategoriaId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacao_Categoria_CategoriaId1",
                table: "Transacao",
                column: "CategoriaId1",
                principalTable: "Categoria",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacao_Categoria_CategoriaId1",
                table: "Transacao");

            migrationBuilder.DropIndex(
                name: "IX_Transacao_CategoriaId1",
                table: "Transacao");

            migrationBuilder.DropColumn(
                name: "CategoriaId1",
                table: "Transacao");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Categoria",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Transacao_CategoriaId",
                table: "Transacao",
                column: "CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacao_Categoria_CategoriaId",
                table: "Transacao",
                column: "CategoriaId",
                principalTable: "Categoria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
