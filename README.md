# Sydney Grocery Compare 🛒

A modern, elegant web application that compares grocery prices across Sydney stores. Find the best deals on everything from basic groceries to specific dietary requirements like gluten-free bread and organic products.

## ✨ Features

- **🔍 Smart Search**: Search for specific products like "gluten free bread" or "Chobani yoghurt"
- **📊 Price Comparison**: Compare prices across Woolworths, Coles, IGA, Aldi, and more
- **🏷️ Detailed Product Info**: See dietary information, brands, and categories
- **📍 Location-Based**: Filter by Sydney suburbs and areas
- **⚡ Real-Time Data**: Updated prices with timestamps
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sydney-grocery-compare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment**: Vercel (recommended)

## 📊 Data Sources & APIs

### Current Implementation
The app currently uses **enhanced mock data** with realistic Australian grocery products including:
- Gluten-free bread options (Helga's, Schar, Coles brand)
- Greek yoghurt brands (Chobani, Danone)
- Organic and specialty products
- Detailed dietary information and brand data

### Real API Integration Options

#### 1. AusGroceryData (Recommended)
- **Website**: [ausgrocerydata.com](https://ausgrocerydata.com)
- **Data**: CSV downloads with updated product prices
- **Coverage**: Woolworths, Coles, IGA, Aldi, and more
- **Specificity**: Very detailed product information
- **API Status**: Coming soon (currently CSV downloads)

#### 2. FoodDataScrape
- **Website**: [fooddatascrape.com](https://www.fooddatascrape.com/scraping-grocery-prices-coles-woolworths-iga.php)
- **Service**: Advanced grocery data scraping
- **Coverage**: Coles, Woolworths, IGA
- **Features**: Live prices, discounts, inventory levels

#### 3. Direct Store APIs
- **Woolworths**: No public API available
- **Coles**: No public API available
- **IGA**: No public API available
- **Aldi**: No public API available

## 🔧 API Integration Guide

### Setting Up Real Data Sources

#### Option 1: AusGroceryData Integration

1. **Sign up for AusGroceryData service**
2. **Download CSV data** or wait for API access
3. **Implement data parser**:

```typescript
// src/lib/aus-grocery-data.ts
export async function parseAusGroceryDataCSV(csvData: string): Promise<GroceryItem[]> {
  // Parse CSV and convert to GroceryItem format
  // Handle dietary info, brands, and specific product details
}
```

#### Option 2: FoodDataScrape Integration

1. **Set up scraping service account**
2. **Configure API endpoints**:

```typescript
// src/lib/food-data-scrape.ts
export async function fetchFromFoodDataScrape(query: string): Promise<GroceryItem[]> {
  const response = await fetch('https://api.fooddatascrape.com/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.FOOD_DATA_SCRAPE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      stores: ['woolworths', 'coles', 'iga'],
      location: 'sydney'
    })
  })
  
  return parseScrapeResponse(await response.json())
}
```

### Environment Variables

Create a `.env.local` file:

```env
# FoodDataScrape API
FOOD_DATA_SCRAPE_API_KEY=your_api_key_here

# AusGroceryData API (when available)
AUS_GROCERY_DATA_API_KEY=your_api_key_here

# Optional: Google Maps API for distance calculations
GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🎯 Usage Examples

### Search for Specific Products

- **Gluten-free bread**: `gluten free bread`
- **Brand-specific yoghurt**: `Chobani yoghurt`
- **Organic products**: `organic milk`
- **Dietary requirements**: `vegan cheese`
- **Low-carb options**: `low carb bread`

### Filter Options

- **By Suburb**: Filter results to specific Sydney areas
- **By Store**: Show only Woolworths, Coles, etc.
- **By Price**: Sort by lowest price or unit price
- **By Date**: Show most recently updated prices

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── SearchBar.tsx       # Search component with autocomplete
│   ├── ComparisonTable.tsx # Results table with sorting
│   └── FilterPanel.tsx     # Filtering options
├── lib/
│   ├── utils.ts           # Utility functions
│   └── grocery-api.ts     # API integration layer
└── types/
    └── grocery.ts         # TypeScript interfaces
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

- **Netlify**: Works with Next.js static export
- **AWS Amplify**: Full-stack deployment
- **Railway**: Simple Node.js deployment

## 🔮 Future Enhancements

### Phase 2 Features
- **📍 Distance-based sorting**: Sort by distance from user location
- **🗺️ Map integration**: Show store locations on a map
- **📱 Mobile app**: React Native version
- **🔔 Price alerts**: Notify when prices drop
- **📊 Price history**: Track price trends over time

### Advanced Features
- **🤖 AI-powered recommendations**: Suggest alternatives
- **📈 Price prediction**: Predict future price changes
- **🛒 Shopping lists**: Save and compare lists
- **💳 Payment integration**: Direct checkout options

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: your-email@example.com

## 🙏 Acknowledgments

- **AusGroceryData** for providing Australian grocery data
- **FoodDataScrape** for web scraping services
- **Tailwind CSS** for the beautiful design system
- **Next.js team** for the amazing framework

---

**Made with ❤️ for Sydney shoppers**

*Find the best deals, save money, and shop smarter!*