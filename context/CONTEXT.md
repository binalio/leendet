# 🧭 CONTEXT.md

## ⚙️ Metodología de documentación

Este archivo concentra **todo el contexto funcional y técnico del sistema**, con el propósito de servir como **fuente estructurada para el desarrollo automatizado de front-end y back-end** mediante el uso de agentes de IA.  

Cada módulo documentado en este archivo deberá seguir el siguiente proceso de análisis y redacción:

### 🧠 Proceso de documentación por módulo

1. **Normalización del contexto**  
   Cada descripción proporcionada por el autor será reformulada en lenguaje técnico, estructurado y claro, garantizando consistencia semántica para su interpretación por agentes de desarrollo.

2. **Desglose funcional**  
   Se extraerán las funcionalidades principales, submódulos y roles involucrados en cada parte del sistema.

3. **Análisis de escenarios y edge cases**  
   Cada módulo será analizado para identificar **casos no cubiertos, validaciones o comportamientos límite**.  
   Cuando se detecten escenarios faltantes, estos se propondrán explícitamente al autor para su confirmación e inclusión.

4. **Estructura estándar por módulo**
   Cada módulo incluirá (como mínimo) las siguientes secciones:
   - **Descripción general**
   - **Submódulos / funciones**
   - **Roles involucrados**
   - **Flujos principales**
   - **Casos especiales / edge cases**
   - **Consideraciones técnicas**
   - **Dependencias con otros módulos**

5. **Compatibilidad con generación automatizada**
   El contenido estará redactado en formato **semánticamente uniforme**, usando nombres de entidades, procesos y relaciones consistentes (por ejemplo: `Alumno`, `Profesor`, `Vale`, `Inventario`, `Cuenta`).  
   Esto permitirá que agentes de IA transformen directamente esta documentación en:
   - Definiciones de **endpoints API**
   - Estructuras de **base de datos**
   - Flujos de **autenticación**
   - Componentes de **interfaz de usuario**
   - **Casos de prueba** automatizados

6. **Registro incremental**
   Cada vez que se documente un nuevo módulo:
   - Se integrará al archivo completo `CONTEXT.md`.
   - Se actualizará la sección global de **Pendientes / Decisiones por validar**.
   - Se mantendrá la trazabilidad entre módulos relacionados.

---

## 📘 Descripción general del proyecto

Este proyecto es un **SaaS** dirigido principalmente a **universidades públicas y privadas en México** que cuenten con **almacenes, departamentos o áreas responsables de gestionar inventarios**.  
El sistema permite **administrar, controlar y prestar bienes materiales** — tanto **consumibles como no consumibles** — a los distintos **usuarios pertenecientes a la institución**, tales como **alumnos, profesores o personal de campus**.

Su objetivo principal es ofrecer una **plataforma centralizada, flexible y multi-campus**, capaz de:

- Controlar el inventario de materiales y herramientas.
- Gestionar préstamos y devoluciones.
- Diferenciar entre bienes **consumibles** (que se gastan o se agotan con el uso) y **no consumibles** (que deben devolverse).
- Facilitar la operación y trazabilidad de los bienes dentro de cada campus o área.
- Permitir que **alumnos y profesores** soliciten préstamos de manera digital y autónoma, reduciendo la carga operativa de los almacenes.

---

## 🔐 Módulo: Login y Registro

### 🧩 Descripción general

El módulo de **Login y Registro** gestiona el acceso de todos los usuarios al sistema, así como los procesos de **creación, activación, inactivación y recuperación de cuentas**.  
El sistema debe permitir tanto **acceso mediante credenciales internas** como **integración con métodos de autenticación SSO** (Single Sign-On) institucionales, según las capacidades de cada universidad.

---

### 👥 Tipos de usuarios y sus condiciones de acceso

#### **1. Alumno**
- Su acceso está **vinculado al pago de matrícula**, gestionado por el área de **Servicios Escolares**.
- Permisos:
  - Solicitar préstamos de **consumibles y no consumibles**.
  - **Devolver solo consumibles**.
- Activación de cuenta:
  - La institución puede realizar una **carga masiva de alumnos inscritos** para generar **cuentas preactivadas**.
  - Cada alumno podrá activar su cuenta cuando lo necesite a través de la opción **“Activación de cuenta”**, ingresando su correo institucional.
  - El sistema enviará un **código de verificación** por correo.
  - Al confirmar el código, el alumno podrá:
    - **Configurar su contraseña.**
    - **Aceptar los términos y condiciones** de uso de bienes de la institución.
  - La activación es válida por semestre; la institución deberá **renovar el estatus** del alumno ya sea mediante carga masiva o validación SSO.

---

#### **2. Profesor**
- Es un **trabajador de la institución**, al igual que el Almacenista o el Admin, pero con un **flujo de activación e inactivación distinto**, asociado directamente a su **asignación a grupos escolares**.
- Su acceso depende de la **asignación a un grupo escolar**, gestionado internamente por la escuela.
- Permisos:
  - Solicitar préstamos de **consumibles y no consumibles**.
  - **Devolver solo consumibles.**
  - En algunos casos, puede actuar como **validador** de solicitudes realizadas por los alumnos de los grupos que tenga asignados.
