# Evidencia de integración continua

## Corrida verde

- **Rama:** `main`
- **Commit:** [`581c578`](https://github.com/Andr3sss/taller-caja-negra/commit/581c578c36839e462250c3c668b260a4a1709160)
- **Ejecución:** [GitHub Actions - resultado Success](https://github.com/Andr3sss/taller-caja-negra/actions/runs/34897814600)
- **Resultado esperado:** 8 pruebas Passed y cobertura del 100 %.
- **Interpretación:** el commit superó la suite y el umbral mínimo de cobertura en el runner configurado.

## Corrida roja por sabotaje

- **Rama:** `sabotaje-ci`
- **Commit:** [`126b4f6`](https://github.com/Andr3sss/taller-caja-negra/commit/126b4f681bde1b3eb0abd92bdb340e24f35fb39e)
- **Ejecución:** [GitHub Actions - resultado Failure](https://github.com/Andr3sss/taller-caja-negra/actions/runs/34897865707)
- **Sabotaje controlado:** la expectativa de intereses del caso feliz se cambió de `60.00` a `999.00`.
- **Resultado observado:** 7 pruebas Passed y 1 Failed. PyTest obtuvo `60.0` y esperaba `999.0`.
- **Interpretación:** el pipeline bloqueó correctamente una modificación incompatible con el comportamiento esperado.

El sabotaje permanece aislado en su rama. No debe fusionarse con `main`.

## Incidente de configuración detectado por CI

La primera versión del workflow activó la caché de pip sin indicar que el archivo se llama
`requirements-dev.txt`. `setup-python` buscó `requirements.txt` o
`pyproject.toml` y detuvo el pipeline antes de ejecutar PyTest.

El defecto se corrigió agregando:

```yaml
cache-dependency-path: requirements-dev.txt
```

Este incidente demuestra por qué la ejecución local y la ejecución en la nube se complementan:
las pruebas locales ya pasaban, pero el runner reveló una diferencia en la configuración del entorno.

## Guion de demostración

1. Abrir la corrida verde y mostrar que todos los pasos terminaron correctamente.
2. Explicar `ci_pipeline.yml`, en especial disparadores, versión de Python, caché, instalación y PyTest.
3. Abrir el commit de sabotaje y señalar la única línea alterada.
4. Abrir la corrida roja y mostrar el paso fallido y la comparación `60.0 != 999.0`.
5. Regresar a `main` y confirmar que la rama de entrega conserva el pipeline verde.
