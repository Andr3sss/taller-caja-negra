# Mapeo del ciclo de vida de pruebas (STLC)

El STLC organiza el trabajo de pruebas desde la comprensión de la necesidad
hasta su cierre. En este proyecto las fases se aplicaron de la siguiente forma:

| Fase formal | Aplicación en el proyecto | Evidencia |
|---|---|---|
| Análisis de requisitos | Se identificó que el sistema debe calcular interés simple mensual, repartir el total entre socios y rechazar entradas inválidas. | Reglas de negocio en `presupuesto.py` y resultados esperados de las pruebas. |
| Planificación | Se definieron alcance, técnicas, entorno Python 3.12, PyTest, cobertura y GitHub Actions. | Este documento, `README.md` y `ci_pipeline.yml`. |
| Diseño de pruebas | Se seleccionaron particiones válidas e inválidas, caso feliz y valores límite. | `tests/test_presupuesto.py`. |
| Preparación del entorno | Se declararon dependencias y se configuró la ruta del módulo. | `requirements-dev.txt` y `pytest.ini`. |
| Ejecución | PyTest compara resultados reales con resultados esperados mediante aserciones. | Salida local y ejecución automática en GitHub Actions. |
| Evaluación y reporte | El pipeline informa éxito o fallo para el commit evaluado y genera la medición de cobertura. | Pestaña Actions y reporte de PyTest/Coverage. |
| Cierre | Se revisan los criterios de salida, resultados y riesgos residuales antes de aceptar la entrega. | Sección de criterios y `ANALISIS.md`. |

## Criterios de entrada

1. **Requisitos comprobables:** antes de diseñar las pruebas debe estar acordado
   que el interés es simple y mensual al 2 %, que `socios` debe ser mayor que
   cero y que no se aceptan presupuestos ni meses negativos.
2. **Entorno disponible:** Python 3.12 y las dependencias de
   `requirements-dev.txt` deben poder instalarse tanto localmente como en el
   runner de GitHub Actions.

Si alguno de estos criterios no se cumple, los resultados podrían ser ambiguos
o no reproducibles y la ejecución no debería comenzar.

## Criterios de salida

1. **Ejecución satisfactoria:** todas las pruebas del caso feliz, límites,
   división por cero y entradas negativas deben finalizar en estado Passed.
2. **Calidad medible:** la cobertura del módulo `presupuesto` debe ser como
   mínimo 90 % y no pueden quedar defectos críticos abiertos relacionados con
   cálculo o validación.

La luz verde del pipeline confirma estos criterios automatizados para un commit
concreto. No sustituye la validación de que el producto resuelva la necesidad
real del usuario.
