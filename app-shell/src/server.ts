import express from 'express';
import { renderPage } from './renderPage';
import { siteATheme } from './themeConfig/siteAOverrides';
import { siteBTheme } from './themeConfig/siteBOverrides';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist/public'));

app.get('*', (req, res) => {
  const host = req.get('host') || '';
  const theme = host.includes('siteb') ? siteBTheme : siteATheme;
  
  const html = renderPage(theme);
  res.send(html);
});

app.listen(port, () => {
  console.log(`App Shell server running at http://localhost:${port}`);
}); 