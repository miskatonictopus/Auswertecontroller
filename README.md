# Auswertecontroller

Aplicación de escritorio multiplataforma para análisis funcional e integración con modelos de lenguaje personalizados (GPT). Proyecto desarrollado con un enfoque modular mediante Turborepo y tecnologías modernas de frontend.

## 📦 Stack tecnológico

- 🧠 **React + Vite** para la interfaz de usuario
- ⚡ **Electron** para empaquetar como aplicación de escritorio (Windows, macOS, Linux)
- 🎨 **TailwindCSS** + **Shadcn UI** para diseño limpio y modular
- 🧱 **Turborepo** como gestor de monorepo y orquestador de builds
- 🤖 Integración futura con **OpenAI GPT** personalizado

---

## 📁 Estructura del proyecto

apps/
├── web/ → versión web (si aplica)
└── desktop/ → aplicación de escritorio con Electron

packages/
└── (a futuro) lógica compartida, utilidades, hooks, etc.


---

## 🚀 Desarrollo local

### 🔧 Requisitos

- Node.js ≥ 18
- npm
- Git

### ▶️ Iniciar entorno de desarrollo

```bash
# En la raíz del monorepo
npm install

# Ejecutar solo la app de escritorio
npx turbo run dev --filter=desktop

    O si estás dentro de apps/desktop, simplemente:

npm run dev

🧪 Estructura actual en desarrollo

    Sidebar funcional con Shadcn

    Layout responsive básico

    Estilos vía tokens CSS (bg-background, border-border, etc.)

    Electron cargando Vite (modo desarrollo)

📌 TODO próximos pasos

Añadir vista principal funcional

Integrar GPT personalizado

Exportar resultados / historial

Soporte multiplataforma (Windows, macOS, Linux)

    Versión móvil en el futuro

🧠 Autor

Javier Ferrer — @miskatonictopus
UX/UI designer y docente de tecnologías web
📝 Licencia

Este proyecto está bajo licencia MIT.


---

¿Quieres que lo guarde directamente en el proyecto con `git add README.md` y lo subamos?



