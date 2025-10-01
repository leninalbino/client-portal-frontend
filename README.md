# 🌟 Client Portal Frontend

¡Bienvenido al **Client Portal Frontend**! Una aplicación web moderna y elegante diseñada para simplificar la gestión de tu catálogo de clientes. Desarrollada con las últimas tecnologías para ofrecerte una experiencia fluida y profesional.

## ✨ ¿Qué hace esta aplicación?

Imagina tener todos tus clientes organizados en una interfaz hermosa y fácil de usar. Esta aplicación te permite:
- 📋 **Gestionar clientes** - Crear, editar, eliminar y visualizar tu base de datos de clientes
- 📱 **Responsive design** - Funciona perfectamente en tu computadora, tablet y teléfono
- 📁 **Subir documentos** - CV en PDF y fotos de perfil para cada cliente
- 📊 **Exportar datos** - Descarga tu listado de clientes en formato CSV
- ✅ **Validaciones inteligentes** - Asegura que todos los datos sean correctos

## 🛠️ Tecnologías utilizadas

Construida con tecnologías modernas y confiables:
- ⚛️ **React 19** con TypeScript para código robusto y mantenible
- 🎨 **Material-UI (MUI)** - Los mejores componentes de interfaz de usuario
- 📝 **React Hook Form** - Formularios potentes y fáciles de usar
- ✅ **Yup** - Validación de datos sin complicaciones
- 🧭 **React Router DOM** - Navegación suave entre páginas
- 🔗 **Fetch API** - Comunicación eficiente con el backend

## 📂 Estructura del proyecto

Una organización limpia y lógica que facilita el mantenimiento y desarrollo:

```
src/
├── components/                 # 🧩 Componentes reutilizables
│   ├── Layout/
│   │   └── Layout.tsx         # 🏗️  Layout principal con navegación
│   └── ClientCatalog/
│       ├── ClientCatalog.tsx  # 📋 Lista de clientes con vista responsiva
│       └── ClientForm.tsx     # 📝 Formulario inteligente de cliente
├── services/
│   └── clientService.ts       # 🔗 Servicios API para comunicación con backend
├── types/
│   └── Client.ts             # 📋 Definiciones TypeScript para tipos seguros
├── App.tsx                   # 🚀 Componente principal de la aplicación
└── index.tsx                 # 🌟 Punto de entrada de React
```

Cada carpeta tiene un propósito específico, haciendo que el código sea fácil de navegar y mantener. ¡Como un armario bien organizado donde encuentras todo rápidamente! 👕👔

## 🌟 Características destacadas

### ✨ Lo que puedes hacer
- 📊 **Catálogo inteligente** - Cambia automáticamente entre vista de tabla (computadora) y tarjetas (celular)
- ⚡ **Gestión completa** - Crear, editar, ver y eliminar clientes con unos pocos clics
- 📝 **Formularios inteligentes** - Se validan solos y te guían para evitar errores
- 📎 **Archivos incluidos** - Sube el CV en PDF y foto de cada cliente fácilmente
- 💾 **Exportación rápida** - Descarga tu lista de clientes en CSV para Excel
- 📱 **Funciona en todos lados** - Perfecto en computadora, tablet y teléfono
- 🔔 **Feedback inmediato** - Te avisa cuando algo sale bien o hay que corregir

### 🛡️ Validaciones que te protegen
- ⚠️ **Campos requeridos** - Te avisa si falta información importante
- 📄 **Formatos correctos** - Solo acepta PDF para CV y JPEG para fotos
- 📏 **Tamaño controlado** - Máximo 5MB por archivo para buen rendimiento
- 📅 **Fechas lógicas** - No permite fechas de nacimiento futuras
- ✂️ **Longitud adecuada** - Mantiene los campos de texto en límites razonables

## 🚀 Instalación y ejecución

¡Pongamos en marcha tu aplicación! Es más fácil de lo que piensas.

### ✅ Lo que necesitas
- **Node.js 18+** - El motor que hace funcionar todo
- **npm** (viene con Node.js) - Para instalar las dependencias
- **Backend corriendo** - Necesitas el servidor backend en `http://localhost:5258`

### 🎯 Pasos para empezar

1. **📥 Clona el proyecto**:
```bash
git clone https://github.com/tu-usuario/client-portal-frontend.git
cd client-portal-frontend
```

