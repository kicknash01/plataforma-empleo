# 🚀 Plataforma de Empleo

Una plataforma web completa para conectar candidatos y empresas, construida con React + TypeScript.

## 📋 Características

### 👨‍💼 Para Candidatos
- Registro y login
- Editar perfil personal
- Ver ofertas de trabajo destacadas
- Dashboard personalizado

### 🏢 Para Empresas
- Registro y login
- Editar perfil corporativo
- Publicar ofertas de trabajo (próximamente)
- Dashboard de gestión

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| React 18 | UI |
| TypeScript | Tipado estático |
| TanStack Form | Manejo de formularios |
| TanStack Query | Peticiones API |
| Zod | Validaciones |
| Zustand | Estado global |
| React Router DOM | Rutas protegidas |
| Vite | Build tool |

## 🏗️ Arquitectura

src/
├── components/
│ ├── atoms/ # Componentes básicos (Button, Input)
│ ├── molecules/ # Combinación de átomos (InputField)
│ ├── organisms/ # Combinación de moléculas (LoginForm)
│ ├── templates/ # Layouts reutilizables (AuthTemplate)
│ └── pages/ # Páginas completas
├── hooks/ # Lógica reutilizable
├── schemas/ # Validaciones Zod
├── services/ # Llamadas a API
├── stores/ # Estado global (Zustand)
└── router/ # Configuración de rutas


## 🧪 Credenciales de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| 👨‍💼 Candidato | `demo@candidato.com` | `123456` |
| 🏢 Empresa | `demo@empresa.com` | `123456` |

## 🚀 Instalación y ejecución

```bash
# Clonar repositorio
git clone https://github.com/kicknash01/plataforma-empleo.git

# Entrar a la carpeta
cd plataforma-empleo

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm run dev

# Abrir http://localhost:5173

📁 Estructura de rutas
Ruta	Descripción	Protegida
/	Selector de rol	❌
/login/candidato	Login candidato	❌
/login/empresa	Login empresa	❌
/registro/candidato	Registro candidato	❌
/registro/empresa	Registro empresa	❌
/dashboard	Dashboard por rol	✅
/editar-perfil/candidato	Editar perfil candidato	✅
/editar-perfil/empresa	Editar perfil empresa	✅

