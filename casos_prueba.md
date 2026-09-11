# Casos de prueba

## Mapa conceptual

```mermaid
flowchart TD
    CALIDAD["Calidad del software"] --> ROLES["Roles operativos"]
    CALIDAD --> PRINCIPIOS["7 principios de testing"]
    CALIDAD --> CADENA["Origen y manifestación de problemas"]

    ROLES --> QA["QA: previene problemas al mejorar el proceso"]
    ROLES --> QC["QC: comprueba la calidad del producto"]
    QC --> TESTING["Testing: ejecuta pruebas para descubrir fallos"]

    PRINCIPIOS --> P1["1. Las pruebas muestran defectos, no garantizan su ausencia"]
    PRINCIPIOS --> P2["2. Probar todas las combinaciones es inviable"]
    PRINCIPIOS --> P3["3. Probar temprano reduce costos y retrabajo"]
    PRINCIPIOS --> P4["4. Los defectos suelen concentrarse en ciertas áreas"]
    PRINCIPIOS --> P5["5. Repetir siempre las mismas pruebas pierde efectividad"]
    PRINCIPIOS --> P6["6. Las pruebas dependen del contexto del sistema"]
    PRINCIPIOS --> P7["7. Un sistema sin fallos puede seguir sin satisfacer al usuario"]

    CADENA --> ERROR["Error: equivocación humana"]
    ERROR --> DEFECTO["Defecto: problema incorporado en el código"]
    DEFECTO --> FALLO["Fallo: comportamiento incorrecto observable"]
```

## Diseño y resultados del plan de pruebas

Los resultados esperados fueron definidos antes de ejecutar el programa. Los casos aplican partición de equivalencia y análisis de valores límite, sin utilizar la estructura interna del código para seleccionar las entradas.

| ID | Descripción | Precondición | Entrada | Esperado | Real | Estado |
|---|---|---|---|---|---|---|
| CP-01 | Calcular un presupuesto con datos válidos de la partición normal | Programa iniciado y entradas numéricas válidas | Presupuesto: `1000`; socios: `4`; meses: `3` | Intereses: `$60.00`; total: `$1060.00`; cuota: `$265.00` | Intereses: `$180.00`; total: `$1180.00`; cuota: `$295.00`. Terminó con código `0`. | **Failed** |
| CP-02 | Comprobar el límite inferior de la cantidad de socios | Programa iniciado y presupuesto y meses válidos | Presupuesto: `1000`; socios: `0`; meses: `3` | Mensaje controlado indicando que debe existir al menos un socio; sin cierre inesperado | El programa se detuvo con `ZeroDivisionError: float division by zero` y código `1`. | **Failed** |
| CP-03 | Comprobar una duración fuera de la partición válida | Programa iniciado y presupuesto y socios válidos | Presupuesto: `1000`; socios: `4`; meses: `-1` | Mensaje controlado indicando que los meses no pueden ser negativos; no realizar el cálculo | Aceptó `-1` y mostró intereses: `$20.00`; total: `$1020.00`; cuota: `$255.00`. Terminó con código `0`. | **Failed** |

## Justificación de las técnicas

- **CP-01 - Partición de equivalencia válida:** representa entradas normales que deberían producir un cálculo correcto.
- **CP-02 - Valor límite:** utiliza `0`, frontera inmediatamente inferior al mínimo lógico de un socio.
- **CP-03 - Partición de equivalencia inválida y valor límite:** utiliza `-1`, valor inmediatamente inferior al mínimo lógico de cero meses.

## Evidencia de ejecución

- **Fecha de ejecución:** 11 de septiembre de 2026.
- **Entorno:** Python 3.12.14.
- **Archivo probado:** `presupuesto_analisis.py`, SHA de contenido `5b24e5c88d75187e3992f15b7e37c6db8274b756`.
- **Método:** una ejecución independiente por caso, introduciendo los tres valores en el orden presupuesto, socios y meses.
- **Integridad:** el archivo bajo prueba no fue modificado durante ni después de las ejecuciones.

## Diagnóstico pendiente

En esta rama ya se registraron los fallos y veredictos. La inspección interna del código y la identificación de sus defectos se realizarán en la siguiente etapa del ciclo.

## Resumen

| Total ejecutado | Passed | Failed |
|---:|---:|---:|
| 3 | 0 | 3 |

Los tres casos revelaron fallos. Esto no significa que todo el programa haya sido probado ni que no existan otros defectos; únicamente confirma los comportamientos observados para estas entradas.
