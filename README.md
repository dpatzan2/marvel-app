# Marvel Epic Verse Forge

A modern React application built with TypeScript and Vite that showcases Marvel characters using the official Marvel API. Explore the vast universe of Marvel superheroes with an intuitive and responsive interface.

## 🚀 Features

- **Marvel Character Browser**: Browse through thousands of Marvel characters
- **Search Functionality**: Find characters by name with real-time search
- **Responsive Design**: Optimized for desktop and mobile devices
- **Character Details**: View detailed information about each character
- **Modern UI**: Clean and intuitive user interface
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **Marvel API** - Official Marvel Comics API
- **Crypto-JS** - For API authentication
- **CSS3** - Modern styling

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dpatzan2/marvel-app
   cd marvel-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Marvel API keys:
   ```env
   VITE_MARVEL_PUBLIC_KEY=your_public_key_here
   VITE_MARVEL_PRIVATE_KEY=your_private_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔑 Getting Marvel API Keys

1. Visit the [Marvel Developer Portal](https://developer.marvel.com/)
2. Create an account or sign in
3. Create a new app to get your public and private keys
4. Add your keys to the `.env` file

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── services/           # API services and utilities
│   └── marvelApi.ts   # Marvel API integration
├── types/             # TypeScript type definitions
├── styles/            # CSS and styling files
└── App.tsx           # Main application component
```

## 🎨 Features in Detail

### Character Search

- Real-time search as you type
- Filter characters by name
- Pagination support for large result sets

### Character Display

- Grid layout for character browsing
- Character images and names
- Detailed character information

### API Integration

- Secure Marvel API authentication
- Error handling and loading states
- Optimized API calls with proper rate limiting



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/dpatzan2/marvel-app/blob/main/LICENSE) file for details.


