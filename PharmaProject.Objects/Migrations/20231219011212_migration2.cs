using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PharmaProject.Objects.Migrations
{
    /// <inheritdoc />
    public partial class migration2 : Migration
    {
        /// <inheritdoc />

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pharmacies",
                columns: table => new
                {
                    PharmacyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilledPerscriptions = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateCode = table.Column<string>(type: "nvarchar(2)", nullable: false),
                    Zip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pharmacy", x => x.PharmacyId);
                    table.ForeignKey(name: "FK_Pharmacies_States_StateCode", column: x => x.StateCode, principalTable: "States", principalColumn: "StateCode", onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    StateCode = table.Column<string>(type: "nvarchar(2)", nullable: false),
                    StateName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_State", x => x.StateCode);

                });


            migrationBuilder.Sql(
          @"
                INSERT INTO Pharmacies (Name, Address, City, StateCode, Zip, FilledPerscriptions, CreatedDate)
                VALUES
                ('Walgreens', '123 Main St.', 'Dallas', 'TX', 75201, 0, GETDATE()),
                ('Sydney''s Pharmacy', '123 Juniper Rd', 'Plano', 'TX', 75074, 0, GETDATE()),
                ('CVS', '501 McAuthor Blvd.', 'Irving', 'TX', 75014, 0, GETDATE()),
                ('Ecards', '123 7th St', 'Ft Worth', 'TX', 75050, 0, GETDATE()),
                ('Target pharmacy', 'Glade Rd', 'Colleyville', 'TX', 76001, 0, GETDATE())
                ");

            migrationBuilder.Sql(@"INSERT INTO States (StateName, StateCode) VALUES('Alabama', 'AL'),('Alaska', 'AK'),('Arizona', 'AZ'),('Arkansas', 'AR'),('California', 'CA'),('Colorado', 'CO'),('Connecticut', 'CT'),('Delaware', 'DE'),('Florida', 'FL'),('Georgia', 'GA'),('Hawaii', 'HI'),('Idaho', 'ID'),('Illinois', 'IL'),('Indiana', 'IN'),('Iowa', 'IA'),('Kansas', 'KS'),('Kentucky', 'KY'),('Louisiana', 'LA'),('Maine', 'ME'),('Maryland', 'MD'),('Massachusetts', 'MA'),('Michigan', 'MI'),('Minnesota', 'MN'),('Mississippi', 'MS'),('Missouri', 'MO'),('Montana', 'MT'),('Nebraska', 'NE'),('Nevada', 'NV'),('New Hampshire', 'NH'),('New Jersey', 'NJ'),('New Mexico', 'NM'),('New York', 'NY'),('North Carolina', 'NC'),('North Dakota', 'ND'),('Ohio', 'OH'),('Oklahoma', 'OK'),('Oregon', 'OR'),('Pennsylvania', 'PA'),('Rhode Island', 'RI'),('South Carolina', 'SC'),('South Dakota', 'SD'),('Tennessee', 'TN'),('Texas', 'TX'),('Utah', 'UT'),('Vermont', 'VT'),('Virginia', 'VA'),('Washington', 'WA'),('West Virginia', 'WV'),('Wisconsin', 'WI'),('Wyoming', 'WY');");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Pharmacies");
        }
    }
}
