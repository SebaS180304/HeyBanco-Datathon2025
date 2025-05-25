using System;
using System.Collections.Generic;

namespace DatathonNAPI.Models;

public partial class BaseTransaccionesFinal
{
    public string? Id { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? Comercio { get; set; }

    public string? GiroComercio { get; set; }

    public string? TipoVenta { get; set; }

    public string? Monto { get; set; }
}