- Activación de cuenta:
  - Puede acceder mediante **SSO** (si la institución lo permite).
  - Inicialmente, el acceso será gestionado por el **Administrador del sistema**.
  - El **estatus activo o inactivo** del profesor dependerá de su asignación vigente a grupos o materias.
  - Se contempla una mejora futura: crear un **usuario de tipo “Servicios Escolares”** que gestione activaciones de alumnos y profesores.

---

#### **3. Almacenista**
- Es un **trabajador de la institución** con permisos para **gestionar el inventario** del almacén al que pertenece.
- Acceso gestionado directamente por el **Administrador del sistema**.
- Puede autenticarse mediante **SSO**, si la institución lo permite.
- No tiene permisos administrativos sobre cuentas de otros usuarios.

---

#### **4. Admin**
- Tiene **acceso total** a todas las funciones del sistema.
- Permisos adicionales:
  - Crear y eliminar usuarios de cualquier tipo.
  - Generar y exportar reportes.
  - Administrar la configuración general del sistema.
- Solo un **Admin** puede crear a otros **Admins**.
- El **primer Admin** debe ser creado directamente desde **base de datos (BD)**.

---

### 🔄 Flujos y procesos

#### **A. Login**
- El usuario ingresa su correo y contraseña, o accede mediante SSO.
- El sistema valida credenciales y redirige al dashboard correspondiente según el tipo de usuario.

#### **B. Activación de cuenta (para alumnos y profesores)**
1. Usuario accede a la opción **“Activación de cuenta”**.  
2. Ingresa su **correo institucional**.  
3. El sistema **envía un código de verificación** al correo ingresado.  
4. El usuario introduce el código recibido.  
5. El sistema valida el código:
   - ✅ Correcto → permite definir contraseña y aceptar términos.  
   - ❌ Incorrecto o caducado → muestra mensaje de error y opción de reenviar código.  
6. La cuenta queda **activada** y lista para iniciar sesión.

---

#### **C. Recuperación de contraseña**
1. Usuario selecciona **“Olvidé mi contraseña”**.  
2. Ingresa su **correo registrado**.  
3. El sistema **envía un código temporal de recuperación**.  
4. El usuario introduce el código y define una nueva contraseña.  
5. El sistema valida:
   - Código correcto y vigente.  
   - Código expirado (timeout configurable).  
   - Intentos máximos excedidos.  
6. Si es válido, la contraseña se actualiza exitosamente.

---

### ⚙️ Consideraciones técnicas

- El sistema deberá ser **compatible con integración SSO** (por ejemplo, Microsoft Entra ID, Google Workspace o sistemas internos).  
- Para instituciones sin SSO, deberá existir una **función de carga masiva de alumnos y profesores** (por archivo `.csv` o `.xlsx`) para crear cuentas preactivas.  
- Se requiere un sistema de **control de estados de cuenta**:  
  - `Preactivo` (pendiente de activación).  
  - `Activo`.  
  - `Inactivo`.  
- Todos los procesos de autenticación deben registrar:
  - Fecha y hora de creación y activación de cuenta.  
  - IP y dispositivo de activación (para auditoría).  
  - Historial de inicio de sesión (opcional, para versión Enterprise).  

---

### 🧪 Edge cases principales

| Caso | Descripción | Manejo esperado |
|------|--------------|-----------------|
| Código de activación expirado | El alumno tarda demasiado en confirmar su código. | Mostrar mensaje: “El código ha expirado. Solicita uno nuevo.” |
| Código incorrecto | El código ingresado no coincide con el enviado. | Mostrar mensaje: “Código inválido. Intenta nuevamente.” |
| Usuario no preactivado | Alumno o profesor intenta activar su cuenta sin estar en la base institucional. | Mostrar mensaje: “No se encontró una cuenta registrada. Contacta a tu escuela.” |
| Contraseña débil | Usuario define una contraseña insegura. | Rechazar y mostrar criterios mínimos (ej. longitud, caracteres especiales, etc.) |
| Usuario bloqueado | Múltiples intentos fallidos de login. | Bloquear temporalmente y permitir reactivación vía correo. |
| SSO deshabilitado | Institución sin integración SSO. | Redirigir automáticamente a método de login interno. |

---

## 📦 Módulo: Gestión de Inventario

### 🧩 Descripción general

El módulo de **Gestión de Inventario** está orientado principalmente al rol de **Almacenista** (con capacidades extendidas para el **Admin**).  
Su objetivo es permitir:

- Dar de alta, actualizar y dar de baja **bienes consumibles** y **no consumibles**.
- Clasificar los bienes según su naturaleza (químicos, materiales de laboratorio, materiales de taller, equipos, libros, etc.).
- Gestionar **cantidades, unidades de medida, niveles mínimos de resurtido** y estados de funcionamiento.
- Mantener una trazabilidad que permita, posteriormente, generar **reportes de consumo, préstamos, bajas por daño o no devolución**, entre otros.

Cada **almacén** funciona como una **instancia operativa independiente**:  
- Gestiona su propio inventario de consumibles y no consumibles.  
- Define y administra sus propios catálogos (según sus necesidades).  
- Aunque pudiera existir el mismo tipo de bien en distintos almacenes, en la práctica cada almacén suele dar servicio a carreras o áreas específicas.

---

