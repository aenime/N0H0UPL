# Website Image Scraper Documentation

## Overview

The Website Image Scraper is a powerful admin tool that allows you to extract images from any website and import them directly into your media library. This feature includes advanced filtering options to ensure you only get high-quality images that meet your requirements.

## Features

### 🔍 **Smart Image Detection**
- Extracts images from `<img>` tags
- Detects lazy-loaded images (`data-src` attributes)
- Parses `srcset` attributes for responsive images
- Finds CSS background images
- Automatically converts relative URLs to absolute URLs

### 📏 **Advanced Filtering Options**
- **Dimensions**: Set minimum and maximum width/height in pixels
- **File Size**: Filter by minimum and maximum file size in KB
- **Format Support**: Choose from JPG, JPEG, PNG, WebP, GIF, SVG
- **Duplicate Detection**: Automatically removes duplicate images

### 🖼️ **Image Processing**
- Automatic image optimization during import
- Generates thumbnails and metadata
- Preserves original quality while reducing file size
- Extracts image dimensions and technical details

### 📁 **Media Integration**
- Seamlessly imports to existing media library
- Automatically creates "Scraped Images" category
- Preserves original image metadata (alt text, titles)
- Tracks source URLs for reference

## How to Use

### 1. Access the Scraper
1. Go to Admin Dashboard
2. Click on the "Image Scraper" tab (🕷️ icon)

### 2. Configure Filters
Set your desired image criteria:

**Dimensions:**
- Min Width: 100px (default)
- Max Width: 2000px (default)
- Min Height: 100px (default)
- Max Height: 2000px (default)

**File Size:**
- Min Size: 0KB (default)
- Max Size: 5000KB (default)

**Formats:**
Select from: JPG, JPEG, PNG, WebP, GIF, SVG

### 3. Scrape Images
1. Enter the website URL (e.g., `https://example.com`)
2. Click "🔍 Scrape Images"
3. Wait for the scraping process to complete

### 4. Select and Import
1. Review the found images in the grid view
2. Select individual images or use "Select All"
3. Click "📁 Import to Media" to add selected images to your media library

## Technical Details

### API Endpoints

#### `/api/scrape-images` (POST)
Scrapes images from a given URL with filtering options.

**Request Body:**
```json
{
  "url": "https://example.com",
  "filters": {
    "minWidth": 100,
    "maxWidth": 2000,
    "minHeight": 100,
    "maxHeight": 2000,
    "minFileSize": 0,
    "maxFileSize": 5000,
    "formats": ["jpg", "jpeg", "png", "webp", "gif"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "filename": "image.jpg",
      "extension": "jpg",
      "alt": "Image description",
      "title": "Image title",
      "size": 125000,
      "sizeKB": 122,
      "contentType": "image/jpeg"
    }
  ],
  "total": 1,
  "sourceUrl": "https://example.com"
}
```

#### `/api/import-scraped-images` (POST)
Imports selected images to the media library.

**Request Body:**
```json
{
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "filename": "image.jpg",
      "extension": "jpg",
      "alt": "Image description",
      "title": "Image title"
    }
  ]
}
```

### Dependencies
- **cheerio**: HTML parsing and DOM manipulation
- **axios**: HTTP client for web requests
- **sharp**: Image processing and optimization

### Error Handling
The scraper includes comprehensive error handling for:
- Invalid URLs
- Network timeouts
- Website access restrictions
- Image download failures
- File system errors

## Best Practices

### 🤝 **Respect Website Terms**
- Always check website terms of service before scraping
- Be mindful of copyright restrictions
- Use reasonable delays between requests

### ⚡ **Performance Tips**
- Use specific filters to reduce processing time
- Scrape during off-peak hours for large websites
- Limit concurrent scraping operations

### 🔒 **Security Considerations**
- Only scrape trusted websites
- Review images before importing
- Be aware of potential malicious content

## Troubleshooting

### Common Issues

**"Website not found" Error:**
- Check URL spelling and format
- Ensure website is accessible
- Try with `https://` prefix

**"Request timed out" Error:**
- Website may be slow or blocking requests
- Try again later
- Check internet connection

**"No images found" Error:**
- Website may use JavaScript to load images
- Images may be in unsupported formats
- Adjust filter settings

**Import Failures:**
- Check disk space
- Verify file permissions
- Ensure database connectivity

### Limitations
- JavaScript-rendered images may not be detected
- Some websites block automated requests
- Large images may take time to process
- Limited to 50 images per scraping session (for performance)

## Future Enhancements

Planned improvements include:
- JavaScript rendering support
- Bulk website processing
- Advanced image recognition
- Custom naming patterns
- Scheduled scraping tasks
- Image similarity detection

## Support

For technical support or feature requests, please refer to the main documentation or contact the development team.