2. **📦 Instala las dependencias**:
```bash
npm install
```
   *Esto puede tomar un par de minutos. ¡Ve por un café! ☕*

3. **⚙️ Configura las variables de entorno** (¡Importante para seguridad!):
```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Edita .env.local con tus configuraciones reales
# NUNCA subas archivos .env con datos reales al repositorio
```

4. **▶️ ¡Enciende el servidor!**:
```bash
npm start
```

5. **🌐 Abre tu aplicación**:
   - Ve a: `http://localhost:3000`
   - ¡Listo! Tu aplicación debería estar corriendo ✨

### 🔒 Variables de entorno disponibles:
```bash
VITE_API_URL=http://localhost:5258/api    # URL del backend API
VITE_APP_NAME=Client Portal              # Nombre de la aplicación
VITE_APP_VERSION=1.0.0                   # Versión actual
VITE_ENABLE_DEBUG=true                   # Habilita logs detallados
```

> 💡 **Consejo de seguridad**: Usa `.env.local` para desarrollo y configura diferentes valores para staging/producción

## 🔒 Seguridad y Variables de Entorno

### 🛡️ Mejores Prácticas de Seguridad

**¡La seguridad es primordial!** Especialmente cuando manejas datos de clientes:

#### ❌ Lo que NUNCA debes hacer:
- **NO hardcodear URLs** de producción en el código fuente
- **NO subir archivos .env** con datos reales al repositorio
- **NO exponer credenciales** en el código del frontend
- **NO usar URLs de producción** en desarrollo local

#### ✅ Lo que SÍ debes hacer:
- ✅ **Usar variables de entorno** (`VITE_*`) para toda configuración
- ✅ **Crear diferentes .env** para cada entorno (dev, staging, prod)
- ✅ **Mantener .env.local** en .gitignore (¡ya está configurado!)
- ✅ **Usar HTTPS** en producción para comunicaciones seguras

### 🌍 Estrategia Multi-Entorno

```bash
# Desarrollo local
.env.local              # Tu configuración personal (NO se sube)

# Staging (pruebas)
.env.staging           # Variables para ambiente de pruebas

# Producción
.env.production        # Variables para ambiente productivo
```

### 🔧 Ejemplos por Entorno

```bash
# .env.local (Desarrollo)
VITE_API_URL=http://localhost:5258/api
VITE_ENABLE_DEBUG=true

# .env.staging (Pruebas)
VITE_API_URL=https://api-staging.tuempresa.com/api
VITE_ENABLE_DEBUG=false

# .env.production (Producción)
VITE_API_URL=https://api.tuempresa.com/api
VITE_ENABLE_DEBUG=false
```

### 🚨 Consejos de Seguridad Avanzada

1. **🔐 Usa secretos en plataformas de despliegue**:
   - Netlify: Configura environment variables en el dashboard
   - Vercel: Usa el comando `vercel env add VARIABLE_NAME`

2. **🌐 Configura CORS apropiadamente** en tu backend

3. **📊 Monitorea el acceso** a tu API con logs

4. **🔒 Usa HTTPS obligatorio** en producción

> 💡 **Recuerda**: ¡La seguridad es un proceso continuo! Revisa y actualiza tus configuraciones regularmente 🔄

## 📱 Diseño adaptativo (Responsive)

¡Tu aplicación se ve genial en cualquier dispositivo! ✨

### 🖥️ Vista de escritorio (Desktop)
- 📋 **Tabla completa** - Todas las columnas visibles de un vistazo
- 🔘 **Acciones rápidas** - Botones de editar/eliminar en la misma fila
- 📐 **Formularios amplios** - Modal con layout en grilla para mejor organización

### 📱 Vista móvil (Mobile)
- 🃏 **Tarjetas elegantes** - Cada cliente en su propia tarjeta como una ficha
- ⬆️ **Botones verticales** - Fáciles de tocar con el dedo pulgar
- 👆 **Optimizado para tacto** - Formularios diseñados para pantallas táctiles

> 💡 **Cambio automático**: La aplicación detecta el tamaño de tu pantalla y cambia automáticamente entre vistas. ¡No tienes que hacer nada!

## 🔗 Integración con el backend

### ⚙️ Configuración de la API
La aplicación se conecta automáticamente a tu backend. Solo necesitas configurar la URL:

