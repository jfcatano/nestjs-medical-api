# API para genera diagnósticos basados en IA

Este proyecto es una API RESTful desarrollada con NestJS como parte de una prueba técnica. La API permite gestionar pacientes, generar diagnósticos sugeridos utilizando inteligencia artificial (OpenAI o un mock) y está construida siguiendo principios de arquitectura limpia (Hexagonal). Incluye autenticación JWT, manejo de roles y está preparada para ser desplegada en pocos con segundos con Docker.

## Tabla de Contenidos

-   [Características](#características)
-   [Arquitectura](#arquitectura)
-   [Tecnologías Utilizadas](#tecnologías-utilizadas)
-   [Prerrequisitos](#prerrequisitos)
-   [Configuración del Entorno](#configuración-del-entorno)
-   [Instalación](#instalación)
-   [Ejecutando la Aplicación](#ejecutando-la-aplicación)
-   [Documentación de la API](#documentación-de-la-api-swagger)
-   [Autenticación y Roles](#autenticación-y-roles)
-   [Integración con OpenAI](#integración-con-openai)

## Características

* **Gestión de Pacientes:** Operaciones CRUD completas para pacientes.
* **Diagnóstico con IA:** Generación de diagnósticos sugeridos basados en el historial médico del paciente utilizando OpenAI (GPT-4o) o una simulación mock (este caso).
* **Autenticación JWT:** Sistema de login y registro con protección de rutas mediante JSON Web Tokens.
* **Autorización por Roles:** Control de acceso a endpoints basado en roles (PATIENT, DOCTOR, ADMIN).
* **Validación de Datos:** Uso de `class-validator` y `class-transformer` para validar DTOs.
* **Documentación API:** Documentación de endpoints con Swagger.
* **Base de Datos:** Interacción con base de datos (PostgreSQL) utilizando Prisma ORM.
* **Manejo de Errores:** Filtro global de excepciones para respuestas de error consistentes.
* **Logging de IA:** Registro de las interacciones con el servicio de IA en la base de datos.
* **Dockerización:** Soporte completo para Docker y Docker Compose para un fácil y rápido despliegue.

## Arquitectura

El proyecto sigue principios de **Arquitectura Limpia** (Arquitectura Hexagonal), separando las responsabilidades en las siguientes capas principales dentro del directorio `src/`:

1.  **Domain:** Contiene las entidades (`entities/`) y las interfaces de repositorios (`repositories/`).
2.  **Application:** Contiene los servicios de aplicación o casos de uso (`services/`) y los Data Transfer Objects (`dto/`).
3.  **Infrastructure:** Implementa detalles técnicos como la base de datos (Prisma), servicios externos (OpenAI), autenticación (Passport, JWT y Guards). Se divide en subdirectorios como `database/`, `ai/`, `auth/`.
4.  **Presentation:** Expone la aplicación al exterior a través de una API REST. Contiene los controladores (`controllers/`) y módulos de NestJS (`modules/`).

## Tecnologías Utilizadas

* **Framework:** NestJS
* **Lenguaje:** TypeScript
* **ORM:** Prisma
* **Base de Datos:** PostgreSQL
* **API Docs:** Swagger
* **Validación:** class-validator y class-transformer
* **Autenticación:** Passport.js, JWT y bcrypt
* **IA:** OpenAI (`openai` npm package)
* **Contenerización:** Docker, Docker Compose

## Prerrequisitos

* Node.js (v22 o superior recomendado)
* npm
* Docker
* Docker Compose
* Una instancia de PostgreSQL (si no se usa Docker)

## Configuración del Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables (Las variables por defecto ya están en .env.example):

```env
# Puerto en el que correrá la API
PORT=3000

# URL de conexión a la base de datos PostgreSQL (usada por Prisma).
# Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/patients_db?schema=public

# Secreto para firmar los JWT
JWT_SECRET=tu_secreto_super_seguro_aqui

# API Key de OpenAI
# Si quieres usar el MOCK (Keywords), déjala como 'fake-key'
# Si quieres usar la API real, reemplaza 'fake-key' con un API Key válida de OpenAI (Debe tener créditos en la cuenta)
OPENAI_API_KEY=fake-key
```

## Instalación

Para esta ocasión no se realizará el paso a paso para realizar la instalación e inicialización sin Docker.

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/jfcatano/nestjs-medical-api
    cd nestjs-medical-api
    ```

## Ejecutando la Aplicación

Para levantar la API debes estar dentro del directorio `nestjs-medical-api` y ejecutar el siguiente comando:
    ```bash
    docker compose up -d

    # Esperar a que Docker levante los contenedores con la API y la base de datos y luego ejecutar:
    npx prisma migrate dev
    ```

## Documentación de la API

La API se encuentra totalmente documentada en el endpoint/url http://localhost:3000/api/docs el cual es accesible una vez la API sea levantada con éxito.

# Autenticación y Roles

Los roles son `PATIENT`, `DOCTOR` y `ADMIN`. Solo los dos últimos tienen acceso a crear diagnósticos. Para poder probar la API adecuadamente, es ideal crear un usuario con cada rol usando Swagger para mayor facilidad.

# Integración con OpenAI

El proyecto está totalmente preparado para funcionar con OpenAI, sin embargo, debido a las limitaciones (no hay capa gratuita) las pruebas de funcionamiento se realizaron con un mock. Si no tienes una key de OpenAI es posible usar `fake-key` como KEY, y los diagnósticos se basarán en algunos keywords que hay en dicho mock.


---

Con esto finalizo el README.md del repositorio, ¡muchas gracias!

Juan Fernando Cataño Posada.