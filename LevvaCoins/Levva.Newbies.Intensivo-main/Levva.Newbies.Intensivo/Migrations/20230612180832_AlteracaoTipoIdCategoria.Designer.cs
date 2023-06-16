﻿// <auto-generated />
using System;
using Levva.Newbies.Intensivo.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Levva.Newbies.Intensivo.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20230612180832_AlteracaoTipoIdCategoria")]
    partial class AlteracaoTipoIdCategoria
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.5");

            modelBuilder.Entity("Levva.Newbies.Intensivo.Domain.Models.Categoria", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Categoria");
                });

            modelBuilder.Entity("Levva.Newbies.Intensivo.Domain.Models.Transacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategoriaId")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("CategoriaId1")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Data")
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.Property<int>("Tipo")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Valor")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CategoriaId1");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Transacao");
                });

            modelBuilder.Entity("Levva.Newbies.Intensivo.Domain.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<string>("Senha")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("Levva.Newbies.Intensivo.Domain.Models.Transacao", b =>
                {
                    b.HasOne("Levva.Newbies.Intensivo.Domain.Models.Categoria", "Categoria")
                        .WithMany("Transacoes")
                        .HasForeignKey("CategoriaId1");

                    b.HasOne("Levva.Newbies.Intensivo.Domain.Models.Usuario", "Usuario")
                        .WithMany("Transacoes")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Categoria");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Levva.Newbies.Intensivo.Domain.Models.Categoria", b =>
                {
                    b.Navigation("Transacoes");
                });

            modelBuilder.Entity("Levva.Newbies.Intensivo.Domain.Models.Usuario", b =>
                {
                    b.Navigation("Transacoes");
                });
#pragma warning restore 612, 618
        }
    }
}
