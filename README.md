# AI Playground - Frontend Assessment

A polished, frontend-only AI interface prototype built with React, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This project is an interactive AI playground that surveys features from leading AI platforms (OpenAI Playground, Hugging Face Spaces, Anthropic Claude UI, Microsoft Copilot Lab) and combines their best elements into a cohesive interface.

## 🔍 Research

### Platforms Reviewed

1. **OpenAI Playground** - Clean parameter controls, model selection, and real-time interaction
2. **Anthropic Claude UI** - Conversational interface with excellent chat history management
3. **Hugging Face Spaces** - Community-driven with diverse model access
4. **Microsoft Copilot Lab** - Streamlined UX with intelligent suggestions

### Selected Core Features

The following 6 features were chosen for this implementation:

1. **Model Selector** - Dropdown to choose between different AI models (GPT-4, GPT-3.5, Claude variants, custom)
2. **Prompt Editor** - Rich text area with template save/load functionality
3. **Parameters Panel** - Precise control over temperature, max tokens, and top-p sampling
4. **Chat/Output Area** - Message history with copy and download JSON capabilities
5. **Theme Toggle** - Persistent light/dark mode with smooth transitions
6. **Responsive Layout** - Adaptive design from mobile to desktop breakpoints

## 🎨 Design

### Design System

The interface uses a professional, modern aesthetic inspired by leading AI platforms:

- **Color Palette**: Indigo/purple gradient primary (#6366F1 → #A855F7) with neutral grays
- **Typography**: 
  - UI: Inter (weights 300-700)
  - Code/Output: Geist Mono
- **Spacing**: 8px grid system with consistent padding/margins
- **Animations**: Framer Motion for smooth state transitions and micro-interactions

### Tailwind Mapping

All design tokens are defined in the design system:

```css
/* Primary colors */
--primary: 239 84% 67% → Indigo gradient
--accent: 262 83% 58% → Purple accent

/* Neutrals */
--background: 0 0% 100% (light) / 222 47% 7% (dark)
--foreground: 222 47% 11% (light) / 210 40% 98% (dark)

/* Semantic tokens */
--muted: Subtle backgrounds
--border: Consistent borders
--card: Elevated surfaces
```

### Component Variants

Custom button variants for different contexts:
- `default` - Standard actions
- `outline` - Secondary actions  
- `ghost` - Minimal chrome for icons

## 💻 Development

### Tech Stack

- **Framework**: React 18 with TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui (customized)
- **Animations**: Framer Motion
- **State Management**: React Context API (for theme)
- **Routing**: React Router v6

### Key Features Implementation

#### 1. Model Selector
Located in `src/components/ModelSelector.tsx`
- Dropdown/select component with model metadata
- Shows provider and max token info
- Persists selection across sessions

#### 2. Prompt Editor  
Located in `src/components/PromptEditor.tsx`
- Textarea with monospace font for code
- Template loading from mock API
- Save functionality with toast notifications

#### 3. Parameters Panel
Located in `src/components/ParametersPanel.tsx`
- Three sliders: temperature (0-2), max tokens (100-4096), top-p (0-1)
- Real-time value display
- Helper text explaining each parameter

#### 4. Chat/Output Area
Located in `src/components/ChatOutput.tsx`
- Message list with user/assistant roles
- Copy button for each message
- Download entire conversation as JSON
- Loading states with skeleton UI
- Smooth animations for new messages

#### 5. Theme Toggle
Located in `src/components/ThemeToggle.tsx` and `src/contexts/ThemeContext.tsx`
- Light/dark mode switch
- Persisted in localStorage
- Smooth transitions between themes
- System-wide theme context

#### 6. Responsive Layout
- Mobile-first approach
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Sidebar stacks on mobile
- Grid layout adapts: 1 column (mobile) → 12-column grid (desktop)

### Data & State Management

#### Mock API (`src/lib/mockApi.ts`)
- `fetchModels()` - Returns list of available AI models
- `fetchTemplates()` - Returns prompt templates
- `generateResponse()` - Simulates AI response with delay
- All functions return Promises to simulate async operations

#### Loading States
- Skeleton loaders while fetching initial data
- Spinner during response generation
- Error boundaries for failed requests

### Accessibility & UX Polish

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Focus States**: Visible focus indicators on all controls
- **Animations**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG AA compliant in both themes
- **Semantic HTML**: Proper heading hierarchy and landmarks

### File Structure

```
src/
├── components/
│   ├── ui/              # Shadcn components
│   ├── ModelSelector.tsx
│   ├── ParametersPanel.tsx
│   ├── PromptEditor.tsx
│   ├── ChatOutput.tsx
│   └── ThemeToggle.tsx
├── contexts/
│   └── ThemeContext.tsx
├── lib/
│   ├── mockApi.ts       # Mock API functions
│   └── utils.ts
├── pages/
│   ├── Index.tsx        # Main playground page
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css            # Design system tokens
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ai-playground

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 📝 Implementation Notes

### Design Decisions

1. **No Storybook**: While the assessment mentions Storybook, this Lovable environment doesn't support it. All components are fully functional in the main app for demonstration.

2. **Mock API**: Since this is frontend-only, all AI responses are simulated. In production, these would connect to real API endpoints.

3. **State Management**: Used React Context for theme management as it's lightweight and sufficient for this scope. Larger apps might use Redux/Zustand.

4. **Responsive Strategy**: Mobile-first CSS with Tailwind breakpoints ensures optimal experience across devices.

### Known Limitations

- No actual AI model integration (intentional for frontend-only demo)
- Template saving is client-side only (localStorage could be added)
- No user authentication or data persistence
- Limited error handling for network requests

### Future Enhancements

- Real API integration with OpenAI/Anthropic
- User authentication and saved conversations
- More sophisticated prompt engineering tools
- Streaming responses for real-time output
- Collaborative features for team usage

## 📄 License

This is an assessment project for educational purposes.

---

**Note**: To hide the "Edit in Lovable" badge when deploying, go to Project Settings → Hide 'Lovable' Badge in your Lovable dashboard.
