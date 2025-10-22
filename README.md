# ShopSmart Sydney - Grocery Price Comparison App

A clean, mobile-first web application for comparing grocery prices across Sydney stores including Coles, Woolworths, and IGA.

## Features

- 🛒 **Real-time Price Comparison**: Compare prices from Coles, Woolworths, and IGA
- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive design
- 🔍 **Smart Search**: Find specific products like "gluten free bread" or "Chobani yoghurt"
- 🏪 **Store Coverage**: Sydney-wide coverage with suburb-specific results
- ⭐ **Beautiful UI**: Clean, minimal design with animated elements
- 🇦🇺 **Aussie Flavor**: Catchy descriptions with local slang

## API Integration

This app integrates with [FoodDataScrape](https://www.fooddatascrape.com/scraping-grocery-prices-coles-woolworths-iga.php) for real-time grocery price data from Australian supermarkets.

### Setup Instructions

1. **Get API Key**: Visit [FoodDataScrape](https://www.fooddatascrape.com/scraping-grocery-prices-coles-woolworths-iga.php) and sign up for an API key

2. **Configure Environment**: Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_FOOD_DATA_SCRAPE_API_KEY=your-api-key-here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## API Features

- **Real-time Data**: Live price updates from Coles, Woolworths, and IGA
- **Promotional Tracking**: Captures deals and limited-time offers
- **Location-based**: Sydney suburb-specific pricing
- **Comprehensive Coverage**: Thousands of products across all categories
- **Fallback System**: Mock data when API is unavailable

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **API**: FoodDataScrape integration
- **Deployment**: Vercel-ready
- **Mobile**: Responsive design with mobile-first approach

## Development

The app uses a hybrid approach:
- **Primary**: FoodDataScrape API for real-time data
- **Fallback**: Enhanced mock data for development/testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

---

Built with ❤️ for Sydney shoppers! 🇦🇺