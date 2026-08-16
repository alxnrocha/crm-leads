# Registro de Decisiones de Arquitectura (ADR) — LeadFlow CRM

## ADR 001: Monorepo Workspaces (`client` + `server` + `database`)

- **Contexto:** Se requiere un CRM Full Stack con frontend en React 19 y backend en Express 5 manteniendo sincronía de tipos TypeScript y scripts de ejecución paralelos.
- **Decisión:** Configurar NPM Workspaces con TypeScript (`tsconfig.base.json`) para orquestar `client` y `server` sin sobrecarga de herramientas complejas.
- **Estado:** Aceptado e Implementado.

## ADR 002: Base de Datos Relacional MySQL 8.4 LTS con Sequelize ORM

- **Contexto:** El CRM maneja relaciones estrictas entre usuarios comerciales, prospectos, etapas de embudo, orígenes de marketing e historial cronológico de actividades.
- **Decisión:** Emplear MySQL 8.4 LTS relacional con DDL indexado (`database/schema.sql`) y Sequelize ORM con modelos tipados en TypeScript.
- **Estado:** Aceptado e Implementado.

## ADR 003: Tokens CSS y Tailwind CSS v4 (`@theme`)

- **Contexto:** Clonar de forma pixel-perfect la interfaz dark slate provista en la imagen de diseño `design/design.png`.
- **Decisión:** Usar directiva `@theme` en Tailwind CSS v4 para definir la paleta de colores (`#0b0f17`, `#121824`, `#151c2c`, `#6366f1`) y variables de estado por etapa del pipeline.
- **Estado:** Aceptado e Implementado.

## ADR 004: OpenAPI 3.0.3 y Documentación Interactiva

- **Contexto:** La API REST debe ser fácilmente consumible y testeable por desarrolladores e integradores.
- **Decisión:** Escribir la especificación completa en `server/src/docs/swagger.yaml` y montarla en `/api/docs` mediante `swagger-ui-express`.
- **Estado:** Aceptado e Implementado.

## ADR 005: Pruebas Automatizadas con Vitest y Supertest

- **Contexto:** Asegurar la estabilidad de los endpoints críticos (autenticación, etapas, prospectos) y componentes clave de UI.
- **Decisión:** Emplear Vitest y Supertest en el backend, y Vitest con Testing Library en el frontend, integrados en un pipeline de GitHub Actions CI.
- **Estado:** Aceptado e Implementado.