### 👥 Roles involucrados

- **Almacenista**
  - Rol principal en este módulo.
  - Da de alta bienes consumibles y no consumibles.
  - Define clasificaciones, unidades de medida, niveles de resurtido.
  - Registra bajas, mermas y cambios de estado (ej. “no funcional”, “en reparación”).
  - Puede definir y gestionar ciertos catálogos locales (lotes, campos específicos, etc.).

- **Admin**
  - Puede realizar todas las acciones del Almacenista.
  - Además, puede:
    - Configurar catálogos globales (marcas, proveedores, unidades de medida, tipos de riesgo, categorías).
    - Acceder a reportes (al menos a nivel almacén; posibles vistas por campus/institución a definir).
    - Otorgar permisos a almacenistas para que **generen o consulten ciertos reportes**.

- **Alumno / Profesor** (indirecto en este módulo)
  - No gestionan inventario, pero se verán impactados por:
    - Disponibilidad de bienes.
    - Reglas de caducidad y peligrosidad (especialmente en químicos).
  - Podrán ver **indicadores tipo dashboard** de:
    - Préstamos realizados.
    - Préstamos activos.
    - Adeudos con el almacén.
    - Posibles penalizaciones (definidas en otros módulos).

---

### 🧱 Tipos de inventario y clasificación

1. **Consumibles**
   - Bienes que **no regresan al inventario** o se agotan con el uso.
   - Ejemplos:
     - Material de laboratorio: alcohol, sal, algodón, gasas, ácido clorhídrico, nitrato de plata, cloruro de sodio, formaldehído, ácido sulfúrico, etc.
     - Material de taller: madera, acrílico, plástico, hierro, aluminio.
   - Pueden manejarse como:
     - **Genéricos** (ej. 100 gasas asociadas a un mismo código).
     - **Por unidad de medida** (ej. 1 litro de ácido sulfúrico, 100 mg de formaldehído).
   - Los consumibles deben tener indicadores que permitan al almacenista **resurtir cuando el inventario llega a niveles mínimos**, considerando el consumo diario derivado de solicitudes de alumnos y profesores.

2. **No consumibles**
   - Bienes que **deben ser devueltos** al finalizar su uso (salvo baja por daño/no devolución).
   - Ejemplos:
     - Microscopios, termómetros, equipos de laboratorio.
     - Balones, destornilladores, cortadores.
     - Cámaras fotográficas y de video, lámparas de luz, teclados, proyectores.
     - Libros, amortiguadores, bujías, entre otros.
   - Se pueden manejar en dos enfoques:
     - **Genéricos por cantidad**: ej. “100 balones asociados a un mismo código”.
     - **Únicos por equipo**: cada unidad tiene su propio código/registro.
   - El sistema **no restringe** el enfoque; será el **almacenista quien elija** en el momento de alta:
     - si quiere una gestión **más simple** (genérica),
     - o una gestión **más detallada** (único por equipo).
   - A nivel UX, se puede **sugerir** el flujo sencillo por defecto.

---

### 🧩 Submódulos / funciones principales

- Alta de consumibles.
- Alta de consumibles químicos (con lotes, fórmula, peligrosidad).
- Alta de no consumibles (modo genérico o único por equipo).
- Gestión de catálogos (marcas, proveedores, lotes, unidades de medida, tipos de bien, peligrosidad, etc.).
- Configuración de niveles de resurtido por `ItemTipo` + `Almacén`.
- Actualización de inventario (entradas, mermas, bajas, cambios de estado).
- Reportes relacionados (más detallados en módulo de reportes, futuro).

---

### 🧬 Consideraciones especiales para consumibles químicos

- Campos extra:
  - Fórmula química (`AgNO₃`, `H₂SO₄`, etc.).
  - Peligrosidad (catálogo + pictogramas).
  - Manejo por **lotes** con fecha de caducidad.
- Impacto:
  - No se deben prestar lotes caducados.
  - Deben existir alertas de lotes próximos a caducar para que el almacén pueda reaccionar.

---

### 🧬 Consideraciones especiales para consumibles genéricos

- Ejemplo: gasas, algodón, madera.
- Se manejan con **un solo código** y una cantidad total.
- Uso recomendado:
  - Flujos simples de alta y actualización.
  - Niveles mínimos por almacén.
  - Opcionalmente, ubicación física dentro del almacén.

---

### 🧬 Consideraciones especiales para no consumibles únicos vs genéricos

- Modo **genérico**:
  - Un código con una cantidad total (ej. 100 balones).
- Modo **único por equipo**:
  - Un registro por unidad:
    - Código interno/código de barras.
    - Número de serie, marca, proveedor, fecha de compra, estado, etc.
- El modo lo decide el almacenista al dar de alta:
  - El sistema puede sugerir el genérico para reducir complejidad.

---

### 🧩 Modelo de datos sugerido (nivel conceptual)

**Entidad `Almacen`**
- `id_almacen`, `nombre`, `campus`, `ubicacion_fisica`

