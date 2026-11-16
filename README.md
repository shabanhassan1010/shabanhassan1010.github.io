# Shaban Hassan — Portfolio

Personal portfolio website, live at **https://shabanhassan1010.github.io**

Built with plain HTML, CSS and JavaScript (no framework, no build step) and hosted on GitHub Pages.

## Structure

```
index.html        → all the page content (sections: hero, about, experience, projects, skills, education, contact)
styles.css        → design (colors are variables at the top of the file, dark mode below them)
script.js         → dark mode toggle, mobile menu, scroll animations, project filter buttons
assets/
  profile.jpg             → profile photo
  Shaban_Hassan_CV.pdf    → the CV behind the "Download CV" button
  favicon.svg             → browser tab icon
```

## Updating the site

1. Edit `index.html` (e.g. add a new project card by copying an existing `<article class="project-card">`).
   Set its `data-tags` (e.g. `data-tags="dotnet angular"`) so the filter buttons (All / .NET / Angular / AI / Node.js) can find it.
2. To update the CV, replace `assets/Shaban_Hassan_CV.pdf` with a file of the same name.
3. Push:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages redeploys automatically in about a minute.
