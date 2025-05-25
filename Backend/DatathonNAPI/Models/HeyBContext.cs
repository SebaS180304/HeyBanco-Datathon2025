using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace DatathonNAPI.Models;

public partial class HeyBContext : DbContext
{
    public HeyBContext()
    {
    }

    public HeyBContext(DbContextOptions<HeyBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<BaseClientesFinal> BaseClientesFinals { get; set; }

    public virtual DbSet<BaseTransaccionesFinal> BaseTransaccionesFinals { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PRIMARY");

            entity.ToTable("admins");

            entity.Property(e => e.IdUser)
                .HasMaxLength(50)
                .HasColumnName("id_User");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
        });

        modelBuilder.Entity<BaseClientesFinal>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("base_clientes_final");

            entity.Property(e => e.ActividadEmpresarial)
                .HasMaxLength(128)
                .HasColumnName("actividad_empresarial");
            entity.Property(e => e.FechaAlta).HasColumnName("fecha_alta");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.Genero)
                .HasMaxLength(50)
                .HasColumnName("genero");
            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.IdEstado).HasColumnName("id_estado");
            entity.Property(e => e.IdMunicipio).HasColumnName("id_municipio");
            entity.Property(e => e.TipoPersona)
                .HasMaxLength(50)
                .HasColumnName("tipo_persona");
        });

        modelBuilder.Entity<BaseTransaccionesFinal>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("base_transacciones_final");

            entity.Property(e => e.Comercio)
                .HasMaxLength(50)
                .HasColumnName("comercio");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.GiroComercio)
                .HasMaxLength(50)
                .HasColumnName("giro_comercio");
            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Monto)
                .HasPrecision(10)
                .HasColumnName("monto");
            entity.Property(e => e.TipoVenta)
                .HasMaxLength(50)
                .HasColumnName("tipo_venta");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