**Entidad `ItemTipo`**
- `id_item_tipo`
- `nombre`
- `descripcion`
- `es_consumible` (bool)
- `modo_gestion` (enum: `generico`, `unico_por_equipo`)
- `clasificacion` (laboratorio, taller, biblioteca, deportivo, etc.)
- `material` (madera, acrílico, plástico, metal, químico, etc.)
- `unidad_medida`
- `peligrosidad_id` (nullable)
- `formula_quimica` (nullable)
- `solo_ventanilla` (bool) ← define si solo puede prestarse desde ventanilla

**Entidad `ItemInventario`**
- `id_item_inventario`
- `id_item_tipo`
- `id_almacen`
- `codigo_interno` / `codigo_barras`
- `numero_serie` (nullable)
- `marca_id` (nullable)
- `proveedor_id` (nullable)
- `fecha_compra` (nullable)
- `estado` (activo, en_reparacion, dado_de_baja, no_funcional, extraviado, no_devuelto)

**Entidad `StockConsumible`**
- `id_stock_consumible`
- `id_item_tipo`
- `id_almacen`
- `cantidad_actual`
- `unidad_medida`
- `fecha_ultima_actualizacion`

**Entidad `Lote`**
- `id_lote`
- `id_item_tipo`
- `codigo_lote`
- `fecha_caducidad`
- `cantidad_disponible`
- `unidad_medida`
- `estado_lote` (vigente, proximo_a_caducar, caducado)

**Catálogos**
- `Marca`, `Proveedor`, `ProveedorMarca`
- `UnidadMedida`
- `Peligrosidad`
- `ClasificacionItem`

---

### 🔄 Flujos principales (Inventario)

(Se mantienen como en la versión anterior: alta de consumibles, alta de químicos, alta de no consumibles, resurtido, mermas, cambios de estado…)

---

### 🧪 Edge cases principales (Inventario)

(Se mantienen: stock bajo mínimos, stock en cero con solicitudes, lotes caducados, catálogos en uso, etc.)

---

### 🔗 Dependencias con otros módulos

- **Préstamos**: todas las solicitudes impactan stock y estados.
- **Gestión escolar**: profesores pueden validar solicitudes según grupos y materias.
- **Penalizaciones**: no consumibles no devueltos → adeudos → posibles penalizaciones.

---

## 🏫 Módulo: Gestión escolar

### 🧩 Descripción general

El módulo de **Gestión escolar** vincula la **estructura académica** (materias, grupos, periodos, profesores y alumnos) con la **gestión de inventarios y préstamos**.  

Objetivos:

- Definir la **relación alumno–profesor–grupo–materia**.
- Determinar **qué profesor puede validar los pedidos** de qué alumnos.
- Proveer herramientas como:
  - **Repositorio de vales** reutilizables entre periodos.
  - **Repositorio de prácticas** ligadas a grupos, equipos de alumnos, fechas, horarios y espacios.

El **Admin** es quien configura y mantiene este módulo.

---

### 👥 Roles involucrados

- Admin (configuración de materias, periodos, grupos, espacios).
- Profesor (usa repositorio de vales y prácticas).
- Alumno (participa en grupos y prácticas; sus préstamos se anclan a esta estructura).

---

### Submódulos

1. Gestión de grupos escolares.
2. Repositorio de vales.
3. Repositorio de prácticas.

(Se mantienen las descripciones/flows que ya definimos: creación de grupos con materia/periodo/profesores/alumnos/espacios/horarios; vales reutilizables por materia/periodo; prácticas que generan solicitudes a almacén para fechas, grupos y equipos.)

---

## 🔄 Módulo: Préstamos

### 🧩 Descripción general

El módulo de **Préstamos** se encarga de:

- Gestionar todos los préstamos de consumibles y no consumibles solicitados por:
  - Alumnos.
  - Profesores.
  - Profesores a través de:
    - **Repositorio de vales**.
    - **Repositorio de prácticas**.
- Unificar en un solo flujo:
  - Solicitudes **online**.
  - Solicitudes realizadas **en ventanilla**.
- Controlar:
  - Estados del préstamo (desde solicitado hasta devuelto).
  - Tiempos de surtido.
  - Recogida, devolución y adeudos.
  - Interacción con:
    - Inventario.
    - Gestión escolar.
    - Configuraciones del Admin (horarios, tolerancias, etc.).

Cada solicitud de préstamo genera un **vale virtual**, que:

- Tiene un **código de barras único**.
- Puede imprimirse en papel o exportarse como **PDF**.
- Sirve como respaldo y como herramienta de trabajo para el Almacenista al surtir y registrar devoluciones.

---

### 👥 Roles involucrados

- **Alumno**
  - Solicita préstamos online o presencial (ventanilla).
  - Ve el estado de sus vales.
  - Puede cancelar vales (con restricciones de tiempo).
  - Está sujeto a:
    - Validación de profesor para ciertos ítems.
    - Tiempos de tolerancia y posibles adeudos.

- **Profesor**
  - Solicita préstamos online o en ventanilla.
  - Genera solicitudes a partir de:
    - Repositorio de vales.
    - Prácticas creadas en Gestión escolar.
  - En general **no requiere aprobación** de terceros:
    - La validación aplica principalmente para alumnos, según configuración de inventario.
  - Puede:
    - Editar cantidades.
    - Agregar ítems al vale del alumno cuando está validando su solicitud.

