# Taller de pruebas de caja negra

Repositorio académico para aplicar un proceso básico de aseguramiento y control de calidad sobre un sistema de análisis de presupuesto.

## Objetivo

Diseñar casos de prueba mediante técnicas de caja negra, ejecutarlos, comparar los resultados esperados con los reales y, únicamente después de observar los fallos, inspeccionar el código para localizar los defectos que los originan.

## Estructura

- `presupuesto_analisis.py`: código base entregado para la actividad. Sus defectos intencionales no se corrigen.
- `casos_prueba.md`: mapa conceptual y plan de tres casos de prueba.
- `.gitignore`: exclusiones del entorno local de Python.

## Ejecución

Se requiere Python 3.

```bash
python presupuesto_analisis.py
```

## Metodología

1. Comprender QA, QC, testing, los principios de ISTQB y la cadena Error → Defecto → Fallo.
2. Verificar que el código base se pueda ejecutar.
3. Diseñar los casos mediante partición de equivalencia y valores límite.
4. Ejecutar los casos y registrar resultados y estados.
5. Inspeccionar el código para localizar los defectos causantes.
6. Completar los desafíos conceptuales y auditar la entrega.

## Flujo de ramas

El ciclo de pruebas está conservado en tres ramas progresivas:

1. [`plan-pruebas`](../../tree/plan-pruebas): diseño de caja negra con resultados y estados todavía vacíos.
2. [`ejecucion-pruebas`](../../tree/ejecucion-pruebas): ejecución dinámica, resultados reales y veredictos, sin inspección interna.
3. [`diagnostico-defectos`](../../tree/diagnostico-defectos): análisis de caja blanca y localización de las causas raíz.

La rama `main` contiene la versión consolidada para la entrega. El código bajo prueba se mantiene sin correcciones en todas las etapas.

## Estado del proyecto

Los tres casos fueron diseñados, ejecutados y diagnosticados. Las ramas del flujo conservan cada estado del proceso y `main` presenta la documentación consolidada.

## Desafíos conceptuales

Las respuestas se completarán durante la fase de cierre, después de ejecutar y diagnosticar los casos de prueba.

### Desafío lógico 1

Pendiente.

### Desafío lógico 2

Pendiente.
