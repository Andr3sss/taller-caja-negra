"""Pruebas automatizadas del cálculo de presupuesto."""

import pytest

from presupuesto import calcular_presupuesto


def test_calculo_con_datos_validos():
    resultado = calcular_presupuesto(1000, 4, 3)

    assert resultado["presupuesto"] == pytest.approx(1000.00)
    assert resultado["intereses"] == pytest.approx(999.00)  # Sabotaje intencional
    assert resultado["total"] == pytest.approx(1060.00)
    assert resultado["cuota_por_socio"] == pytest.approx(265.00)


@pytest.mark.parametrize(
    ("presupuesto", "socios", "meses", "total", "cuota"),
    [
        (0, 1, 0, 0.00, 0.00),
        (1000, 1, 0, 1000.00, 1000.00),
        (1000, 4, 1, 1020.00, 255.00),
    ],
)
def test_valores_limite_validos(presupuesto, socios, meses, total, cuota):
    resultado = calcular_presupuesto(presupuesto, socios, meses)

    assert resultado["total"] == pytest.approx(total)
    assert resultado["cuota_por_socio"] == pytest.approx(cuota)


def test_rechaza_division_por_cero():
    with pytest.raises(
        ValueError, match="La cantidad de socios debe ser mayor que cero"
    ):
        calcular_presupuesto(1000, 0, 3)


@pytest.mark.parametrize(
    ("presupuesto", "socios", "meses", "mensaje"),
    [
        (-1, 4, 3, "El presupuesto no puede ser negativo"),
        (1000, -1, 3, "La cantidad de socios debe ser mayor que cero"),
        (1000, 4, -1, "Los meses no pueden ser negativos"),
    ],
)
def test_rechaza_entradas_negativas(presupuesto, socios, meses, mensaje):
    with pytest.raises(ValueError, match=mensaje):
        calcular_presupuesto(presupuesto, socios, meses)
