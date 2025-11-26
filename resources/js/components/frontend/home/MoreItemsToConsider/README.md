# More Items to Consider Components

This directory contains JSX components that recreate the "More Items to Consider" section from the HTML reference, built with Tailwind CSS and a component-based architecture.

## Components

### MoreItemsToConsider (Main Component)
The main component that orchestrates the entire section.

**Features:**
- Responsive grid layout (1 column on mobile, up to 6 columns on desktop)
- Load More/Show Less functionality
- Combines all card types in the correct order

### ProductCard
Displays individual product information in a card format.

**Props:**
- `product` (object): Product data including:
  - `id`: Product identifier
  - `title`: Product name
  - `image`: Product image URL
  - `rating`: Star rating (0-5)
  - `reviewCount`: Number of reviews
  - `currentPrice`: Current price
  - `originalPrice`: Original price (optional)
  - `promo`: Promotional text (optional)
  - `badge`: Badge object with type and text (optional)
  - `hasVideo`: Boolean for video indicator (optional)
  - `freeShipping`: Boolean for free shipping indicator (optional)

### PCBuildsCard
Special card for PC build bundles with savings display.

**Props:**
- `build` (object): Build data including:
  - `title`: Build title
  - `linkText`: Link text
  - `currentPrice`: Current price
  - `originalPrice`: Original price
  - `savings`: Amount saved
  - `products`: Array of product objects with name and image

### BannerCard
Promotional banner card with call-to-action.

**Props:**
- `banner` (object): Banner data including:
  - `title`: Banner title (supports line breaks with commas)
  - `image`: Banner image URL
  - `linkText`: Link text
  - `href`: Link URL
  - `onClick`: Click handler function

## Usage

```jsx
import MoreItemsToConsider from './components/home/MoreItemsToConsider';

function App() {
  return (
    <div>
      <MoreItemsToConsider />
    </div>
  );
}
```

## Styling

All components use Tailwind CSS classes for styling and are fully responsive. The design matches the original HTML reference with:

- Rounded corners and subtle shadows
- Proper color schemes (blue for headers, orange for promotions)
- Responsive grid layouts
- Hover effects and transitions
- Proper typography hierarchy

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects, click handlers
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Modular Architecture**: Each card type is a separate component
- **Data-Driven**: Easy to modify content through props
