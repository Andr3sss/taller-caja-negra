# Semana 2 - Automatización y ciclo de pruebas

Esta carpeta amplía el taller inicial con pruebas automatizadas, cobertura,
CI/CD y documentación formal del STLC.

## Contenido

- `presupuesto.py`: lógica corregida y separada de la entrada por consola.
- `tests/test_presupuesto.py`: caso feliz, valores límite, división por cero
  e inputs negativos.
- `STLC.md`: relación de las tareas con el ciclo de vida de pruebas y
  criterios de entrada y salida.
- `ANALISIS.md`: respuestas a los tres dilemas conceptuales de la rúbrica.
- `GUIA_EXPOSICION.md`: demostración dividida entre Tester, Developer y Git
  Lead.
- `EVIDENCIA_CI.md`: enlaces y análisis de las corridas verde y roja.

El script original de la primera actividad permanece intacto en la raíz para
conservar la evidencia del diagnóstico anterior.

## Ejecución local

Desde la raíz del repositorio:

```bash
python -m pip install -r requirements-dev.txt
pytest
```

La configuración exige al menos 90 % de cobertura. Un resultado correcto debe
terminar con todas las pruebas en estado Passed.

## Integración continua

El workflow `.github/workflows/ci_pipeline.yml` se ejecuta ante cambios
enviados a cualquier rama y en los pull requests dirigidos a `main`. Sus pasos
son:

1. Descargar el commit.
2. Preparar Python 3.12 y caché de dependencias.
3. Instalar PyTest y pytest-cov.
4. Ejecutar las pruebas y comprobar el umbral de cobertura.

La rama `sabotaje-ci` se usa únicamente para demostrar una corrida roja. La
rama `main` conserva el resultado verde y es la versión válida para entregar.
