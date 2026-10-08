# U-Found — Sistema de Objetos Perdidos del Campus (URP)

> **Laboratorio 02: Librería de Componentes Core, Tema y Catálogo Interactivo**  
> **Curso:** Aplicaciones Móviles — 2026-II  
> **Universidad Ricardo Palma (URP)**

---

## 👥 Integrantes del Equipo

| Integrante | Correo Institucional | Rol / Componentes asignados |
| :--- | :--- | :--- |
| **Abraham Nicolás Delgado Salazar** | `202310086@urp.edu.pe` | `src/theme/`, `Button.js` (Acción), `PinInput.js` (Entrada OTP) |
| **Héctor Sebastián Galicia Oviedo** | `202310524@urp.edu.pe` | `CategoryChip.js` (Acción), `SearchInput.js` (Entrada), `EmptyState.js` (Dato) |
| **Julio Josué Vega Gómez** | `202110489@urp.edu.pe` | `StatusBadge.js` (Dato), `ItemCard.js` (Contenedor), `src/viewer/`, `FeedScreen.js` |

---

## 📱 Sobre U-Found

**U-Found** es una aplicación móvil orientada a la comunidad universitaria de la **Universidad Ricardo Palma** que centraliza, agiliza y formaliza la recuperación de objetos extraviados dentro del campus (aulas, laboratorios, cafeterías y patios), fomentando la solidaridad estudiantil mediante el uso de tecnología móvil.

### Funcionalidades Clave del Proyecto
1. **Formulario de reporte con cámara:** Publicar un objeto (como "Perdido" o "Encontrado") con foto, categoría y lugar en el campus.
2. **Feed y búsqueda filtrada:** Lista principal con filtros por estado, categoría y palabras clave.
3. **Entrega segura mediante PIN (OTP):** Sistema antifraude donde quien encontró el objeto valida un PIN secreto de 4 dígitos proporcionado por el dueño legítimo para formalizar la devolución física.

---

## 📋 Cumplimiento de Requisitos del Laboratorio 02

| N.º | Requisito | Estado | Detalle de Implementación |
| :---: | :--- | :---: | :--- |
| **1** | **Tema en `src/theme/`** | ✅ Cumplido | Paleta inspirada en U-Found (`colors.js`), tipografía (`typography.js`), espaciados (`spacing.js`), radios (`radius.js`) y sombras (`shadows.js`), exportados unificados desde `src/theme/index.js`. |
| **2** | **Mínimo 5 componentes en `src/components/`** | ✅ Cumplido (7 creados) | Un archivo por componente con `export default`: <br>• **Acción:** `Button.js`, `CategoryChip.js`<br>• **Entrada:** `SearchInput.js`, `PinInput.js`<br>• **Contenedor / Dato:** `StatusBadge.js`, `ItemCard.js`, `EmptyState.js` |
| **3** | **Eventos y Entradas Controladas** | ✅ Cumplido | `Button` (`onPress`), `CategoryChip` (`onPress`), `SearchInput` (`value`, `onChangeText`, `onClear`), `PinInput` (`value`, `onChangeText`, `onComplete`), `ItemCard` (`onPress`), `EmptyState` (`onAction`). |
| **4** | **Sin valores sueltos** | ✅ Cumplido | El 100% de colores, fuentes, radios y márgenes provienen de los tokens del tema. Todos los componentes aceptan la propiedad `style` para personalización exterior. |
| **5** | **Catálogo con Demos interactivos** | ✅ Cumplido | Implementado en `src/viewer/catalog.js` y `src/viewer/CatalogScreen.js`, con estado independiente (`useState`) para interactuar con cada componente en vivo y filtrar por categorías. |
| **6** | **Uso real en pantalla del proyecto** | ✅ Cumplido | `src/screens/FeedScreen.js` implementa el feed del campus URP integrando todos los componentes: búsqueda en vivo, filtros de categorías, tarjetas de objetos, y modal interactivo de entrega segura con validación PIN OTP. |

---

## 📂 Estructura del Proyecto

```text
u-found/
├── assets/                  # Iconos y recursos visuales
├── src/
│   ├── theme/               # Sistema de diseño central
│   │   ├── colors.js        # Paleta institucional U-Found / URP
│   │   ├── typography.js    # Tamaños y pesos tipográficos
│   │   ├── spacing.js       # Escala de espaciados consistentes
│   │   ├── radius.js        # Radios de bordes redondeados
│   │   ├── shadows.js       # Sombras y elevaciones
│   │   └── index.js         # Exportación unificada del tema
│   ├── components/          # Librería Core de componentes
│   │   ├── Button.js        # Componente de Acción (primario, secundario, contorno, alerta)
│   │   ├── CategoryChip.js  # Componente de Acción (chip de filtrado por categoría)
│   │   ├── SearchInput.js   # Componente de Entrada (buscador controlado con reset)
│   │   ├── PinInput.js      # Componente de Entrada (código OTP de 4 dígitos)
│   │   ├── StatusBadge.js   # Componente de Dato (indicador semántico de estado)
│   │   ├── ItemCard.js      # Componente Contenedor (tarjeta del feed universitario)
│   │   ├── EmptyState.js    # Componente Contenedor (vista de sin resultados)
│   │   └── index.js         # Barrel export de componentes
│   ├── viewer/              # Visor de catálogo del laboratorio
│   │   ├── catalog.js       # Demos interactivos y definición de componentes
│   │   └── CatalogScreen.js # Pantalla de catálogo con filtros
│   └── screens/             # Pantallas del flujo real de U-Found
│       └── FeedScreen.js    # Pantalla principal con feed y validación OTP
├── App.js                   # Switcher interactivo: Catálogo Lab 02 ⟷ App U-Found
├── app.json
└── package.json
```

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor Expo:**
   ```bash
   npm start
   ```

3. **Abrir en tu dispositivo o emulador:**
   * **Android:** Presiona `a` en la terminal o escanea el QR desde la app **Expo Go**.
   * **iOS:** Presiona `i` en la terminal (requiere macOS) o escanea el QR con la cámara.
   * **Web:** Presiona `w` para abrir en el navegador.

En la barra superior de la aplicación podrás alternar entre:
* **📋 Catálogo Lab 02:** Para inspeccionar y probar los componentes de forma aislada.
* **📱 App U-Found (Feed Real):** Para ver la experiencia completa de la aplicación en el campus universitario.
