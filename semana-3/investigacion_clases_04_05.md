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

La integración permite comprobar algo que una prueba aislada no puede mostrar: qué ocurre cuando las partes empiezan a depender unas de otras. Myers distingue dos caminos generales. El primero reúne todos los componentes de una sola vez; el segundo construye el sistema mediante incrementos que se prueban a medida que se incorporan [3]. Pressman también favorece la integración incremental porque permite trabajar con grupos controlados de componentes y revisar sus interfaces paso a paso [4].

### 2.1 Riesgos del enfoque Big Bang

En *Big Bang*, los componentes que ya fueron probados por separado se unen prácticamente al mismo tiempo y después se intenta probar el sistema integrado. Esta estrategia puede parecer rápida porque evita planificar varios incrementos, pero traslada el esfuerzo al momento más difícil: cuando muchas interfaces nuevas empiezan a fallar a la vez. Los tres riesgos técnicos principales son los siguientes [3], [4]:

1. **El origen de un fallo queda difícil de aislar.** Si se integran muchos componentes en un solo cambio, una falla observable puede venir de cualquiera de sus interfaces, de una combinación de llamadas o de datos que atraviesan varios módulos. No existe un último incremento pequeño que sirva para acotar la búsqueda. El equipo termina revisando una zona amplia del sistema antes de encontrar la causa.

2. **Los defectos de interfaz aparecen demasiado tarde.** Un componente puede superar sus pruebas unitarias y, aun así, usar un formato, una secuencia o una interpretación distinta a la de sus dependencias. Cuando estas incompatibilidades se descubren al final, la corrección suele afectar más de un módulo y obliga a repetir pruebas sobre una construcción grande. El costo de retrabajo y el riesgo para el calendario aumentan.

3. **No se obtiene una base integrada y estable de forma progresiva.** La prueba completa depende de que todos los componentes necesarios estén disponibles y funcionen lo suficiente para ejecutar un recorrido. Si uno bloquea el sistema, también bloquea la observación de otros. Además, varios equipos pueden corregir partes diferentes sobre una base inestable, haciendo más difícil saber si un cambio resolvió el problema original o introdujo otro.

Estas razones no significan que *Big Bang* sea imposible de usar. En una solución muy pequeña podría ser manejable. Sin embargo, a medida que crecen el número de componentes y sus dependencias, la falta de incrementos controlados vuelve el diagnóstico mucho menos preciso.

### 2.2 Verificación y validación

La **verificación** responde a la pregunta: “¿el sistema cumple lo que fue especificado?”. En las pruebas de sistema, el producto completo se compara con sus requisitos funcionales y no funcionales. Se revisan funciones de extremo a extremo y características como rendimiento, seguridad o usabilidad, siempre tomando como referencia la especificación del sistema [2].

La **validación** responde a otra pregunta: “¿el sistema resuelve la necesidad real para la que fue construido?”. Las pruebas de aceptación, incluida UAT, se concentran en las necesidades del negocio y en demostrar que el producto está listo para utilizarse o desplegarse. ISTQB indica que, idealmente, estas pruebas deben ser realizadas por los usuarios previstos [2].

Un ejemplo permite ver la diferencia. Supongamos que la especificación de una plataforma bancaria indica que una solicitud con datos válidos debe calcular el nivel de riesgo y mostrar una decisión en menos de tres segundos. Durante la prueba de sistema, el equipo comprueba ese flujo, mide el tiempo y confirma si el resultado coincide con las reglas documentadas. Eso es verificación.

Luego, un analista de crédito utiliza la plataforma en una prueba UAT. Aunque el cálculo sea correcto y tarde menos de tres segundos, descubre que la pantalla no muestra la razón del rechazo y que, sin ese dato, no puede explicar la decisión al cliente ni completar su proceso de trabajo. La especificación técnica evaluada puede haberse cumplido, pero la necesidad operativa todavía no. Esa observación pertenece a la validación.

Por lo tanto, verificación y validación no compiten entre sí. Una aporta evidencia de conformidad con lo especificado; la otra confirma que el producto resulta útil y adecuado para su propósito real.

