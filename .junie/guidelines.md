### Project Overview

This is a static personal website hosted on GitHub Pages. It uses vanilla HTML, CSS, and JavaScript.

### Build/Configuration Instructions
- **Build**: No build step is required. The project consists of static files.
- **Local Development**: You can serve the project using any local web server (e.g., `npx serve .` or Python's `http.server`).
- **Configuration**:
    - Contact form configuration relies on `window.CONTACT_BACKEND_URL` and `window.CONTACT_BACKEND_SECRET_B64`. These should be provided in the environment or a separate configuration script not committed to the repository if they are sensitive.
    - `encode.js` is provided to encode secrets to Base64 for use in the contact form configuration.

### Testing Information
There is no formal testing framework like Jest or Mocha integrated. 
Testing is performed using simple Node.js scripts located in the `test/` directory.

### Additional Development Information
- **Code Style**:
    - Use **IIFEs** (Immediately Invoked Function Expressions) for scripts included in HTML to avoid polluting the global namespace (see `index.js`, `contact.js`).
    - Use **JSDoc** comments for functions and variables to provide type information and descriptions.
    - Prefer **Vanilla JavaScript** (ES6+) without external dependencies for client-side logic.
- **Contact Form**:
    - The contact form includes a "honeypot" field (`website`) to deter simple bots.
    - It uses a fallback mechanism to a `mailto:` link if the backend submission fails.
- **Assets**:
    - Images are stored in the `images/` directory.
    - Styles are managed in `style.css`.
