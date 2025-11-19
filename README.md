
-----

# 🚀 tripzy-frontend-test-dinh-quoc-bao-khang

This is the solution for the Tripzy Frontend test, focusing on building a high-fidelity, highly interactive, and responsive travel search interface (Hero Section) with optimized performance and modern architectural best practices.

## 🌟 Application Demo


* **Vercel Demo Link:** https://tripzy-frontend-test-dinh-quoc-bao.vercel.app/

-----

## 🛠️ Project Setup and Running Instructions

To install and run this project in your local development environment, please follow these steps:

### 1\. Installation

Use your preferred package manager to install the dependencies:

```bash
# If using pnpm (Recommended)
pnpm install

# If using npm
npm install

# If using yarn
yarn install
```

### 2\. Run Development Server

Start the development server with the following command:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The application will be accessible at: **`http://localhost:3000`**

### 3\. Build and Start Production

To create an optimized production build and serve it:

```bash
# Build the project
pnpm build

# Start the production server
pnpm start
```

-----

## 🏗️ Architecture, Libraries, and Key Technical Decisions

### 1\. Key Libraries

| Library | Rationale for Choice |
| :--- | :--- |
| **Next.js** | Provides robust routing, SSR/SSG capabilities, and built-in performance optimizations (Image, Font). |
| **Tailwind CSS** | Chosen for rapid development, utility-first styling, and highly effective responsive design implementation. |
| **shadcn/ui** | Provides accessible, high-quality, and fully customizable UI components (Tabs, Popover, Input) that are styled purely with Tailwind, eliminating CSS conflicts. |
| **Lucide React** | A clean, modern icon library. |
| **date-fns** | Used for reliable date object handling and formatting. |

### 2\. Key Technical Decisions

* **Frontend UI/UX:** Achieved the required multi-column layout and alignment by using **Flexbox utilities** (`flex`, `flex-row`, `flex-grow-[x]`) combined with **responsive classes** (`md:`, `w-full`) to maintain the complex form ratio (2:2:1) on desktop while collapsing to full width on mobile.
* **Form Logic & State Safety:** All form updates are centralized through a **TypeScript generic type** (`FormChangeHandler`), ensuring that the value passed to update the state is **type-safe** and always matches the type defined for that specific field.
* **State Management:** Form state (`formData`) is managed via a **single object** and synchronized with the displaying component's internal state (`searchValue`) using the React **`useEffect`** hook, particularly crucial for the location swap functionality.
* **Autocomplete Implementation:** Used the **`shadcn/ui` Command/Popover** components to build the location search feature, utilizing array filtering on the client-side for immediate results.
* **Routing:** Utilized **`useRouter`** and **`URLSearchParams`** to cleanly serialize the complex `formData` object into a URL query string, demonstrating readiness for API submission.