### 2.3 Comparación de estrategias incrementales

A diferencia de *Big Bang*, las estrategias incrementales agregan componentes en grupos controlados. Cada incremento crea una base que puede probarse antes de incorporar el siguiente, lo que reduce el área que debe revisarse cuando aparece un fallo [3], [4].

| Estrategia | Forma de integración | Ventajas | Desventajas | Elementos auxiliares |
|---|---|---|---|---|
| Top-Down | Empieza por los módulos superiores que controlan el sistema y avanza hacia los niveles inferiores. Puede seguir una ruta en profundidad o integrar por niveles. | Permite revisar pronto la arquitectura, la navegación y los flujos principales. También ofrece una estructura funcional temprana y facilita localizar defectos en cada incremento. | Los módulos inferiores tardan en probarse con componentes reales. Crear muchos reemplazos puede ser costoso y algunas funciones de bajo nivel quedan simuladas durante buena parte del proceso. | Usa *stubs* para representar temporalmente los componentes inferiores que todavía no están disponibles. |
| Bottom-Up | Comienza con los componentes de nivel bajo, los reúne en grupos funcionales y avanza hacia los módulos superiores que los coordinan. | Prueba pronto servicios básicos, cálculos, acceso a datos y utilidades reales. Reduce la necesidad de *stubs* y facilita observar resultados en los niveles inferiores. | Los flujos completos y la lógica de control principal aparecen tarde. Tampoco ofrece una versión temprana del sistema visible desde su capa superior. | Usa *drivers* para invocar los grupos inferiores, enviarles datos y observar sus respuestas mientras faltan los módulos superiores. |
| Sandwich | Integra al mismo tiempo desde la parte superior y desde la inferior hasta que ambos recorridos se encuentran en una capa intermedia. | Permite trabajar en paralelo, revisar temprano la arquitectura superior y comprobar servicios inferiores con componentes reales. Puede acortar el tiempo de integración en sistemas por capas. | Exige más coordinación y una arquitectura bien definida. La capa intermedia puede concentrar complejidad, y el equipo debe mantener reemplazos en ambos sentidos. | Combina *stubs* para las dependencias inferiores aún ausentes y *drivers* para los componentes que todavía no tienen un controlador superior. |

Top-Down y Bottom-Up no indican que una estrategia sea siempre mejor que la otra. La elección depende de dónde se concentran los riesgos, qué componentes están disponibles y qué parte del sistema necesita evidencia temprana. Sandwich puede equilibrar ambos recorridos, pero esa ventaja solo aparece cuando el equipo coordina bien el punto en el que las dos líneas de integración se encuentran [4].

## 3. Matemáticas de la partición de equivalencia

La partición de equivalencia es una técnica de caja negra: organiza los posibles datos de entrada en grupos cuyos elementos deberían recibir un tratamiento equivalente. Así se reduce el número de pruebas sin elegir valores al azar. La idea no es probar menos por descuido, sino escoger representantes de clases que tengan una razón común [2], [5].

### 3.1 Relación de equivalencia

Sea (D) el dominio de datos de entrada de un elemento del sistema. Una relación (\sim) sobre (D) es una relación de equivalencia cuando cumple estas tres propiedades:

1. **Reflexividad:** para todo (x \in D), se cumple (x \sim x).
2. **Simetría:** para cualesquiera (x,y \in D), si (x \sim y), entonces (y \sim x).
3. **Transitividad:** para cualesquiera (x,y,z \in D), si (x \sim y) y (y \sim z), entonces (x \sim z).

A partir de esa relación, la clase de equivalencia de un valor (x) se define como:

$$
[x] = \{y \in D \mid y \sim x\}
$$

La colección de todas las clases forma una partición del dominio:

$$
D/\sim = \{[x] \mid x \in D\}
$$

Eso significa que las clases no se superponen y que, juntas, cubren el dominio completo. En pruebas de software, dos valores pertenecen a la misma clase cuando se espera que el objeto de prueba los procese de la misma manera. Por eso, si un valor representativo descubre un defecto que depende de esa clase, se espera que otros valores de la misma clase puedan revelar el mismo problema [2], [5].

