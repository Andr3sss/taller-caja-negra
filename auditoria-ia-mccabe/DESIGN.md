---
name: Consulta
description: Agenda médica académica de apariencia clara y sobria.
colors:
  navy: "#102840"
  ink: "#18344e"
  muted: "#52677a"
  line: "#dbe4ec"
  wash: "#f4f7fa"
  white: "#fff"
  blue: "#164e82"
  error: "#8a2531"
  focus: "#3579b7"
  selection: "#cce2f5"
  field-border: "#a9b9c7"
  placeholder: "#5c7083"
  secondary-border: "#c7d3de"
  note-border: "#d0dce6"
  empty-icon: "#6b859c"
  confirmed-ink: "#184b3e"
  confirmed-bg: "#e7f2ec"
  cancelled-ink: "#4e6275"
  cancelled-bg: "#edf1f5"
  notice-bg: "#edf5f8"
  error-bg: "#fff2f3"
  primary-hover: "#204662"
  secondary-hover: "#e9eff5"
typography:
  headline:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "36px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "23px"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "16px"
    lineHeight: 1.5
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  control: "7px"
  notice: "10px"
  cancellation: "12px"
  booking: "14px"
  badge: "20px"
spacing:
  compact: "12px"
  control-group: "18px"
  inset: "24px"
  panel: "28px"
  section: "36px"
  workspace: "48px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 11px"
    width: "100%"
  booking-panel:
    backgroundColor: "{colors.wash}"
    rounded: "{rounded.booking}"
    padding: "28px"
  badge-confirmed:
    backgroundColor: "{colors.confirmed-bg}"
    textColor: "{colors.confirmed-ink}"
    rounded: "{rounded.badge}"
    padding: "3px 9px"
  badge-cancelled:
    backgroundColor: "{colors.cancelled-bg}"
    textColor: "{colors.cancelled-ink}"
    rounded: "{rounded.badge}"
    padding: "3px 9px"
---

# Design System: Consulta

## Overview

**Creative North Star: «Tu agenda, en orden.»** Se reutiliza el titular implementado como referencia descriptiva; no se añade una identidad creativa nueva.

Blanco dominante y azul marino oscuro, conforme a PRODUCT.md. El sistema prioriza lectura, acciones claras y controles amplios. La dirección existente aplica las guías de Impeccable y Emil mediante geometría funcional y estados explícitos.

**Key Characteristics:**

- Una sola familia tipográfica autoalojada.
- Paneles claros y filas separadas por líneas.
- Espacio generoso, indicadores textuales y movimiento breve.

Documento extraído de public/style.css, public/index.html, public/app.js y docs/design-direction.md. Inspección estática; no se verificó el render ni la interacción en navegador porque no había control de navegador disponible.

## Colors

### Primary

Marino para marca, títulos activos y acciones principales; azul para enlaces y acciones de texto. El azul de foco distingue la navegación por teclado.

### Neutral

Blanco como lienzo; lavado frío para reserva y confirmación de cancelación. Tinta para contenido principal, tono atenuado para ayuda y metadatos; líneas claras para dividir regiones y citas. Los tokens de borde de campo, nota y acción secundaria conservan sus usos específicos.

Los colores de confirmación, cancelación y error son semánticos: acompañan etiquetas de estado o mensajes, sin sustituir texto. La selección usa su fondo azul claro propio.

**The White and Navy Rule.** Mantener blanco y marino como identidad dominante; reservar verde y rojo para estados.

## Typography

**Display Font / Body Font:** Source Sans 3, con sans-serif de respaldo. Se sirve desde /assets/source-sans-3.ttf con rango variable (200–900) y font-display: swap.

### Hierarchy

- **Headline:** titular principal; baja a (30px) en móvil.
- **Title:** encabezados de sección; el título de agenda baja a (21px) en móvil.
- **Body:** texto general; la descripción del vacío limita la lectura a (40ch) y la introducción de reglas a (70ch).
- **Label:** etiquetas y botones. Metadatos y ayuda oscilan entre (12px) y (15px), según contexto.
- La marca usa (27px, 750), y (25px) en móvil. Fechas y horas emplean cifras tabulares; el día de cita usa (29px, 600).

## Layout

Contenedor principal centrado con máximo de (1320px), margen lateral interno de (5vw) y relleno vertical de (48px 70px). Cabecera de (88px). Área de trabajo en dos columnas: formulario de (340px) y agenda flexible, separadas por (48px).

A (950px) o menos: formulario de (300px), separación de (28px), filtros apilados y acciones de cita debajo de su contenido. A (700px) o menos: una columna con formulario primero, relleno principal de (32px 22px 48px), cabecera de (72px), pie vertical y filtros de dos columnas con selector de (135px). Las reglas también pasan a una columna.

## Elevation & Depth

Superficies planas: la jerarquía se establece mediante fondos claros, líneas y espacio. No hay sombras de elevación. La acción secundaria usa una sombra interior de un píxel como borde; su valor exacto queda en el sidecar.

## Shapes

Controles discretamente redondeados, panel de reserva más suave, aviso y panel de cancelación con radios intermedios. Las insignias son cápsulas. Las citas son filas sin contenedor elevado. Iconos SVG de línea con función informativa.

## Components

### Buttons

Acción principal marina y secundaria clara. Altura mínima de (44px); reserva ocupa todo el ancho. Las acciones de texto son azules y subrayadas. Hover de color solo para puntero fino con hover. Pulsación breve; teclado y movimiento reducido eliminan la transformación. Espera/deshabilitado usa opacidad (0.5) y cursor wait.

### Inputs / Fields

Fondo blanco, borde continuo de (1px), altura mínima de (44px). Foco visible común a controles y enlaces: contorno de (3px), desplazado (3px). Checkbox de (18px) dentro de etiqueta de altura mínima (44px). Los errores de servidor se presentan en un aviso; no hay variante visual de error individual por campo.

### Navigation

Pestañas de texto seminegrita, separadas por una línea inferior. La pestaña actual usa marino y subrayado de (2px), indicado además con aria-current. Enlace para saltar al contenido visible al recibir foco.

### Cards / Containers

Reserva sobre fondo lavado. La cancelación se abre dentro de su fila con relleno de (20px), sin modal. Avisos con texto y botón de cierre, con semántica status o alert según resultado.

### Chips / Appointment Rows

Insignias de (12px) con palabra de estado. Cada cita combina fecha tabular, nombre, profesional, horario y acción. Nombre largo admite salto de palabra. El vacío usa icono de calendario, título y explicación de la siguiente acción.

## Do's and Don'ts

### Do:

- **Do** mantener los tokens anteriores y Source Sans 3 autoalojada.
- **Do** conservar controles amplios, foco visible y estados de espera, vacío y error.
- **Do** verificar el render real antes de declarar aprobada la calidad visual.

### Don'ts:

- **Don't** introducir fotos ornamentales, gradientes, tarjetas anidadas o animaciones de entrada; la dirección vigente los excluye.
- **Don't** comunicar un estado únicamente mediante color.
- **Don't** añadir elevación decorativa a las filas de agenda.
