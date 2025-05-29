const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

async function generateFavicons() {
  console.log('Generating favicons...');
  
  const sizes = [16, 32, 48, 64, 72, 96, 128, 192, 256, 512];
  const inputPath = path.join(process.cwd(), 'public/images/logo.png');
  const outputDir = path.join(process.cwd(), 'public/favicon');
  
  try {
    // Create favicon directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    // Generate ico file (16x16)
    await sharp(inputPath)
      .resize(16, 16)
      .toFile(path.join(process.cwd(), 'public/favicon.ico'));
    
    console.log('Generated favicon.ico');
    
    // Generate different size PNG favicons
    for (const size of sizes) {
      await sharp(inputPath)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
      console.log(`Generated ${size}x${size} favicon`);
    }
    
    // Create apple-touch-icon
    await sharp(inputPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');
    
    // Create manifest.json
    const manifest = {
      name: 'करुणा For All',
      short_name: 'करुणा',
      icons: [
        {
          src: '/favicon/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/favicon/favicon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      theme_color: '#f97316',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone'
    };
    
    await fs.writeFile(
      path.join(process.cwd(), 'public/manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('Generated manifest.json');
    
    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
