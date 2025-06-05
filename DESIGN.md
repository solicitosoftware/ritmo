# Design System Documentation

## Typography

### Font Families
- **Primary Font (Body)**: Inter
  - Weights: 400 (regular), 500 (medium), 600 (semibold)
  - Usage: Body text, form elements, navigation
  - CSS Variable: `--font-inter`

- **Secondary Font (Headings)**: Poppins
  - Weights: 600 (semibold), 700 (bold)
  - Usage: Headings, display text
  - CSS Variable: `--font-poppins`

### Type Scale
- Display: 3rem (48px) - Poppins Bold
- H1: 2.25rem (36px) - Poppins Semibold
- H2: 1.875rem (30px) - Poppins Semibold
- H3: 1.5rem (24px) - Poppins Semibold
- H4: 1.25rem (20px) - Poppins Semibold
- Body: 1rem (16px) - Inter Regular
- Small: 0.875rem (14px) - Inter Regular
- Tiny: 0.75rem (12px) - Inter Regular

## Color System

### Base Colors
- **Background**
  - Primary: `bg-background` (#121212) - Very dark gray base
  - Secondary: `bg-surface` (#1E1E1E) - Elevated surfaces
  - Tertiary: `bg-muted` (#2C2C2C) - Muted containers

- **Text**
  - Primary: `text-text-base` (#E0E0E0) - Light gray text
  - Secondary: `text-text-muted` (#A0A0A0) - Less emphasis
  - Inverse: `text-text-inverse` (#121212) - Text on light surfaces

### Accent Colors
- **Primary Action**
  - Base: `bg-primary` (#BB86FC) - Neon purple
  - Hover: `hover:bg-primary/90`
  - Active: `active:bg-primary/80`

- **Secondary Action**
  - Base: `bg-secondary` (#03DAC6) - Teal accent
  - Hover: `hover:bg-secondary/90`
  - Active: `active:bg-secondary/80`

- **Highlight**
  - Base: `bg-accent` (#FFB74D) - Warm amber
  - Hover: `hover:bg-accent/90`
  - Text: `text-accent`

### Status Colors
- Error: `text-error`, `bg-error` (#CF6679) - Reddish error tone
- Success: `text-success`, `bg-success` (#4CAF50) - Success green
- Warning: `text-warning`, `bg-warning` (#FF9800) - Warning orange

### Border Colors
- Border: `border-border` (#3C3C3C) - Subtle border color

## Spacing System
- **Layout Spacing**
  - Page padding: `p-6` (1.5rem)
  - Section spacing: `space-y-8` (2rem)
  - Card padding: `p-4` (1rem)

- **Component Spacing**
  - Between elements: `space-y-4` (1rem)
  - Form groups: `space-y-6` (1.5rem)
  - Inline elements: `space-x-2` (0.5rem)

## Elevation
- **Shadow Scale**
  - Level 1: `shadow-sm` (Cards, buttons)
  - Level 2: `shadow` (Dropdowns)
  - Level 3: `shadow-md` (Modals)
  - Level 4: `shadow-lg` (Popovers)

## Component Specific Styles

### Buttons
```tsx
// Primary Button
<button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-text-inverse font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors">
  Button Text
</button>

// Secondary Button
<button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-muted text-text-base font-medium hover:bg-muted/90 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2 transition-colors">
  Button Text
</button>
```

### Forms
```tsx
// Input Field
<input className="block w-full rounded-lg bg-surface border-border shadow-sm focus:border-primary focus:ring-primary text-text-base placeholder-text-muted sm:text-sm" />

// Label
<label className="block text-sm font-medium text-text-base">
  Label Text
</label>
```

### Cards
```tsx
<div className="bg-surface rounded-lg shadow-sm p-4 hover:shadow transition-shadow border border-border">
  Card Content
</div>
```

## Implementation Notes

1. **Theme Concept**
   - Dark theme by default
   - High contrast with careful use of colors
   - Nightclub/modern aesthetic with neon accents
   - Elevated surfaces for depth and hierarchy

2. **Color Usage Guidelines**
   - Use primary (neon purple) for main actions
   - Use secondary (teal) for secondary actions
   - Use accent (amber) for highlights and special elements
   - Maintain WCAG 2.1 AA contrast ratios

3. **Responsive Design**
   - Mobile-first approach
   - Common breakpoints:
     - sm: 640px
     - md: 768px
     - lg: 1024px
     - xl: 1280px

4. **Animation Guidelines**
   - Use `transition-colors` for color changes
   - Use `transition-shadow` for elevation changes
   - Keep animations subtle and purposeful
   - Duration: 150ms-200ms for optimal feedback

5. **Accessibility**
   - Use semantic HTML elements
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain sufficient color contrast
   - Test with screen readers 