- **Almacenista**
  - Visualiza el **tablero tipo Kanban** de vales.
  - Surtido de vales (preparación de pedidos).
  - Registro de recogida y devolución mediante escaneo de códigos de barras.
  - Marca vales como:
    - Solicitado.
    - Surtido.
    - En préstamo.
    - Devuelto.
  - Gestiona parcialidades (lo que se entrega / lo que falta / adeudos).

- **Admin**
  - Configura:
    - Reglas de horario de atención.
    - Días hábiles/inhábiles y fechas extraordinarias.
    - Tiempos de anticipación para solicitudes.
    - Tiempos de tolerancia para recogida y devolución.
    - Tiempos tras los cuales un préstamo se convierte en **Adeudo**.
  - Puede:
    - Consultar préstamos por alumno, profesor, grupo, materia, práctica.
    - Ver adeudos y tomar decisiones (ej. bloquear graduación de un alumno con adeudos).

---

### 🔀 Modalidades de préstamo

#### 1️⃣ Préstamo Online

Disponible para **alumnos y profesores** desde:

- Computadora.
- Tablet.
- Smartphone.

**Flujo general (Alumno):**

1. El alumno inicia sesión.
2. Accede a la opción **“Solicitar préstamo”**.
3. El sistema muestra un **catálogo de consumibles y no consumibles** disponibles para ese almacén:
   - Excluye (o marca claramente) aquellos configurados como **solo ventanilla** (`solo_ventanilla = true`).
4. El alumno arma su **vale virtual**:
   - Selecciona ítems y cantidades (similar a un carrito de compras).
5. Visualiza un **resumen** de lo solicitado.
6. Selecciona la **fecha y hora** en que necesita que el pedido esté surtido:
   - La UI debe ofrecer un listado de **slots de fecha/hora válidos**, calculados a partir de:
     - Horario de atención del almacén.
     - Días hábiles/inhábiles.
     - Reglas de anticipación mínima/máxima.
7. Envía la solicitud a almacén.

**Autorización de profesor (Alumno):**

- Si alguno de los ítems solicitados está configurado como “requiere validación de profesor”:
  - Se genera una petición de autorización al **profesor asociado** al alumno (según Gestión escolar).
  - El profesor puede:
    - Aprobar/rechazar cada ítem o el vale completo.
    - Editar cantidades.
    - Agregar ítems adicionales (para surtir de forma correcta según su criterio).
  - Una vez validado:
    - El vale sigue su flujo hacia el tablero del Almacenista.

**Flujo general (Profesor):**

- Igual al del alumno, con diferencias clave:
  - No requiere aprobación de otro profesor.
  - Puede generar solicitudes:
    - Directamente.
    - A partir de un **vale reutilizado** (Repositorio de vales).
    - A partir de una **práctica** (Repositorio de prácticas).
  - Puede agendar fechas y horas según reglas de horario y anticipación.

---

#### 2️⃣ Préstamo en Ventanilla

Modalidad **presencial** en almacén.

**Flujo general:**

1. Alumno o profesor se presenta en almacén.
2. El Almacenista:
   - Levanta la solicitud en el sistema, creando un **vale virtual** a nombre del usuario.
   - Registra las cosas que requiere el usuario.
3. El vale mantiene el mismo formato:
   - Lista de ítems.
   - Cantidades.
   - Fecha/hora de surtido (que en ventanilla suele ser **inmediata o cercana**).
4. El vale puede imprimirse:
   - Para que el Almacenista lo use físicamente al surtir.
   - Para que el alumno/profesor tenga un respaldo en papel.

**Particularidades:**

- Ítems configurados como **solo ventanilla** solo podrán solicitarse de esta forma.
- Para **alumnos**:
  - Si piden no consumibles que requieren autorización, el flujo de autorización del profesor se dispara igual:
    - El profesor recibe la solicitud de autorización, la revisa y puede:
      - Cambiar cantidades.
      - Agregar ítems.
    - Solo tras la validación, el Almacenista puede terminar de surtir formalmente el vale.
- Mientras un vale esté **En préstamo**, el alumno o profesor pueden seguir pidiendo cosas desde ventanilla **sobre ese mismo vale**, hasta que:
  - Devuelvan lo prestado, o
  - El almacén/administrador cierre el vale (criterio a detallar).

El Admin podrá **configurar límites de tiempo para la devolución de no consumibles**, que interactúan con los estados de En préstamo y Adeudo.

---

### 🧩 Configuración de reglas de negocio (Admin)

1. **Horario de atención de almacén**
   - Días:
     - Lunes a viernes.
     - Lunes a sábado.
     - Opcionalmente domingo.
   - Horarios:
     - Continuos (ej. 6:00–20:00).
     - Partidos (ej. 6:00–15:00 y 16:00–20:00).
   - Este horario:
     - Define las ventanas en que el almacén **puede surtir** pedidos.
     - Se utiliza para calcular y ofrecer **slots predefinidos de fecha/hora** en la UI al alumno/profesor.

2. **Fechas extraordinarias o inhábiles**
   - Catálogos donde el Admin define:
     - **Días adicionales de atención** (ej. sábado extra por cierre de semestre).
     - **Días no laborables** (festivos, cierres, mantenimiento).
   - Impacto:
     - No se pueden agendar surtidos en días inhábiles.
     - Días extraordinarios amplían la disponibilidad de slots.

