# Ryan & Skylar — An October Afternoon

A responsive wedding photo diary for October 6, 2026, Hangzhou. Includes the engraved chapel entrance, separately composed mobile artwork, opening-door animation, scroll reveals, and eighteen original wedding photographs, each used once in the page, including a ten-photo Polaroid-style album for October 6 & 20. No installation or build step required.

## Publish with GitHub Pages

1. Unzip `ryan-skylar-github.zip` on your computer.
2. Sign in at https://github.com and create a new repository named `ryan-skylar-wedding`. Choose Public for free GitHub Pages hosting. Enable “Add a README file” so the repository starts with a main branch. The published website and photos will be publicly viewable.
3. Open the repository and choose **Add file → Upload files**.
4. Open the unzipped folder and drag its CONTENTS into the upload area: `index.html`, `style.css`, `script.js`, and the entire `assets` folder. Include `.nojekyll` if visible (on Mac, Command–Shift–Period shows hidden files). README.md is optional; you may omit it to retain the README created by GitHub.
5. Click **Commit changes**. Upload the extracted files, not the ZIP or its containing folder. `index.html` must be visible immediately on the repository’s main page, next to `assets`.
6. Go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Select **main** and **/(root)**, then **Save**.
7. Wait for deployment. Return to Settings → Pages and use the published link. The address normally follows `https://YOUR-USERNAME.github.io/ryan-skylar-wedding/`. This one URL supports phones, tablets, and desktops.

If the page returns 404, check that deployment has finished and that index.html is at the repository root. If photos are missing, make sure the full assets folder was uploaded with its original subfolders and filenames.

Official instructions:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## Files

- `index.html`: text, photo sequence, and page structure.
- `style.css`: desktop/mobile layout, colors, typography, and animation styling.
- `script.js`: door opening, scroll reveals, and photo viewer.
- `assets/chapel/`: generated landscape and portrait chapel artwork.
- `assets/photos/`: optimized copies of the original photographs, with smaller phone versions. Original source files are unchanged.
- `assets/fonts/`: bundled La Belle Aurore caption font and its license.
- `assets/favicon.svg`: browser tab icon.
- `.nojekyll`: tells GitHub Pages to serve the static site directly.

The separate mobile-preview.html wrapper used during local review is not required for publication and is excluded from the ZIP.

## Local preview

From inside this folder, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/ . Stop the server with Control–C. Resize the window to see the responsive layout. On portrait screens up to 900px wide, the entrance uses the portrait chapel image automatically.

## Editing later

Edit the relevant file in GitHub and commit the change; GitHub Pages republishes it. Preserve relative paths so the website works under a repository URL. The font uses the visitor’s available Bodoni/Didot/Times family; rendering may vary slightly by device. Reduced-motion preferences skip the door transition and disable scroll movement.