```typescript
// En el código ya está configurado para usar:
const API_BASE_URL = 'http://localhost:5000/api';
```

### 🔧 Servicios disponibles
Todos los servicios necesarios para gestionar clientes:

- 📋 `getAllClients()` - Trae todos los clientes de la base de datos
- 🔍 `getClientById(id)` - Busca un cliente específico por su ID
- ➕ `createClient(data)` - Crea un nuevo cliente con sus datos y archivos
- ✏️ `updateClient(id, data)` - Actualiza la información de un cliente existente
- 🗑️ `deleteClient(id)` - Elimina un cliente (¡cuidado con esto!)
- 📊 `exportClients()` - Genera archivo CSV con todos los clientes

> 💡 **Consejo**: Todos estos servicios están listos para usar. Solo necesitas que tu backend tenga los endpoints correspondientes.

## 📝 Campos del formulario

### 👤 Información personal
- **Nombres** ⚠️ - Requerido, máximo 100 caracteres
- **Apellidos** ⚠️ - Requerido, máximo 100 caracteres
- **Fecha de Nacimiento** ⚠️ - No puede ser una fecha futura

### 🆔 Documentación
- **Tipo de Documento** - Selecciona entre DNI, RUC o Carnet de Extranjería
- **Número de Documento** ⚠️ - Requerido, máximo 20 caracteres

### 📎 Archivos adjuntos
- **📄 Hoja de Vida (CV)** - Solo formato PDF, máximo 5MB
- **📸 Foto** - Solo formato JPEG, máximo 5MB

> 💡 **Tip útil**: Puedes subir ambos archivos o solo uno. ¡Tú decides qué información necesitas para cada cliente!

## 🎨 Temas y estilos

### 🌈 Esquema de colores
La aplicación usa una paleta de colores profesional y moderna:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',    // 🔵 Azul profesional
    },
    secondary: {
      main: '#dc004e',    // 🔴 Rojo vibrante para acentos
    },
  },
});
```

### 📏 Puntos de quiebre (Responsive breakpoints)
- **xs**: 0px+ 📱 (Teléfonos pequeños)
- **sm**: 600px+ 📱 (Teléfonos grandes)
- **md**: 960px+ 💻 (Tabletas y computadoras pequeñas)
- **lg**: 1280px+ 🖥️ (Computadoras medianas)
- **xl**: 1920px+ 🖥️ (Pantallas grandes)

> 🎯 **Cambio clave**: A partir de 960px (md) cambia automáticamente a la vista de escritorio con tabla completa.

## 🔨 Comandos útiles (Scripts)

Comandos que usarás frecuentemente durante el desarrollo:

```bash
npm start          # 🚀 Inicia el servidor de desarrollo (localhost:3000)
npm run build      # 📦 Crea versión optimizada para producción
npm run preview    # 👀 Vista previa del build de producción
npm test           # 🧪 Ejecuta las pruebas automáticas
```

> 💡 **Consejos prácticos**:
> - Usa `npm start` para desarrollar (cambios en tiempo real)
> - Usa `npm run build` cuando todo esté listo para publicar
> - Usa `npm run preview` para probar cómo se verá en producción

## 📦 Dependencias clave

Estas son las bibliotecas que hacen que todo funcione perfectamente:

```json
{
  "@mui/material": "^7.3.2",           // 🎨 Componentes UI hermosos y modernos
  "@emotion/react": "^11.14.0",       // 💅 Sistema de estilos para Material-UI
  "@emotion/styled": "^11.14.1",      // 🎭 Styled components con emociones
  "@mui/icons-material": "^7.3.2",     // 🎯 Miles de iconos listos para usar
  "react-hook-form": "^7.63.0",       // 📝 Formularios potentes y performantes
  "@hookform/resolvers": "^5.2.2",    // 🔗 Conectores para validaciones
  "yup": "^1.7.1",                    // ✅ Validación de esquemas fácil
  "react-router-dom": "^7.9.3"        // 🧭 Navegación entre páginas
}
```

> 💡 **¿Por qué estas versiones?** Son las más recientes y estables. ¡Menos bugs, más diversión! 🚀

## 🏭 Preparando para producción

Cuando tu aplicación esté lista para el mundo real:

### 1. 📦 Crear el build optimizado
```bash
npm run build
```
*Esto crea la carpeta `build/` con archivos optimizados y minimizados*

### 2. 🌐 Probar el build localmente
```bash
npx serve -s build
```
*Sirve los archivos estáticos en localhost para verificar que todo funciona*

### 3. ⚙️ Variables de entorno para producción
```bash
REACT_APP_API_URL=https://tu-api-backend.com/api
```

> 💡 **Consejo pro**: Siempre prueba el build en local antes de desplegar. ¡Ahorra dolores de cabeza! 😅

## 🚀 Despliegue (Deployment)

¡Lleva tu aplicación al mundo! Aquí tienes las opciones más populares:

### 🌐 Netlify (Recomendado para principiantes)
1. **Conecta tu repositorio** en netlify.com
2. **Configuración automática** - Netlify detecta los comandos
3. **Variables de entorno** - Configura `REACT_APP_API_URL` en el panel
4. **¡Listo!** Tu sitio estará en vivo en minutos

### ⚡ Vercel (Para desarrolladores pro)
```bash
# Instalar la CLI de Vercel
npm i -g vercel

