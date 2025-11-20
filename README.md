

# ✈️ AerolineaWeb (Frontend)

[](https://angular.io/)
[](https://firebase.google.com/docs/auth)
[](https://www.google.com/search?q=url-del-backend-repo)
[](https://www.google.com/search?q=LICENSE)

**AerolineaWeb** es una aplicación web para la gestión integral de una aerolínea. Está construida con **Angular 19** y utiliza **Firebase Authentication** para el control de acceso, conectándose al servicio de backend `aerolinea_backend`.

-----

## 🛠️ Características Principales

  * **Autenticación Sólida:** Integración con **Firebase Authentication** (Email/Password y Google login).
  * **Control de Acceso:** Sistema de **control de acceso basado en roles** (`Role-based access control - RBAC`).
  * **Gestión CRUD:** Módulos completos de **CRUD** (Crear, Leer, Actualizar, Eliminar) para:
      * Usuarios (Users)
      * Aeronaves (Planes)
      * Bases Aéreas (Bases)
      * Vuelos y Tripulación
  * **Interfaz Moderna:** Dashboard con componentes de *layout* reusables (Header, Sidebar) y diseño **responsive** utilizando **TailwindCSS**.

-----

## 🚀 Cómo Empezar (Setup)

Sigue estos pasos para instalar y ejecutar el proyecto localmente.

### 1\. Clonar el repositorio

```bash
gh repo clone BalerionFenix/aerolinea-web
cd AerolineaWeb
```

### 2\. Instalar dependencias

```bash
npm install
```

### 3\. Configuración de Firebase

Es **obligatorio** actualizar la configuración de Firebase en el archivo `app.config.ts` con tus propias credenciales del proyecto de Firebase.

### 4\. Requisito del Backend

Asegúrate de que el backend `aerolinea_backend` esté **corriendo y accesible** para que la aplicación pueda realizar las peticiones CRUD.

### Desarrollo

Arranca el servidor de desarrollo local:

```bash
ng serve
```

Abre tu navegador en `http://localhost:4200`. La aplicación se recargará automáticamente al modificar los archivos fuente.

-----

## 🔗 Rutas de la Aplicación

| Ruta | Descripción | Requisito |
| :--- | :--- | :--- |
| `/login` | Página de inicio de sesión. | Público |
| `/reset-password` | Recuperación de contraseña. | Público |
| `/register` | Registro de nuevos usuarios. | Público |
| `/dashboard` | Dashboard principal. | Autenticación |
| `/dashboard/usuarios` | Gestión de usuarios (CRUD). | Autenticación + Rol |
| `/dashboard/aviones` | Gestión de aeronaves (CRUD). | Autenticación + Rol |
| `/dashboard/bases-aereas` | Gestión de bases aéreas (CRUD). | Autenticación + Rol |
| `/dashboard/vuelos` | Gestión de vuelos. | Autenticación |
| `/dashboard/tripulacion` | Gestión de tripulación. | Autenticación |
| `/dashboard/panel-control` | Panel de control principal. | Autenticación |

**Patrón de rutas CRUD:**

  * `/entidad` -\> Listado y gestión
  * `/entidad/crear` -\> Formulario de creación
  * `/entidad/editar/:id` -\> Formulario de edición

-----

## 🏗️ Estructura del Proyecto

El proyecto sigue una estructura modular y orientada a características (*feature-driven*):

```
src/
├─ app/
│ ├─ core/      # 🛡️ Guards, models, y servicios para backend & autenticación.
│ ├─ shared/    # 🎨 Componentes reutilizables (Header, Sidebar, Layout).
│ ├─ features/  # 🧩 Módulos de funcionalidad con lógica de negocio y CRUD:
│ │ ├─ usuarios/
│ │ ├─ aviones/
│ │ ├─ base/
│ │ ├─ dashboard/
│ │ ├─ login/
│ │ └─ pilotos/, tripulacion/, vuelos/ 
│ ├─ app.config.ts # Configuración de la aplicación e inicialización de Firebase.
│ ├─ app.routes.ts # **Routing** de Angular con guardas de acceso.
│ └─ main.ts     # Arranque de la aplicación.
└─ styles.scss # Estilos globales e imports de TailwindCSS.
```

-----

## 💾 Estructura de la Base de Datos (Backend)

La base de datos del *backend* (`aerolinea_backend`) maneja la siguiente estructura de entidades relacionadas con la gestión de la aerolínea:

| Entidad | Descripción |
| :--- | :--- |
| **Rol, Usuario** | Permisos y acceso al sistema. |
| **Base** | Bases y aeropuertos. |
| **Persona** | Información de personal asociada a bases. |
| **Piloto** | Datos específicos de pilotos (licencias). |
| **Miembro\_tripulacion** | Datos de tripulación. |
| **Avion** | Aeronaves. |
| **Tipo\_mantenimiento, Mantenimiento** | Control de revisiones de aeronaves. |
| **Vuelo, Tripulacion\_vuelo** | Detalles de vuelos y asignación de tripulación. |

**Ejemplo de tabla: Base**

```sql
create table base (
  base_codigo text primary key,
  nombre text unique not null,
  ciudad text not null,
  pais text not null,
  codigo_iata char(3) unique,
  activo boolean default true,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);
```

-----

## 🔨 Build y Testing

### Building (Producción)

Compila el proyecto para desplegar en producción:

```bash
ng build
```

El resultado de la compilación se encontrará en el directorio `dist/`.

### Testing

#### Pruebas Unitarias

```bash
ng test
```

Ejecuta las pruebas unitarias utilizando Karma.

#### Pruebas End-to-End (e2e)

```bash
ng e2e
```

Ejecuta las pruebas *end-to-end* (requiere un framework de pruebas configurado).

-----

## 📚 Recursos Adicionales

  * [Angular CLI - Documentación y Comandos](https://angular.io/cli)
  * [Firebase Authentication](https://firebase.google.com/docs/auth)
  * [TailwindCSS](https://tailwindcss.com/docs)
