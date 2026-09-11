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

**Estado final: FINALIZADO**  
**Fecha de cierre técnico: 11 de septiembre de 2026**

Los tres casos fueron diseñados, ejecutados y diagnosticados. Las ramas del flujo conservan cada estado del proceso y `main` presenta la documentación consolidada. El sistema bajo prueba permanece sin correcciones, tal como exige la actividad.

## Desafíos conceptuales

### Desafío lógico 1

**¿Es posible que un defecto exista durante años sin causar un fallo?**

Sí. Un defecto puede permanecer dentro del código durante mucho tiempo sin producir un fallo observable si nunca se ejecuta la ruta que lo contiene o si no se presentan las entradas, condiciones del entorno o estados necesarios para activarlo. El defecto pertenece al producto, mientras que el fallo es la manifestación externa que aparece al ejecutar el software bajo determinadas condiciones.

En este programa, por ejemplo, la división de la línea 12 contiene un defecto porque no valida que la cantidad de socios sea mayor que cero. Mientras los usuarios introduzcan valores positivos, esa condición no se activa y el programa puede parecer correcto. Cuando se introduce `0`, el defecto se manifiesta como un `ZeroDivisionError`. Por eso las pruebas pueden demostrar la presencia de defectos, pero no garantizar que no existan otros.

### Desafío lógico 2

**¿Qué principio se viola si el programa funciona perfectamente, pero resuelve una necesidad distinta de la solicitada?**

Se viola el séptimo principio de testing de ISTQB, conocido como la **falacia de ausencia de errores**. Corregir todos los defectos y conseguir que las pruebas técnicas pasen no aporta valor si el sistema construido no satisface la necesidad real del cliente.

En ese escenario, el equipo habría realizado correctamente la **verificación**, porque el software fue construido de acuerdo con su especificación técnica, pero habría fallado en la **validación**, porque se construyó un sistema de presupuestos cuando el cliente necesitaba uno de nóminas. Un producto técnicamente correcto también debe ser el producto adecuado para el usuario.

## Auditoría final

| Criterio solicitado | Resultado | Evidencia |
|---|---|---|
| Repositorio estrictamente público | Cumple | Visibilidad pública confirmada en GitHub |
| Código base conservado como fue entregado | Cumple | `presupuesto_analisis.py` mantiene el SHA `5b24e5c88d75187e3992f15b7e37c6db8274b756` |
| Archivo `casos_prueba.md` presente | Cumple | Disponible en la rama `main` |
| Mapa conceptual incluido | Cumple | Diagrama Mermaid al inicio de `casos_prueba.md` |
| Tres casos ejecutados con resultado y estado | Cumple | CP-01, CP-02 y CP-03 tienen resultado real y estado `Failed` |
| Defectos y líneas responsables documentados | Cumple | Reportes individuales incluidos después de la tabla |
| Respuestas a los dos desafíos en el README | Cumple | Sección de desafíos conceptuales completada |
| Participación de todos los integrantes | Requiere confirmación humana | Debe confirmarlo el equipo antes de entregar |

### Resultado de la auditoría

La entrega cumple todos los criterios técnicos verificables. Antes de enviar el enlace al profesor, el equipo debe confirmar únicamente que todos sus integrantes participaron y observaron las actividades.