Esta formulación también aclara un límite práctico: la equivalencia se establece según el comportamiento especificado del sistema, no porque dos valores “se parezcan” desde el punto de vista del tester. Si la especificación trata dos rangos de forma distinta, deben quedar en particiones diferentes.

### 3.2 Clases de equivalencia válidas e inválidas

Una **clase válida** contiene valores que la especificación reconoce y que el sistema debe procesar. Una **clase inválida** contiene valores que el sistema debe rechazar, ignorar o tratar como no definidos, de acuerdo con esa misma especificación [2].

Por ejemplo, si un campo acepta edades de 18 a 75 años, una partición válida puede ser (18 \leq edad \leq 75). Las particiones inválidas serían $edad < 18$ y $edad > 75$. El valor elegido para una prueba debe representar la regla de su clase: 30 puede representar la clase válida, 16 la inválida inferior y 80 la inválida superior.

Las particiones deben cumplir dos condiciones básicas:

- No deben superponerse. Un valor no puede pertenecer a dos clases distintas al mismo tiempo.
- No deben dejar valores fuera. El dominio considerado debe quedar cubierto, incluyendo las entradas inválidas relevantes.

Para obtener el 100% de cobertura de esta técnica, se debe ejecutar al menos un caso con un representante de cada partición identificada, tanto válida como inválida [2].

### 3.3 Failure masking o enmascaramiento de fallos

El *failure masking* ocurre cuando un defecto impide observar otro defecto que también estaba presente. Por eso, cuando se prueban particiones inválidas, cada caso debe activar una sola entrada inválida y mantener válidas las demás condiciones. ISTQB explica el mismo principio al recomendar probar una transición inválida por caso para evitar que un defecto oculte la detección de otro [2].

La demostración puede verse paso a paso:

1. Supongamos que un formulario recibe dos entradas, $A$ y $B$, y que ambas tienen una partición inválida.
2. El sistema valida primero $A$. Si detecta el error, detiene el flujo, muestra un mensaje y no procesa $B$.
3. Si además existe un defecto en la validación de $B$, el caso termina antes de alcanzar esa lógica. El resultado solo aporta evidencia sobre $A$.
4. Si el equipo registra el caso como una prueba conjunta de $A$ y $B$, podría concluir erróneamente que ambas particiones fueron evaluadas. En realidad, el comportamiento de $B$ quedó oculto.

La conclusión es directa: para comprobar cada partición inválida de forma aislada, se diseña un caso con esa partición como única entrada inválida y se mantienen valores válidos en el resto. Después se repite el procedimiento para la siguiente partición. Esto hace que el resultado sea atribuible y evita confundir una falla primaria con una falla que nunca llegó a ejecutarse.

### 3.4 Cobertura de particiones de equivalencia

En esta técnica, una partición cuenta como cubierta cuando al menos un caso de prueba utiliza un valor perteneciente a ella. La cobertura se calcula dividiendo las particiones cubiertas entre todas las particiones identificadas y multiplicando el resultado por 100:

$$
\text{Cobertura} =
\frac{\text{Número de Particiones de Equivalencia Cubiertas}}
{\text{Número Total de Particiones de Equivalencia Identificadas}}
\times 100
$$

Por ejemplo, si se identifican 10 particiones y los casos ejercitan las 10, la cobertura es (100\%\). Si solo se cubren 8, la cobertura es (80\%\). Este porcentaje indica qué clases fueron ejercitadas; no demuestra por sí solo que el sistema esté libre de defectos.

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

[3] G. J. Myers, C. Sandler, and T. Badgett, *The Art of Software Testing*, 3rd ed. Hoboken, NJ, USA: John Wiley & Sons, 2011.

[4] R. S. Pressman and B. R. Maxim, *Software Engineering: A Practitioner's Approach*, 8th ed. New York, NY, USA: McGraw-Hill Education, 2014.

[5] P. C. Jorgensen, *Software Testing: A Craftsman’s Approach*, 4th ed. Boca Raton, FL, USA: CRC Press, 2014.