3. **Anticipación mínima / máxima para solicitudes**
   - Parámetro configurable:
     - Ejemplo recomendado: **una semana** máxima de anticipación.
   - Se aplica tanto a alumnos como a profesores.
   - El sistema debe:
     - Bloquear selección de fechas fuera del rango permitido.
     - Mostrar mensajes claros (ej. “solo puedes pedir con máximo X días de anticipación”).

4. **Saturación de pedidos**
   - Cuando el almacén está saturado:
     - Puede **atrasar el surtido** de un vale.
     - Debe notificarse al alumno/profesor con al menos **12–24 horas de anticipación**.
   - Cuando la carga es baja:
     - Puede **adelantar** el surtido y notificar que estará listo antes.

5. **Cancelación de pedidos**
   - Alumnos y profesores pueden cancelar sus vales:
     - Con al menos **24 horas de anticipación**.
   - Si falta menos tiempo:
     - La cancelación debe realizarse **directamente en ventanilla**.
   - El sistema debe:
     - Bloquear cancelaciones online fuera de ventana.
     - Registrar quién canceló y cuándo.

6. **Tiempos de tolerancia**
   - Tolerancia para **recoger** el pedido:
     - Tiempo máximo que se espera al alumno/profesor después de la hora agendada.
   - Tolerancia para **devolver** lo prestado:
     - Tiempo máximo desde el momento que se marca “En préstamo” hasta que debe regresar.
   - Ambos parámetros deben ser configurables por el Admin (posiblemente:
     - Global.
     - Por tipo de bien o categoría, a definir).

7. **Tiempo para transición a Adeudo**
   - Define cuánto tiempo puede permanecer un vale:
     - En estado **En préstamo** antes de que sus no consumibles pasen a estado **Adeudo**.
   - Configurable por el Admin.

---

### 📊 Tablero Kanban de almacén

Los Almacenistas gestionan los vales desde un tablero tipo **Kanban**, con los siguientes estados:

1. **Solicitado**
   - Incluye todas las solicitudes confirmadas (online o ventanilla) que todavía no se han surtido.
   - Se subclasifica en rangos de tiempo respecto a la fecha/hora de surtido:
     - `+48h` (más de 48 horas).
     - `48h–24h`.
     - `24h–0h`.
   - La prioridad no es solo cronológica:
     - También se considera si requieren autorización, disponibilidad, etc.

2. **Surtido**
   - Vales cuya lista de ítems ya fue preparada por el Almacenista.
   - No es necesario esperar a que falten pocas horas:
     - El Almacenista puede surtir en función de prioridades internas:
       - Ejemplo: adelantar algo que se requiere en 48h sobre otro que se requiere antes pero aún no está autorizado.

3. **En préstamo**
   - Vales cuyos ítems **ya fueron recogidos** por alumnos o profesores.
   - Desde aquí corre el tiempo de tolerancia para devolución.

4. **Devuelto**
   - Vales donde **todos los no consumibles** fueron devueltos.
   - Durante la devolución:
     - El Almacenista determina si los bienes regresan en **buen estado**.
     - Si un bien no regresa en buen estado:
       - Se clasifica como **en reposición** en inventario.
       - Se excluye del inventario disponible para préstamo.
       - Puede contabilizarse como **adeudo** para el alumno/profesor hasta que haya reposición.

### Estado conceptual: Adeudo

- No es una columna adicional del Kanban, pero sí un **estado lógico** aplicado a no consumibles:
  - No consumibles **no devueltos** después del tiempo configurado.
- Impactos:
  - **Alumnos**:
    - El Admin puede verificar si tienen adeudos antes de permitir trámites importantes (ej. graduación).
  - **Profesores**:
    - Pueden usarse como dato estadístico (ej. número de adeudos por profesor en cierto periodo).
- Los ítems en Adeudo:
  - Permanecen asociados al vale original.
  - El Admin puede cambiar el estado cuando:
    - El bien se repone.
    - Se toma alguna acción administrativa/económica.

---

### 🔍 Filtros del tablero

El tablero Kanban debe permitir filtros por:

- Profesor.
- Alumno.
- Materia.
- Grupo.
- Rango de tiempo.
- Préstamos que pertenecen a una **práctica** específica.

Esto permite que el Almacenista:

- Entienda la carga de trabajo por materia o grupo.
- Identifique qué corresponde a prácticas específicas vs. solicitudes aisladas.

---

### 📦 Proceso de surtido y devolución (códigos de barras)

#### Códigos de barras

- Cada **consumible** o **no consumible** registrado en inventario debe tener asociado un **código de barras**.
- Estos códigos se utilizan para:
  - Surtir vales.
  - Registrar devoluciones.

En la práctica:

- Los Almacenistas suelen:
  - Imprimir los códigos de barras.
  - Pegarlos:
    - En los anaqueles donde están los consumibles/no consumibles genéricos.
    - Directamente sobre los no consumibles únicos.

#### Surtido de vale

1. El Almacenista recibe el vale en estado **Solicitado**.
2. Imprime el vale virtual (lista física) o trabaja directamente desde la pantalla.
3. Recorre el almacén y **escanea códigos de barras**:
   - Para consumibles genéricos:
     - Puede escanear el **mismo código varias veces** (ej. 8 gasas → 8 lecturas).
     - O escanear una vez y **digitar la cantidad** (ej. campo de cantidad).
   - Para no consumibles únicos:
     - Escanea cada unidad con su código específico.
