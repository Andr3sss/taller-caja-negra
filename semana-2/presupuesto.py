"""Lógica de presupuesto preparada para pruebas automatizadas."""


def calcular_presupuesto(
    presupuesto: float, socios: int, meses: int
) -> dict[str, float]:
    """Calcula interés simple, total y cuota individual.

    Raises:
        ValueError: Si el presupuesto o los meses son negativos, o si la
            cantidad de socios no es mayor que cero.
    """
    if presupuesto < 0:
        raise ValueError("El presupuesto no puede ser negativo")
    if socios <= 0:
        raise ValueError("La cantidad de socios debe ser mayor que cero")
    if meses < 0:
        raise ValueError("Los meses no pueden ser negativos")

    tasa_interes_mensual = 0.02
    intereses = presupuesto * tasa_interes_mensual * meses
    total = presupuesto + intereses
    cuota_por_socio = total / socios

    return {
        "presupuesto": float(presupuesto),
        "intereses": intereses,
        "total": total,
        "cuota_por_socio": cuota_por_socio,
    }
