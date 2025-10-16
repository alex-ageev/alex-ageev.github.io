# ZincArt - Zinc and Copper Cladding Website

A modern, responsive website for ZincArt, specializing in zinc and copper cladding for roofs and facades in Portugal.

## 🌟 Features

- **Multi-language Support**: Portuguese (default), English, and Russian
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: 
  - Materials slider with image gallery
  - FAQ accordion
  - Process workflow visualization
  - Contact forms with validation
- **SEO Optimized**: Meta tags, structured data, and social media integration
- **Performance**: Fast loading with optimized images and assets

## 🚀 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Bootstrap 5**: Responsive framework
- **Swiper.js**: Touch slider functionality
- **GLightbox**: Image gallery lightbox
- **Intersection Observer API**: Scroll-triggered animations

## 📁 Project Structure

```
zincart/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Custom styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript functionality
│   │   └── languages.json  # Multi-language translations
│   ├── images/
│   │   ├── gallery/        # Portfolio images
│   │   ├── header.jpg      # Hero section image
│   │   ├── materials.jpeg  # Materials showcase
│   │   ├── materials-2.jpeg
│   │   ├── logo.png        # Main logo
│   │   └── logo-footer.png # Footer logo
│   └── icons/
│       └── favicon.svg     # Website favicon
├── README.md               # This file
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
└── CONTRIBUTING.md         # Contribution guidelines
```

## 🛠️ Setup and Installation

### Prerequisites
- A modern web browser
- Python 3.x (for local development server)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zincart.git
   cd zincart
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Alternative: Using Node.js (if you have it installed)
   npx serve .
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### Production Deployment

The website is a static site and can be deployed to any web hosting service:

- **GitHub Pages**: Enable in repository settings
- **Netlify**: Drag and drop the folder or connect to GitHub
- **Vercel**: Import from GitHub repository
- **Traditional hosting**: Upload files via FTP/SFTP

## 🌐 Multi-language Support

The website supports three languages:
- **Portuguese (pt)**: Default language
- **English (en)**: Full translation
- **Russian (ru)**: Full translation

Language switching is handled dynamically via JavaScript, with translations stored in `assets/js/languages.json`.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎨 Customization

### Adding New Languages
1. Add language object to `assets/js/languages.json`
2. Update language switcher in `index.html`
3. Add language button to navigation

### Modifying Content
- **Text content**: Edit `assets/js/languages.json`
- **Images**: Replace files in `assets/images/`
- **Styling**: Modify `assets/css/styles.css`
- **Functionality**: Update `assets/js/main.js`

## 📧 Contact Information

- **Phone**: +351 935 610 516
- **Email**: zincart.pt@gmail.com
- **Location**: Portugal (Nationwide service)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📈 SEO Features

- Meta tags for search engines
- Open Graph tags for social media
- Twitter Card support
- Structured data (JSON-LD)
- Semantic HTML markup
- Optimized images and assets

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Changelog

### Version 1.0.0
- Initial release
- Multi-language support (PT, EN, RU)
- Responsive design
- Materials slider
- Contact forms
- SEO optimization

---

**ZincArt** - Premium zinc and copper cladding solutions for Portugal 🇵🇹