4. El sistema:
   - Marca los ítems del vale como “surtidos”.
   - Actualiza el inventario:
     - Decrementa cantidades en consumibles.
     - Cambia estados en no consumibles (ej. de “activo” a “asignado/en préstamo”).
5. Una vez completados todos los ítems:
   - El vale pasa a estado **Surtido**.

#### Recogida y paso a En préstamo

- Cuando el alumno o profesor llega a almacén por su pedido:
  - El Almacenista marca el vale como **En préstamo**.
  - Desde ese momento:
    - Comienza a correr el tiempo de devolución configurado.
    - El vale se mueve a la columna “En préstamo” del Kanban.

#### Devolución

1. El alumno o profesor regresa al almacén con los no consumibles.
2. El Almacenista:
   - Escanea los códigos de barras de los bienes devueltos.
3. El sistema:
   - Marca esos ítems dentro del vale como “devueltos”.
   - Actualiza inventario:
     - Estado del no consumible (ej. de “en préstamo” a “activo” o “en reposición”).
4. Casos:
   - Si **se devuelven todos los no consumibles**:
     - El vale pasa a estado **Devuelto**.
   - Si **faltan ítems**:
     - Los no devueltos quedan asociados al vale como **Adeudo**.
     - El Admin podrá resolver estos adeudos posteriormente.

---

### 🧩 Modelo de datos sugerido (Préstamos)

**Entidad `Vale`**
- `id_vale`
- `codigo_barras`
- `id_usuario_solicitante` (alumno o profesor)
- `id_profesor_validador` (nullable)
- `id_almacen`
- `origen` (online, ventanilla, practica, vale_reutilizado)
- `fecha_solicitud`
- `fecha_hora_surtido_programado`
- `fecha_hora_surtido_real` (nullable)
- `fecha_hora_recogida` (nullable)
- `fecha_hora_devolucion_completa` (nullable)
- `estado` (solicitado, surtido, en_prestamo, devuelto, cancelado)
- `id_grupo` (nullable, cuando está ligado a Gestión escolar)
- `id_practica` (nullable)

**Entidad `ValeItem`**
- `id_vale_item`
- `id_vale`
- `id_item_tipo`
- `id_item_inventario` (nullable, para no consumibles únicos)
- `cantidad_solicitada`
- `cantidad_surtida`
- `cantidad_devuelta`
- `requiere_validacion_profesor` (copiado desde Inventario)
- `estado_item` (solicitado, autorizado, rechazado, surtido, en_prestamo, devuelto, adeudo)

**Entidad `Adeudo`** (puede ser vista o entidad física)
- `id_adeudo`
- `id_vale_item`
- `id_usuario_responsable`
- `fecha_inicio_adeudo`
- `fecha_resolucion` (nullable)
- `tipo_resolucion` (repuesto, pago, condonado, etc. – a definir en módulo de penalizaciones)

**Configuración de almacén**
- `ConfigHorarioAlmacen`
- `DiaInhabilAlmacen`
- `DiaExtraordinarioAlmacen`
- `ConfigPrestamos`:
  - `anticipacion_min`
  - `anticipacion_max`
  - `tolerancia_recogida`
  - `tolerancia_devolucion`
  - `tiempo_para_adeudo`

---

### 🧪 Edge cases principales (Préstamos)

| Caso | Descripción | Manejo esperado (a detallar) |
|------|-------------|-------------------------------|
| Solicitud fuera de horario | Alumno intenta seleccionar fecha/hora fuera de horario de atención. | No mostrar esos slots; si se intenta forzar, mostrar error. |
| Solicitud en día inhábil | Se selecciona un día marcado como inhábil. | Bloquear selección y mostrar mensaje. |
| Ítems solo ventanilla solicitados online | Se intenta pedir online un ítem `solo_ventanilla`. | No mostrarlo o marcarlo como no disponible online. |
| Profesor no responde autorización | Solicitudes de alumno quedan pendientes sin respuesta del profesor. | Definir timeout y comportamiento (auto-cancelar, escalar, etc.). |
| Saturación de almacén | No se alcanza a surtir un vale en el horario comprometido. | Permitir reprogramar; notificar entre 12–24h antes. |
| Cancelación fuera de ventana | Alumno/profesor intenta cancelar con menos de 24h. | Bloquear cancelación online y pedir acudir a ventanilla. |
| No recogida en tiempo de tolerancia | Nadie pasa a recoger el vale en la ventana de tolerancia. | Definir si se cancela automáticamente o se reprograma. |
| Devolución parcial | Devuelven solo parte de los no consumibles. | Marcar devueltos, pasar el resto a “Adeudo” tras cierto tiempo. |
| Bien devuelto en mal estado | No consumible regresa dañado. | Cambiar estado a “en reposición”; registrar posible adeudo. |
| Conflictos con prácticas | Se modifica una práctica después de haber generado vales asociados. | Definir cómo se sincroniza (no se actualiza, o se pide confirmación). |

---

### 🔗 Dependencias con otros módulos

- **Login y Registro**:
  - Solo usuarios autenticados pueden generar o gestionar vales.