# Desplegar en producción
vercel --prod
```

### 📦 GitHub Pages (Gratis con GitHub)
```bash
# Instalar herramienta de despliegue
npm install --save-dev gh-pages
```

Luego agrega esto a tu `package.json`:
```json
{
  "homepage": "https://tu-usuario.github.io/client-portal-frontend",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

> 💡 **¿Cuál elegir?** Netlify es genial para empezar. Vercel es perfecto si quieres más control. GitHub Pages es 100% gratis pero más básico.

## 🧪 Testing (Pruebas)

¡El código de calidad se prueba solo! Aunque actualmente no hay tests incluidos, aquí te dejo la estructura recomendada:

### 📁 Organización sugerida de tests
```bash
src/
├── components/
│   └── __tests__/              # 🧩 Tests de componentes
│       ├── ClientCatalog.test.tsx
│       └── ClientForm.test.tsx
└── services/
    └── __tests__/              # 🔗 Tests de servicios
        └── clientService.test.ts
```

### 🚀 Comandos para testing
```bash
npm test                    # 👀 Modo vigilancia (re-ejecuta al cambiar código)
npm test -- --coverage      # 📊 Con reporte de cobertura de código
npm test -- --watchAll      # 👁️  Ejecuta todos los tests una vez
```

> 💡 **Tip para desarrolladores**: Los tests son como un seguro para tu código. ¡Te ayudan a dormir tranquilo sabiendo que nada se rompe! 😴

## 🤝 Cómo contribuir

¡Tu ayuda es bienvenida! Cada mejora cuenta 🌟

### Pasos para contribuir:
1. **🍴 Haz un Fork** - Crea tu propia copia del proyecto
2. **🌿 Crea una rama** - `git checkout -b feature/tu-nueva-funcionalidad`
3. **💻 Haz cambios** - Trabaja en tu nueva funcionalidad o mejora
4. **💾 Guarda cambios** - `git commit -m 'Agrega: descripción breve de cambios'`
5. **📤 Sube tu rama** - `git push origin feature/tu-nueva-funcionalidad`
6. **🔄 Crea Pull Request** - ¡Y listo! Revisaremos tu contribución

> 💡 **Tip**: Mantén los commits pequeños y enfocados. ¡Es más fácil revisar cambios específicos! 🔍

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🔗 Recursos útiles

### 📚 Documentación oficial
- [📖 Material-UI (MUI)](https://mui.com/) - La biblia de los componentes UI
- [📝 React Hook Form](https://react-hook-form.com/) - Formularios fáciles y potentes
- [✅ Yup Validation](https://github.com/jquense/yup) - Validación de datos simplificada

### 🔗 Proyectos relacionados
- [🏗️ Backend Repository](https://github.com/tu-usuario/client-portal-backend) - El servidor que complementa esta aplicación

### 🛠️ Herramientas recomendadas
- [🎨 Figma](https://www.figma.com/) - Para diseñar interfaces hermosas
- [📊 Postman](https://www.postman.com/) - Para probar APIs fácilmente
- [🔍 React DevTools](https://react.dev/learn/react-developer-tools) - Debuguea como un pro

> 💡 **¿Necesitas ayuda?** Estos recursos tienen ejemplos y guías detalladas. ¡No reinventes la rueda! 🚲