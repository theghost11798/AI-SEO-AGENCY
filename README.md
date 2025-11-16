# AI SEO Agency Website

A professional one-page 3D website for AI SEO Agency, showcasing SEO services with modern design and animations.

## 🌟 Features

- **3D Animated Background**: Floating geometric shapes with CSS 3D transforms
- **Modern Design**: Gradient colors, glitch effects, and smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **GitHub Pages Ready**: No build process required, pure HTML/CSS/JS
- **Professional Sections**: Hero, Services, About/Stats, and Contact form

## 🚀 Live Demo

The website can be viewed at: `https://theghost11798.github.io/AI-SEO-AGENCY/`

## 📦 Deployment to GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select the branch you want to deploy (e.g., `main` or `copilot/create-3d-webpage-ai-seo-agency`)
4. Click "Save"
5. Your website will be live at `https://theghost11798.github.io/AI-SEO-AGENCY/`

## 🎨 Customization

### Colors
The website uses CSS custom properties (variables) for easy color customization. Edit `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    --dark-bg: #0f172a;
    --light-text: #f1f5f9;
    --card-bg: rgba(15, 23, 42, 0.8);
}
```

### Content
Edit `index.html` to update:
- Company name and branding
- Service offerings
- Statistics and features
- Contact form fields

### 3D Effects
Modify `script.js` to adjust:
- Number of floating shapes
- Animation speeds
- Shape types and colors

## 📄 Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - 3D background effects and interactions

## 🛠️ Local Development

To test locally, run a simple HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## 📧 Contact Form

The contact form currently shows an alert message. To integrate with a backend service:
- Update the form submission handler in `script.js`
- Integrate with services like Formspree, Netlify Forms, or your own backend

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This website is created for AI SEO Agency. All rights reserved.