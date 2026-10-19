# Consulta · Auditoría de IA con McCabe y cobertura

Entrega de Andrés Quisilema. UIDE. 19 de octubre de 2026.

## Ejecutar

Instala **Node.js 24 o superior**. Desde esta carpeta:

```bash
npm ci
npm start
```

Abre **http://localhost:3000**. No abras public/index.html directamente: necesita la API. Alpine y la tipografía se sirven localmente; una vez instaladas las dependencias, la aplicación no necesita CDN. Detén el servidor con Ctrl+C.

SQLite se crea automáticamente en `data/citas.sqlite`. Cierra el programa y borra ese archivo si quieres reiniciar la demostración. Se conserva la agenda al reiniciar. No se incluyen pacientes precargados. Los nombres de profesionales son ficticios. Usa datos ficticios.

## Contenido

- `Informe_Auditoria_McCabe.pdf`: desarrollo y resultados del taller.
- `docs/INFORME.md`: informe en texto editable.
- `src/`: backend Express y reglas; SQLite integrado de Node.
- `public/`: interfaz Alpine.js, blanco y azul marino oscuro.
- `tests/`: pruebas unitarias, de API y del modelo de estado de la interfaz.
- `evidence/`: salidas originales, cobertura HTML/JSON, complejidad y mutaciones.
- `docs/penalty-cfg.svg`: grafo de control exacto.
- `PRODUCT.md`, `DESIGN.md`, `docs/design-direction.md`: criterios de producto y diseño.

## Reglas y supuestos explícitos

El PDF solicita edad, horario, choque de citas y penalización tardía, pero no fija todos los valores. Para volverlo ejecutable se adoptan estos supuestos académicos:

| Regla | Decisión del ejercicio |
| --- | --- |
| Edad | Entera de 0 a 120. Pediatría: 0–17; adultos: 18–120. |
| Atención | Lunes a viernes, 08:00–12:00 y 13:00–17:00. |
| Duración | 30 minutos; inicia a las :00 o :30. Último inicio 16:30. |
| Zona horaria | Quito, UTC−05:00. El cliente envía hora local; el servidor guarda milisegundos UTC. |
| Choques | Se impide cualquier solapamiento entre citas activas del mismo profesional. Intervalos [inicio, fin). |
| Cancelación | Antes del inicio. Tardía si faltan estrictamente menos de 24 horas. |
| Cargo | USD 10 (1000 centavos) por tardía sin emergencia. Una emergencia exime el cargo. |
| Frontera | Exactamente 24 horas: sin cargo. Cita ya iniciada: se rechaza cancelar. |

## Validar

```bash
npm test
npm run test:coverage
npm run test:naive
npm run test:mutations
npm run audit:complexity
```

Resultados de esta entrega: **82/82 pruebas**, **5/5 mutaciones detectadas**, **V(G)=3** en penalización y máximo estructural **9** entre las funciones backend analizadas. `test:naive` pasa deliberadamente sin comprobar resultados; se mantiene separado de la suite estricta. Cada ejecución de mutaciones verifica que la suite original pase y que los mutantes fallen por aserciones, no por errores de infraestructura.

Abre `evidence/coverage/index.html` y `evidence/naive-coverage/index.html` para comparar. Jest usa `coverageProvider: v8`; no se ejecutó c8 por separado. El 100 % de ramas que informe V8 no certifica MC/DC ni calidad de los oráculos. Las tres pruebas base se encuentran exclusivamente en `tests/penalty.test.cjs`; las otras pruebas amplían fronteras e integración.

## API

| Método | Ruta | Función |
| --- | --- | --- |
| GET | /api/doctors | Catálogo de profesionales. |
| GET | /api/appointments | Agenda ordenada. |
| POST | /api/appointments | Reserva: patient, age, doctor, start (YYYY-MM-DDTHH:mm). |
| POST | /api/appointments/:id/cancel | Cancela: emergency, booleano obligatorio. |

Ejemplo de cuerpo de reserva (usa una fecha futura y hábil al probar):

```json
{"patient":"Paciente de prueba","age":20,"doctor":"adulta","start":"2026-10-20T09:00"}
```

## Comprobación manual de la interfaz

1. Reserva una cita futura válida; debe aparecer confirmada y persistir al recargar.
2. Repite el mismo profesional y horario: debe rechazarla sin duplicar registros.
3. Prueba 17 y 18 años, un fin de semana y las 12:00.
4. Busca el nombre y combina filtros de estado.
5. Abre Cancelar cita, revisa la estimación, cambia emergencia y confirma. Comprueba el cargo y que el espacio pueda volver a reservarse.
6. Prueba con teclado, a 390px y 1440px, ampliación 200 %, nombres largos, error de red y reduced-motion.

Esta lista queda pendiente de ejecución visual en navegador: no hubo control-browser disponible. Las pruebas frontend ejecutan el modelo de estado en Node VM; no verifican el motor de Alpine, layout, contraste computado ni interacción real en navegador. No se afirma validación visual completa.

## Alcance

Aplicación local académica sin autenticación ni pagos. El cargo se registra, no se cobra. La prueba de peticiones concurrentes usa una instancia Express y una base en memoria; la transacción y el índice protegen reservas, pero no se hizo una prueba de carga con procesos múltiples. La cobertura excluye server.cjs, dependencias, public/ y scripts; frontend tiene pruebas de estado separadas. La función del reloj predeterminado queda sin ejecutar: se inyecta un reloj fijo para pruebas reproducibles. No se desplegó en hosting para conservar el backend Express/SQLite local solicitado.

## Diseño y procedencia

Se consultaron y aplicaron las guías de estos commits, sin ejecutar instrucciones ajenas al diseño del producto:

- https://github.com/pbakaus/impeccable/tree/46b822f7dda9f7dba799a9c7776fdc19b3a93559
- https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202

Source Sans 3: Google Fonts, SIL Open Font License, incluida en `public/assets/OFL.txt`. No se redistribuyen los repositorios de referencia.
