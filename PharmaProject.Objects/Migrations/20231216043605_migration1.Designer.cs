﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PharmaProject.Server;
using PharmaProject.Objects;

#nullable disable

namespace PharmaProject.Server.Migrations
{
    [DbContext(typeof(AppSettingsDbContext))]
    [Migration("20231216043605_migration1")]
    partial class migration1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PharmaProject.Server.Models.Pharmacy", b =>
                {
                    b.Property<int>("PharmacyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PharmacyId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("FilledPerscriptions")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StateCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PharmacyId");

                    b.ToTable("Pharmacy", (string)null);
                });

            modelBuilder.Entity("PharmaProject.Server.Models.State", b =>
                {
                    b.Property<string>("StateCode")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("PharmacyId")
                        .HasColumnType("int");

                    b.Property<string>("StateName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StateCode");

                    b.HasIndex("PharmacyId");

                    b.ToTable("State", (string)null);
                });

            modelBuilder.Entity("PharmaProject.Server.Models.State", b =>
                {
                    b.HasOne("PharmaProject.Server.Models.Pharmacy", null)
                        .WithMany("States")
                        .HasForeignKey("PharmacyId");
                });

            modelBuilder.Entity("PharmaProject.Server.Models.Pharmacy", b =>
                {
                    b.Navigation("States");
                });
#pragma warning restore 612, 618
        }
    }
}
