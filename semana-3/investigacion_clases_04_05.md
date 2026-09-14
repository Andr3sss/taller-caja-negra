# Fundamentos matemáticos y arquitectónicos del aseguramiento de calidad

Este documento reúne el trabajo de investigación correspondiente a las clases 04 y 05. El contenido está organizado en cinco actividades que conectan los niveles de prueba, las estrategias de integración, la partición de equivalencia y su aplicación en un caso bancario.

> **Estado del documento:** estructura inicial preparada. Cada sección se desarrollará y revisará durante las siguientes fases de trabajo.

## 1. Taxonomía de niveles de prueba

Un nivel de prueba agrupa actividades que se organizan y administran en conjunto sobre un objeto de prueba concreto. Ese objeto cambia a medida que avanza el desarrollo: primero se revisan piezas aisladas, después sus conexiones y, por último, el producto completo frente a sus especificaciones y a las necesidades de quienes lo van a utilizar [1], [2].

La clasificación tradicional reúne cuatro niveles: pruebas unitarias o de componentes, integración, sistema y aceptación. ISTQB v4.0.1 presenta una precisión adicional: divide la integración en *Component Integration Testing* y *System Integration Testing*. Por eso, en la matriz se conserva el nivel general de integración pedido en la actividad, pero la diferencia entre sus dos alcances se desarrolla por separado en la sección 1.3 [2].

### 1.1 Definición de los niveles de prueba

#### Pruebas unitarias o de componentes

Se concentran en una unidad de software aislada, como una función, clase, módulo o servicio pequeño. Su propósito es comprobar que la lógica interna del componente funciona de acuerdo con su diseño. Normalmente las ejecuta el desarrollador en su propio entorno, con un framework de pruebas unitarias o un arnés de prueba que permita controlar las dependencias [2].

#### Pruebas de integración

Evalúan las interfaces y las interacciones que aparecen cuando dos o más elementos empiezan a trabajar juntos. No buscan repetir la lógica interna que ya se revisó en cada componente. Buscan problemas en el intercambio de datos, el orden de las llamadas, los contratos de las interfaces y la comunicación entre dependencias. Su alcance puede estar dentro del sistema, entre componentes, o cruzar el límite del producto para conectarlo con otros sistemas y servicios externos [2].

#### Pruebas de sistema

Comprueban el comportamiento y las capacidades del sistema completo e integrado. Incluyen recorridos funcionales de extremo a extremo y también características no funcionales, como rendimiento, seguridad, confiabilidad o usabilidad. La referencia principal ya no es el código de una pieza concreta, sino las especificaciones y los requisitos definidos para todo el sistema. Lo habitual es ejecutarlas en un ambiente representativo y, cuando el proyecto lo permite, con un equipo de pruebas independiente [2].

#### Pruebas de aceptación

Determinan si el producto responde a las necesidades del negocio y si está listo para desplegarse o ponerse en operación. Aquí el interés no está solamente en comprobar que una función coincide con una especificación técnica. También se revisa si el sistema permite completar los procesos reales para los que fue creado. Por esa razón, lo ideal es que participen usuarios previstos, representantes del negocio u otros responsables de aceptar formalmente la solución [2].

### 1.2 Matriz comparativa

| Nivel | Objeto de prueba | Base de prueba | Defectos típicos buscados | Rol responsable | Entorno de ejecución |
|---|---|---|---|---|---|
| Pruebas unitarias o de componentes | Funciones, clases, módulos o componentes aislados. | Código fuente, diseño detallado y especificación del componente. | Errores de lógica, cálculos incorrectos, condiciones límite mal implementadas, fallos en flujos de control y manejo local de datos. | Desarrollador. | Entorno de desarrollo con framework unitario, dobles de prueba o arnés de prueba. |
| Pruebas de integración | Interfaces e interacciones entre componentes internos o entre el sistema y dependencias externas. | Arquitectura, diseño de interfaces, contratos de API, modelos de datos y flujos de comunicación. | Formatos incompatibles, contratos incumplidos, secuencias erróneas, pérdida de datos, fallos de protocolo, tiempo de espera y manejo incorrecto de errores entre elementos. | Desarrolladores o equipo de integración; en integraciones de sistema puede intervenir un equipo de pruebas independiente. | Entorno de integración continua con *stubs* o *drivers*; para integraciones externas, un ambiente cercano al operativo. |
| Pruebas de sistema | Sistema o producto completo e integrado. | Requisitos del sistema, casos de uso, especificaciones funcionales y no funcionales y análisis de riesgos. | Funciones ausentes o incorrectas, fallos en recorridos de extremo a extremo e incumplimientos de rendimiento, seguridad, confiabilidad o usabilidad. | Equipo de pruebas, preferiblemente independiente. | Entorno de pruebas o *staging* representativo del ambiente de operación. |
| Pruebas de aceptación | Producto completo y procesos de negocio que debe soportar. | Necesidades del usuario, requisitos de negocio, criterios de aceptación, contratos, regulaciones y procedimientos operativos. | Procesos que no cubren la necesidad real, reglas de negocio incorrectas, problemas de usabilidad y falta de preparación operativa o contractual. | Usuarios previstos, cliente, representantes del negocio, personal operativo o autoridad reguladora, según el tipo de aceptación. | Entorno de aceptación similar al productivo; también puede utilizarse un piloto o un ambiente controlado de producción. |

La matriz usa los atributos que ISTQB propone para distinguir los niveles: objeto, objetivos y base de prueba, defectos esperados, enfoque y responsabilidades [2]. El entorno se añade porque la actividad lo exige y porque cambia de forma clara entre una unidad aislada y un sistema conectado con servicios reales.

### 1.3 Component Integration Testing y System Integration Testing

La diferencia técnica exacta está en la frontera arquitectónica que atraviesa la prueba:

- **Component Integration Testing** comprueba interfaces e interacciones entre componentes que forman parte del sistema en construcción. Puede revisar, por ejemplo, la comunicación entre el módulo que recibe una solicitud de crédito y el componente interno que calcula el riesgo. Como el sistema todavía puede estar incompleto, es común reemplazar dependencias con *stubs*, *drivers*, simuladores o dobles de prueba.
- **System Integration Testing** toma al sistema completo como objeto de prueba y revisa sus interfaces con otros sistemas o servicios externos. En el mismo caso bancario, comprobaría la comunicación entre la plataforma de créditos y el servicio externo de un buró crediticio. Aquí cobran más peso la autenticación, los protocolos, los contratos de API, las redes, los tiempos de respuesta y la compatibilidad entre organizaciones o plataformas [2].

Dicho de una forma directa: la primera prueba cruza fronteras **internas entre componentes**; la segunda cruza la frontera **externa del sistema**. En ambos casos se evalúa integración, pero cambian el objeto, las dependencias y el ambiente necesario. ISTQB señala que la integración de componentes depende bastante de la estrategia elegida, mientras que la integración de sistemas necesita un entorno adecuado y, de preferencia, parecido al operativo [2].

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

[1] ISO/IEC/IEEE, “ISO/IEC/IEEE 29119-1:2022, Software and systems engineering—Software testing—Part 1: General concepts,” 2nd ed., Jan. 2022. [Online]. Available: https://www.iso.org/standard/81291.html. [Accessed: Sep. 14, 2026].

[2] International Software Testing Qualifications Board, “Certified Tester Foundation Level Syllabus,” ver. 4.0.1, Sep. 15, 2024. [Online]. Available: https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf. [Accessed: Sep. 14, 2026].

[3] Referencia académica sobre pruebas de software por completar.
