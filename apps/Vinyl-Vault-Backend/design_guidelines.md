# Vinyl Shop Inventory Management - Design Guidelines

## Design Approach

**Selected Framework**: Custom mobile-first system inspired by modern iOS design patterns with Material Design touch targets, prioritizing tactile efficiency and visual clarity for inventory management workflows.

**Core Principles**:
- Mobile-first with touch-optimized interactions (minimum 44px touch targets)
- Bright, energetic color palette with high contrast for outdoor/warehouse use
- Generous whitespace for visual breathing room
- Clear visual hierarchy through size and weight, not color alone
- Single-column layouts with full-width components on mobile

## Typography

**Font Stack**: 
- Primary: Inter (via Google Fonts) - for all UI elements
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

**Type Scale**:
- Screen Titles: text-2xl (24px) font-bold
- Section Headers: text-lg (18px) font-semibold
- Form Labels: text-sm (14px) font-medium, uppercase tracking-wide
- Body Text: text-base (16px) font-normal
- Helper Text: text-sm (14px) font-normal, opacity-70
- Button Text: text-base (16px) font-semibold

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 3, 4, 6, 8, 12, 16
- Component padding: p-4 (16px)
- Section spacing: space-y-6 or gap-6 (24px)
- Card margins: m-4 (16px)
- Large button padding: px-6 py-4 (24px/16px)
- Form field spacing: space-y-4 (16px)

**Container Strategy**:
- Mobile: Full-width with px-4 side padding
- Desktop: max-w-2xl mx-auto (constrained to 672px for readability)

## Component Library

### Navigation
- **Header Bar**: Fixed top, h-14, shadow-sm, with back arrow (when not home), screen title centered, action icon right (if needed)
- **Bottom Sticky Actions**: Fixed bottom bar with shadow-lg, safe-area padding, primary actions always visible

### Buttons
- **Primary (Print/Save)**: Full-width on mobile, rounded-lg, py-4, text-base font-semibold, shadow-md
- **Secondary (Save as Draft)**: Same size as primary, outlined variant
- **Grid Buttons (Home)**: Large square/rounded tiles in 2x2 grid, min-h-32, with icon above text, centered
- **Icon Buttons**: 44x44px minimum, rounded-full for circular buttons

### Forms
- **Input Fields**: Full-width, h-12 minimum, rounded-lg, border-2, px-4, text-base
- **Labels**: Above inputs, text-sm font-medium, mb-2, text-left
- **Checkboxes**: Large custom styled, min 24x24px touch target, with label inline
- **Select Dropdowns**: Same height as inputs (h-12), clear down arrow indicator
- **Number Inputs**: Centered text for quantity, large +/- buttons flanking

### Cards (Inventory Views)
- **List Cards**: Full-width, rounded-lg, p-4, shadow-sm, border-l-4 (accent border for status)
- **Card Content**: Artist (text-base font-semibold), Release title (text-sm), metadata pills below (rounded-full badges)
- **Status Pills**: Small rounded-full badges with icons, showing In Store/Online/Draft/Hold flags

### Modals
- **Marketplace Selector**: Slide-up sheet from bottom, rounded-t-2xl, max-h-[80vh], with close button top-right
- **Location Picker**: Similar slide-up pattern with search/create functionality

### Image Components
- **Photo Preview**: Full-width aspect-video or aspect-square, rounded-lg, object-cover
- **Camera Trigger**: Large button with camera icon, dashed border when no image

### Data Display
- **Metadata Grid**: 2-column grid on mobile for yes/no checkboxes, labels left-aligned
- **Details Screen**: Card-based sections with clear headers, full metadata display

## Screen-Specific Patterns

### Home Screen
- 2x2 grid of large navigation buttons
- Equal height squares with icons (64px) centered above text
- Generous gap-4 between buttons
- Simple header with app title/logo

### Scan Flow
- Choice screen: Two large options stacked vertically, full-width buttons
- Camera view: Native camera input, preview shown immediately after capture

### Add Vinyl Form
- Sticky header with "Add Vinyl" title and back button
- Image preview at top (if present), full-width
- Form sections grouped logically with subtle section headers (text-xs uppercase tracking-wide opacity-60)
- Sticky bottom bar with inventory controls (checkboxes) and primary actions
- Clear required field indicators (asterisk in label)

### Inventory Views
- Search/filter bar at top (if implementing search)
- Scrollable card list with pull-to-refresh
- Empty state with illustration and "Add your first vinyl" message
- Tap card to view details

### Detail/Edit Screen
- Header with back and edit actions
- Large image at top
- Tabbed or sectioned content (Details / Condition / Inventory)
- Bottom action bar with Delete and Sold buttons

## Accessibility
- Minimum 44x44px touch targets throughout
- Clear focus states (ring-2 ring-offset-2)
- High contrast text (WCAG AA minimum)
- Labels always visible, not placeholder-dependent
- Logical tab order in forms

## Animations
Use sparingly:
- Slide-in transitions for modals (300ms ease-out)
- Fade transitions for screen changes (200ms)
- Subtle scale on button press (scale-95 active state)
- No loading spinners longer than necessary

## Print View
- Minimal, text-focused layout
- All relevant vinyl details in easy-to-read format
- QR code or barcode if implementing
- Print-specific CSS to hide navigation/actions

This mobile-first design prioritizes speed, clarity, and ease of use in a warehouse/retail environment with bright, high-contrast visuals and thumb-friendly interactions.