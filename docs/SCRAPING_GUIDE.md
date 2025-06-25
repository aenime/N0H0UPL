# Web Scraping Utilities Documentation

This project includes comprehensive web scraping utilities built with Puppeteer for extracting images from websites.

## Features

- **Image Scraping**: Extract images from web pages with filtering options
- **Image Downloading**: Download and save images locally with optimization
- **Metadata Extraction**: Extract page titles, descriptions, and image metadata
- **TypeScript Support**: Fully typed interfaces and functions
- **Error Handling**: Robust error handling and timeout management

## Core Components

### 1. scrapeUtils.ts

The main scraping utility with Puppeteer-based image extraction.

#### Key Functions

```typescript
import { scrapeImages, ScrapeOptions, ScrapeResult } from './lib/utils/scrapeUtils';

// Basic scraping
const result = await scrapeImages('https://example.com');

// Advanced scraping with options
const result = await scrapeImages('https://example.com', {
  maxImages: 20,
  minWidth: 300,
  minHeight: 300,
  downloadImages: true,
  outputDir: './public/uploads',
  timeout: 30000,
  waitForSelector: 'img',
  userAgent: 'Custom User Agent'
});
```

#### ScrapeOptions Interface

```typescript
interface ScrapeOptions {
  maxImages?: number;        // Maximum images to scrape (default: 50)
  minWidth?: number;         // Minimum image width (default: 100)
  minHeight?: number;        // Minimum image height (default: 100)
  downloadImages?: boolean;  // Whether to download images (default: true)
  outputDir?: string;        // Output directory (default: './public/uploads')
  timeout?: number;          // Page timeout (default: 30000ms)
  waitForSelector?: string;  // Selector to wait for (default: 'img')
  userAgent?: string;        // Custom user agent
}
```

#### ScrapeResult Interface

```typescript
interface ScrapeResult {
  images: ScrapedImage[];
  metadata: {
    url: string;
    title?: string;
    description?: string;
    scrapedAt: Date;
    totalImages: number;
  };
}
```

### 2. imageUtils.ts

Utility functions for image handling and processing.

#### Key Functions

```typescript
import { downloadImage, validateImageUrl, normalizeImageUrl } from './lib/utils/imageUtils';

// Download an image
const result = await downloadImage(
  'https://example.com/image.jpg',
  './public/uploads',
  'custom-filename.jpg'
);

// Validate image URL
const isValid = validateImageUrl('https://example.com/image.jpg');

// Normalize relative URLs
const fullUrl = normalizeImageUrl('/image.jpg', 'https://example.com');
```

### 3. Enhanced Scraper API

RESTful API endpoint for scraping images via HTTP requests.

#### Endpoint: `POST /api/enhanced-scraper`

```typescript
// Request body
{
  url: string;
  options?: ScrapeOptions;
}

// Response
{
  success: boolean;
  data?: {
    images: Array<{
      url: string;
      alt?: string;
      localPath?: string;
      filename?: string;
    }>;
    metadata: {
      url: string;
      title?: string;
      description?: string;
      scrapedAt: string;
      totalImages: number;
    };
  };
  error?: string;
}
```

#### Example API Usage

```javascript
const response = await fetch('/api/enhanced-scraper', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    options: {
      maxImages: 10,
      minWidth: 300,
      minHeight: 300,
      downloadImages: true
    }
  })
});

const result = await response.json();
if (result.success) {
  console.log('Scraped images:', result.data.images);
}
```

## Installation & Setup

### Dependencies

The scraping utilities require these packages:

```bash
npm install puppeteer uuid axios sharp mongoose
npm install --save-dev @types/uuid
```

### Environment Setup

Ensure you have the following directories:
- `./public/uploads` - For downloaded images
- `./lib/utils` - For utility files

### Browser Requirements

Puppeteer will download Chromium automatically. For production environments, you may want to use a system-installed Chrome:

```typescript
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome', // Linux
  // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
});
```

## Usage Examples

### 1. Basic Image Scraping

```typescript
import { scrapeImages } from './lib/utils/scrapeUtils';

async function basicScraping() {
  const result = await scrapeImages('https://unsplash.com');
  console.log(`Found ${result.images.length} images`);
  
  result.images.forEach(img => {
    console.log(`Image: ${img.url}`);
    if (img.localPath) {
      console.log(`Downloaded to: ${img.localPath}`);
    }
  });
}
```

### 2. High-Quality Image Filtering

```typescript
async function scrapeHighQualityImages() {
  const result = await scrapeImages('https://example.com', {
    maxImages: 10,
    minWidth: 1920,
    minHeight: 1080,
    downloadImages: true,
    outputDir: './public/images/high-res'
  });
  
  console.log(`Downloaded ${result.images.length} high-quality images`);
}
```

### 3. Custom Processing

```typescript
import { scrapeImages } from './lib/utils/scrapeUtils';
import { extractImageMetadata } from './lib/utils/imageUtils';

async function scrapeWithMetadata() {
  const result = await scrapeImages('https://example.com', {
    downloadImages: true
  });
  
  for (const image of result.images) {
    if (image.localPath) {
      const metadata = await extractImageMetadata(image.localPath);
      console.log(`Image: ${image.filename}`);
      console.log(`Size: ${metadata.size} bytes`);
      console.log(`Format: ${metadata.format}`);
    }
  }
}
```

## Error Handling

The utilities include comprehensive error handling:

```typescript
try {
  const result = await scrapeImages('https://example.com');
  // Process result
} catch (error) {
  if (error.message.includes('timeout')) {
    console.error('Page took too long to load');
  } else if (error.message.includes('Navigation failed')) {
    console.error('Could not access the website');
  } else {
    console.error('Scraping failed:', error.message);
  }
}
```

## Performance Considerations

1. **Concurrent Limits**: Avoid running too many scraping operations simultaneously
2. **Memory Usage**: Puppeteer can be memory-intensive for large pages
3. **Timeout Settings**: Adjust timeouts based on target websites
4. **Image Optimization**: Large images are automatically resized and compressed

## Security & Ethics

1. **Respect robots.txt**: Check website scraping policies
2. **Rate Limiting**: Implement delays between requests
3. **User Agent**: Use appropriate user agents
4. **Legal Compliance**: Ensure scraping complies with website terms

## Testing

Run the test script to verify functionality:

```bash
node test-scraping.js
```

This will test basic scraping and image download capabilities.

## Troubleshooting

### Common Issues

1. **Puppeteer Installation**: If Puppeteer fails to install, try:
   ```bash
   npm install puppeteer --unsafe-perm=true
   ```

2. **Permission Errors**: Ensure write permissions for output directories

3. **Memory Issues**: For large-scale scraping, consider:
   ```typescript
   const browser = await puppeteer.launch({
     args: ['--no-sandbox', '--disable-dev-shm-usage']
   });
   ```

4. **Network Timeouts**: Increase timeout for slow websites:
   ```typescript
   await scrapeImages(url, { timeout: 60000 });
   ```

## License

This scraping utility is part of the Karuna For All project and follows the same licensing terms.
