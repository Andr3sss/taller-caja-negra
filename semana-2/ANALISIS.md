# Análisis metacognitivo

## 1. ¿Qué aporta ejecutar las pruebas en la nube frente a ejecutarlas solo localmente?

La ejecución local sigue siendo útil porque entrega retroalimentación rápida al
desarrollador. Sin embargo, depende de la configuración de su computadora y una
prueba podría pasar gracias a una dependencia instalada manualmente o a un
archivo que no fue enviado al repositorio.

GitHub Actions ejecuta el mismo procedimiento en un entorno nuevo y controlado
cada vez que se realiza un `push` o un `pull request`. Esto permite comprobar
que las dependencias declaradas son suficientes, centraliza la evidencia y hace
que el resultado sea visible para todo el equipo. La nube no reemplaza las
pruebas locales: ambas se complementan. Primero se obtiene velocidad local y
después reproducibilidad y trazabilidad en CI.

## 2. ¿Qué significa realmente que el pipeline tenga luz verde?

La luz verde significa que, para el commit evaluado y dentro del entorno
configurado, todos los pasos del YAML terminaron correctamente: se instaló el
proyecto, PyTest no encontró aserciones fallidas y se alcanzó el umbral de
cobertura. Es evidencia objetiva de que la versión superó esa suite.

No significa que el programa esté libre de defectos. Pueden faltar escenarios,
existir requisitos mal entendidos o presentarse condiciones diferentes en
producción. El pipeline solo puede evaluar las reglas que fueron automatizadas.
Por eso debe interpretarse como una condición necesaria de calidad, no como una
garantía absoluta.

## 3. ¿Qué hacer con los criterios de salida cuando existe presión por entregar?

La presión de tiempo no debería convertir los criterios de salida en una
formalidad. Primero se revisa qué criterio no se cumple y cuál es el riesgo:
impacto en usuarios, probabilidad de ocurrencia y capacidad de recuperación. Un
fallo crítico en el cálculo o una división por cero bloquean la entrega porque
afectan la función principal.

Si el riesgo es menor y el responsable del proyecto decide aceptar la entrega,
la excepción debe quedar documentada con su evidencia, alcance, responsable y
plan de corrección. Así la decisión es consciente y trazable. Lo incorrecto
sería cambiar el criterio después de ver un resultado rojo o presentar el
pipeline como exitoso ocultando pruebas fallidas.
