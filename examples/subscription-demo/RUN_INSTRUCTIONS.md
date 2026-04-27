# SAP Subscription Management Demo - Run Instructions

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local HTTP server (Python http.server, Node.js http-server, or PHP built-in server)

### Step 1: Navigate to Project Directory
```bash
cd /Users/C5408360/sapui5-llm-ready/examples/subscription-demo/webapp
```

### Step 2: Start HTTP Server

**Option A: Python 3 (Recommended)**
```bash
python3 -m http.server 8095
```

**Option B: Node.js**
```bash
npx http-server -p 8095
```

**Option C: PHP**
```bash
php -S localhost:8095
```

**Option D: Python 2**
```bash
python -m SimpleHTTPServer 8095
```

### Step 3: Open in Browser
```
http://localhost:8095
```

---

## Detailed Instructions

### Why Port 8095?

Ports 8092, 8093, and 8094 were already in use on the development machine. Port 8095 was selected as an available alternative. You can use any available port by changing the port number in the server command.

### Verifying the Server is Running

After starting the server, you should see output like:
```
Serving HTTP on 0.0.0.0 port 8095 ...
```

### Troubleshooting

**Issue: Port already in use**
- **Solution:** Try a different port number (e.g., 8096, 8097, 8098)

**Issue: Page not loading**
- **Solution:** 
  1. Verify server is running
  2. Check browser console for errors (F12)
  3. Ensure you're accessing the correct port

**Issue: Styles not loading**
- **Solution:** 
  1. Check internet connection (SAPUI5 loads from CDN)
  2. Verify CDN URL is accessible: https://ui5.sap.com/resources/sap-ui-core.js

**Issue: Controls not rendering**
- **Solution:**
  1. Check browser console for JavaScript errors
  2. Verify all files are in the correct directory structure
  3. Check that resource roots are configured correctly in index.html

---

## Development Workflow

### Making Changes to the Application

1. **Edit Files:**
   - `view/Subscription.view.xml` - UI structure
   - `controller/Subscription.controller.js` - Business logic
   - `index.html` - Bootstrap configuration

2. **Refresh Browser:**
   - After making changes, refresh the browser (F5 or Cmd+R)
   - Clear cache if needed (Ctrl+Shift+R or Cmd+Shift+R)

3. **Check Console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed resource loads

---

## Testing the Application

### Test Checklist

**Basic Functionality:**
- [ ] Application loads in browser
- [ ] All 8 sections are visible
- [ ] Forms accept input
- [ ] Dropdowns work correctly
- [ ] Date picker opens and selects dates
- [ ] Toggle switches work
- [ ] Checkboxes work

**Layout Toggle:**
- [ ] Horizontal Layout Mode toggle works
- [ ] Horizontal layout displays correctly on desktop
- [ ] Vertical layout displays on mobile/tablet
- [ ] Layout switches smoothly

**Collapsible Panels:**
- [ ] Billing Information panel expands/collapses
- [ ] Payment Method Details panel expands/collapses
- [ ] Subscription History panel expands/collapses

**Dynamic Features:**
- [ ] Pricing updates when selections change
- [ ] Auto-renew confirmation dialog appears
- [ ] Form validation works
- [ ] Toast notifications appear

**Responsive Design:**
- [ ] Mobile view (<1025px): Vertical stacking
- [ ] Desktop view (≥1025px): Horizontal layout
- [ ] No horizontal scroll on mobile
- [ ] Touch targets appropriate size

---

## Browser Compatibility

### Tested Browsers
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Minimum Browser Requirements
- ES6 JavaScript support
- CSS3 support
- Modern HTML5 support

---

## Performance Notes

### CDN Loading
SAPUI5 loads from SAP's CDN at https://ui5.sap.com/resources/sap-ui-core.js
- First load may take 2-5 seconds depending on internet connection
- Subsequent loads may be faster due to browser caching

### Local Development
For faster development, consider:
- Using a local SAPUI5 installation
- Configuring a local resource server
- Disabling browser cache during development

---

## Security Considerations

This is a demo application with:
- No backend integration
- No authentication
- No data persistence
- Client-side only

**Do not use in production without adding:**
- Authentication/authorization
- Backend API integration
- Input validation and sanitization
- HTTPS/TLS encryption
- Security headers

---

## File Permissions

Ensure files have appropriate read permissions:
```bash
chmod -R 644 webapp/
chmod 755 webapp/
```

---

## Stopping the Server

**Python/PHP:** Press Ctrl+C in the terminal

**Node.js:** Press Ctrl+C in the terminal

---

## Advanced Configuration

### Changing the Port
To use a different port, modify the server command:
```bash
python3 -m http.server 8100
```
Then access at: `http://localhost:8100`

### Changing the Resource Root
If you want to serve from a different directory:
```bash
python3 -m http.server 8095 --directory /path/to/your/directory
```

### Using a Different Server
You can use any HTTP server that serves static files:
- Nginx
- Apache
- IIS
- Any static file server

---

## Getting Help

### Common Issues

**"Cannot find module 'http'"**
- Solution: Python http.server is built-in, no installation needed

**"Command not found: python3"**
- Solution: Use `python` instead of `python3` (Windows)

**"EADDRINUSE: Address already in use"**
- Solution: Port is already in use, try a different port

### Additional Resources
- [SAPUI5 Documentation](https://ui5.sap.com/#/api)
- [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design/)
- [Python http.server Documentation](https://docs.python.org/3/library/http.server.html)

---

## Next Steps

After successfully running the demo:
1. Read the [Case Study](../../CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md)
2. Review the [Prompting Guide](../../PROMPTING_GUIDE_SAPUI5.md)
3. Explore the [Skill Documentation](../../.cursor/skills/sapui5-basic-form-demo/SKILL.md)
4. Try building your own SAPUI5 application using the methodology

---

**Document Version:** 1.0  
**Last Updated:** April 2026  
