# Registro de Decisiones de Arquitectura (DECISIONS.md)

Este documento registra formalmente las decisiones técnicas adoptadas para el Proyecto 11 (LeadFlow CRM).

---

## 1. Arquitectura Monorepo desacoplada (`client/` y `server/`)

- **Contexto:** El proyecto requiere tanto un backend Node/Express robusto con base de datos como una SPA moderna en React 19.
- **Decisión:** Organizar el proyecto en una estructura monorepo basada en npm workspaces (`client/` y `server/`) con tooling centralizado en la raíz (Oxlint, Prettier, Husky).
- **Consecuencias:** Permite desarrollo ágil y simultáneo sin mezclar dependencias de frontend y backend, manteniendo scripts unificados (`npm run dev`, `npm run build`, `npm run test`).

---

## 2. Backend con Express 5 y TypeScript

- **Contexto:** Primera API REST real conectada del portfólio.
- **Decisión:** Utilizar Express 5 sobre Node.js 22 LTS con TypeScript.
- **Consecuencias:** Permite manejo nativo y automático de errores asíncronos en los middlewares de error sin necesidad de envolver cada controlador en bloques try/catch manuales.

---

## 3. Base de Datos Relacional MySQL 8.4 LTS y ORM Sequelize

- **Contexto:** Se requiere persistencia real de prospectos comerciales y pipelines de venta.
- **Decisión:** Utilizar MySQL 8.4 LTS (versión LTS estándar de la industria) con Sequelize para modelado relacional y transaccional.
- **Consecuencias:** Permite demostrar dominio de SQL clásico, integridad referencial con claves foráneas, índices de búsqueda y migraciones controladas.

---

## 4. Autenticación con Stateless JWT y Hash con bcrypt

- **Contexto:** Control de acceso y aislamiento de cuentas para representantes de ventas.
- **Decisión:** Implementar autenticación basada en JSON Web Tokens (JWT) firmados con clave secreta y contraseñas cifradas con `bcryptjs` (10 rondas de salt).
- **Consecuencias:** Permite autenticación sin estado escalable, compatible con cabeceras `Authorization: Bearer <token>` consumidas por el cliente React.

---

## 5. Validación con Zod y React Hook Form

- **Contexto:** Formularios de captura de leads y endpoints de API requieren validación estricta de tipos y formatos.
- **Decisión:** Utilizar Zod tanto en frontend (`@hookform/resolvers/zod`) como en backend (middlewares de validación de request body).
- **Consecuencias:** Prevención de inconsistencias en runtime y tipado estático inferido (`z.infer<typeof schema>`).
