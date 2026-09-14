# Guía breve para la exposición

## Distribución por roles

| Rol | Responsabilidad durante la demostración |
|---|---|
| Tester | Explica el caso feliz, valores límite, división por cero, entradas negativas y las aserciones de PyTest. |
| Developer | Explica las validaciones y el cálculo de interés simple en `presupuesto.py`. |
| Git Lead | Presenta las ramas, los commits, el YAML y las corridas verde y roja en GitHub Actions. |

## Secuencia sugerida

1. Mostrar la estructura de `semana-2/` y explicar el STLC.
2. Ejecutar `pytest` y señalar la cobertura obtenida.
3. Abrir `.github/workflows/ci_pipeline.yml` y explicar cada paso.
4. Mostrar una corrida verde de `main`.
5. Abrir la corrida roja de `sabotaje-ci`, identificar la aserción alterada y
   aclarar que el sabotaje está aislado de la entrega.
6. Cerrar con el significado real de la luz verde y los criterios de salida.

La presentación debe repartirse entre los tres roles. Conviene ensayar el cambio
de expositor y evitar que una sola persona realice toda la demostración.
