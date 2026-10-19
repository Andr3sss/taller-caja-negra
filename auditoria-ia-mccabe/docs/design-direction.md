# Dirección de diseño
Modo: Operate. Pantalla de gestión de citas para el ejercicio académico.
Blanco dominante, tinta azul marino, panel lateral claro para nueva reserva y agenda en filas separadas por líneas. Una familia tipográfica: Source Sans 3, autoalojada. No usar fotos ornamentales, gradientes, tarjetas anidadas ni animaciones de entrada. Los SVG son geometría funcional, no ilustraciones simuladas.
Controles de 44px; foco visible, estados de espera y error, vacíos explicativos. Transición de pulsación de 140ms con curva ease-out; sin movimiento con teclado ni reduced-motion. Quiebre estructural en 950px y 700px; formulario encima de agenda en móvil.
PDF: fondo blanco, títulos azul marino, tablas claras, diagramas exactos y código legible.
Repositorios leídos el 19/10/2026:
- pbakaus/impeccable: 46b822f7dda9f7dba799a9c7776fdc19b3a93559, skill y referencias new-work, craft-floor, operate, document.
- emilkowalski/skills: 2d228630ba1446365f614a108cb8252f1feda202, emil-design-eng.
La inspección estática de Impeccable detectó un texto de 11px. Se corrigió a 12px. No se dispone de control-browser para verificar el render del frontend; las pruebas de estado se ejecutan en Node VM, no sustituyen una prueba visual ni de interacción con Alpine en navegador.
