# Fundamentos matemáticos y arquitectónicos del aseguramiento de calidad

Este documento reúne el trabajo de investigación correspondiente a las clases 04 y 05. El contenido está organizado en cinco actividades que conectan los niveles de prueba, las estrategias de integración, la partición de equivalencia y su aplicación en un caso bancario.

> **Estado del documento:** estructura inicial preparada. Cada sección se desarrollará y revisará durante las siguientes fases de trabajo.

## 1. Taxonomía de niveles de prueba

### 1.1 Definición de los niveles de prueba

En esta sección se desarrollarán, con base en ISO/IEC/IEEE 29119 e ISTQB v4.0, los cuatro niveles solicitados:

- Pruebas unitarias o de componentes.
- Pruebas de integración.
- Pruebas de sistema.
- Pruebas de aceptación.

### 1.2 Matriz comparativa

| Nivel | Objeto de prueba | Base de prueba | Defectos típicos buscados | Rol responsable | Entorno de ejecución |
|---|---|---|---|---|---|
| Pruebas unitarias o de componentes | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar |
| Pruebas de integración | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar |
| Pruebas de sistema | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar |
| Pruebas de aceptación | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar | Por desarrollar |

### 1.3 Component Integration Testing y System Integration Testing

En este apartado se responderá la siguiente pregunta desde una perspectiva técnica y arquitectónica:

> ¿Qué diferencia exacta existe entre *Component Integration Testing* y *System Integration Testing*?

## 2. Estrategias de integración y análisis de verificación y validación

### 2.1 Riesgos del enfoque Big Bang

Aquí se explicarán tres razones técnicas por las que Myers y Pressman consideran que el enfoque *Big Bang* representa una estrategia de integración riesgosa.

1. Primera razón técnica: por desarrollar.
2. Segunda razón técnica: por desarrollar.
3. Tercera razón técnica: por desarrollar.

### 2.2 Verificación y validación

En esta sección se explicará por qué una prueba de sistema evalúa la **verificación**, mientras que una prueba de aceptación del usuario o UAT evalúa la **validación**. La explicación incluirá un ejemplo concreto para mostrar la diferencia.

### 2.3 Comparación de estrategias incrementales

| Estrategia | Forma de integración | Ventajas | Desventajas | Elementos auxiliares |
|---|---|---|---|---|
| Top-Down | Por desarrollar | Por desarrollar | Por desarrollar | Uso de *stubs* |
| Bottom-Up | Por desarrollar | Por desarrollar | Por desarrollar | Uso de *drivers* |
| Sandwich | Por desarrollar | Por desarrollar | Por desarrollar | Uso combinado de *stubs* y *drivers* |

## 3. Matemáticas de la partición de equivalencia

### 3.1 Relación de equivalencia

En este apartado se presentará la definición matemática de una relación de equivalencia aplicada al dominio de datos de entrada, según Jorgensen. La explicación considerará sus propiedades reflexiva, simétrica y transitiva.

### 3.2 Clases de equivalencia válidas e inválidas

Aquí se explicará la diferencia fundamental entre las clases que representan entradas aceptadas por la especificación y aquellas que representan entradas rechazadas.

### 3.3 Failure masking o enmascaramiento de fallos

Esta sección desarrollará una demostración teórica del *failure masking* y responderá por qué no se deben evaluar varias entradas inválidas dentro de un mismo caso de prueba.

### 3.4 Cobertura de particiones de equivalencia

La cobertura se calculará con la fórmula solicitada:

$$
\text{Cobertura} =
\frac{\text{Número de Particiones de Equivalencia Cubiertas}}
{\text{Número Total de Particiones de Equivalencia Identificadas}}
\times 100
$$

## 4. Ingeniería de especificaciones: caso bancario

### 4.1 Especificación fija del sistema

El caso corresponde a un sistema de aprobación de créditos sin implementación de código. Se trabajará con los siguientes parámetros inmutables:

| Variable | Especificación |
|---|---|
| Edad | De 18 a 75 años |
| Ingreso neto | De USD 500 a USD 10.000 |
| Scoring crediticio | De 300 a 850 |
| DTI (*Debt-to-Income*) | Máximo 40% |

### 4.2 Supuestos de diseño

En esta sección se declararán los criterios necesarios para interpretar los límites de cada variable, incluidos sus extremos y el límite inferior asumido para el DTI.

### 4.3 Identificación de particiones

| Variable | Partición | Tipo de partición | Condición | Valor representativo |
|---|---|---|---|---|
| Edad | Por desarrollar | Válida o inválida | Por desarrollar | Por desarrollar |
| Ingreso neto | Por desarrollar | Válida o inválida | Por desarrollar | Por desarrollar |
| Scoring crediticio | Por desarrollar | Válida o inválida | Por desarrollar | Por desarrollar |
| DTI | Por desarrollar | Válida o inválida | Por desarrollar | Por desarrollar |

### 4.4 Conjunto mínimo de casos de prueba

| ID | Edad | Ingreso neto | Scoring crediticio | DTI | Partición cubierta | Resultado esperado |
|---|---:|---:|---:|---:|---|---|
| CP-01 | Por definir | Por definir | Por definir | Por definir | Por desarrollar | Por desarrollar |

### 4.5 Comprobación de cobertura

Aquí se comprobará que el conjunto diseñado cubra el 100% de las particiones identificadas, con la menor cantidad posible de casos y sin combinar entradas inválidas que puedan ocultar fallos.

## 5. Síntesis metacognitiva y estándares de referencia

### 5.1 Partición de equivalencia y principio 2 de ISTQB

En esta reflexión se explicará cómo la partición de equivalencia permite aplicar el principio de ISTQB que afirma que el testing exhaustivo es imposible.

### 5.2 Pruebas unitarias y fallos de integración

Esta reflexión responderá por qué obtener un 100% de éxito en las pruebas unitarias no garantiza que el sistema esté libre de fallos cuando sus componentes se integran.

## Referencias

Las fuentes académicas se incorporarán en formato IEEE y se relacionarán con citas numeradas dentro del texto. La versión final incluirá al menos tres referencias; también se revisará que cada cita respalde de manera directa la afirmación correspondiente.

[1] Referencia sobre ISO/IEC/IEEE 29119 por completar.

[2] Referencia oficial de ISTQB v4.0 por completar.

[3] Referencia académica sobre pruebas de software por completar.