- **Gestión de Inventario**:
  - Cada vale afecta el stock (consumibles) y estados de equipos (no consumibles).
  - Campo `solo_ventanilla` condiciona la modalidad de solicitud.
- **Gestión escolar**:
  - Define:
    - Relación alumno–grupo–materia–profesor.
    - Qué profesor valida las solicitudes del alumno.
  - Prácticas generan vales automáticamente para sus grupos y fechas.
- **Penalizaciones** (futuro):
  - Adeudos y retrasos alimentan el sistema de puntos:
    - Pérdida de puntos por entrega tardía.
    - Distintas penalizaciones según tipo de no consumible.

---

## 🔖 Pendientes / Decisiones por validar (global)

### Login y Registro
- [ ] Definir **tiempo exacto de expiración del código** de activación y recuperación (ej. 10 o 15 minutos).  
- [ ] Confirmar si los **profesores inactivos** pierden acceso automático al sistema o solo a la validación de préstamos.  
- [ ] Validar si el **Admin** puede **reactivar cuentas inactivas** de profesores y alumnos manualmente.  
- [ ] Confirmar los **métodos SSO** compatibles a nivel institucional (Google, Microsoft, LDAP u otros).  
- [ ] Evaluar la necesidad de un **rol intermedio** (“Servicios Escolares”) encargado de gestión de altas y bajas semestrales.  
- [ ] Definir si el sistema debe permitir **sincronización automática de estatus de profesores** con base en su asignación a grupos.  
- [ ] Confirmar si el **Almacenista** puede autenticarse únicamente con SSO o también mediante credenciales internas.  

### Gestión de Inventario
- [ ] Definir si se almacenará un **histórico detallado de movimientos de inventario** (entradas, salidas, mermas) como módulo de logs, y su nivel de granularidad.  
- [ ] Confirmar qué tan granular debe ser la clasificación de **peligrosidad** (solo iconos, niveles numéricos, normas específicas, etc.).  
- [ ] Definir si el sistema debe soportar **equivalencias de unidades** (ej. 1 caja = 12 piezas) y cómo se representarán.  
- [ ] Definir si los **reportes de inventario** estarán disponibles:  
  - Solo por almacén,  
  - o también consolidados por campus e institución, y en qué etapas del proyecto.  
- [ ] Validar la lógica exacta de **penalización de puntos a alumnos** (a definir en su módulo):  
  - Puntos iniciales por periodo.  
  - Pérdida de puntos por retraso.  
  - Penalizaciones diferenciadas según el tipo de no consumible.  

### Gestión escolar
- [ ] Definir reglas exactas para **cambio de grupo** de un alumno a mitad de ciclo:
  - Qué pasa con prácticas ya asignadas.
  - Qué pasa con préstamos activos ligados al grupo anterior.  
- [ ] Definir prioridades entre **profesor principal vs profesores secundarios**:
  - ¿Quién puede validar?
  - ¿Todos ven y editan prácticas/vales por igual?  
- [ ] Definir alcance del **repositorio de vales**:
  - ¿Visible solo dentro del mismo campus?
  - ¿O compartido entre campus que comparten la misma materia?  
- [ ] Definir si las **prácticas** se manejan como:
  - Plantillas reutilizables entre periodos.
  - Instancias ligadas únicamente a un ciclo específico.  
- [ ] Establecer reglas de **edición de prácticas durante ejecución**:
  - Qué cambios están permitidos.
  - Cómo se notifica al almacén de cambios de última hora.  
- [ ] Definir si existirá algún mecanismo de **control de agenda de espacios** (para evitar doble uso de laboratorio/aula).

### Préstamos
- [ ] Definir **reglas sobre múltiples vales activos** por alumno/profesor:
  - ¿Se permite más de un vale En préstamo al mismo tiempo?
  - ¿Hay un límite por periodo o por tipo de ítem?  
- [ ] Establecer un **timeout para autorización de profesor**:
  - ¿Qué ocurre si el profesor no responde a tiempo? (auto-cancelar, escalar a Admin, etc.).  
- [ ] Definir con precisión la lógica de **priorización** en el tablero:
  - Combinación de fecha/hora requerida, autorización pendiente, tipo de usuario, etc.  
- [ ] Definir reglas exactas cuando:
  - El alumno/profesor **no recoge** el vale dentro de la tolerancia:
    - ¿Se cancela automáticamente?
    - ¿Se devuelve el stock?  
- [ ] Precisar el flujo de **modificación de vales**:
  - Qué puede cambiar el profesor al validar (líneas, cantidades, agregar ítems).
  - Qué puede cambiar el alumno (antes de envío, después de envío).  
- [ ] Definir comportamiento cuando el inventario **no alcanza** para surtir todo:
  - ¿Se permite surtido parcial?
  - ¿Se genera un segundo vale para lo pendiente?
  - ¿Se ajusta automáticamente el vale original?  
- [ ] Acordar cómo se integran **prácticas y vales**:
  - Si un cambio en la práctica actualiza vales ya generados o solo afecta nuevos.  
- [ ] Definir si existen **tipos de préstamo** (ej. corto plazo, largo plazo, uso interno de profesor) con reglas diferentes de tiempos y adeudos.  

---
