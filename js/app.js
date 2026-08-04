// js/app.js
// ─── Application Bootstrap ────────────────────────────────────
// Mounts all components into <div id="root"> and wires everything up.

import { ThemeManager } from './core/ThemeManager.js';
import { Header }       from './components/Header.js';
import { Footer }       from './components/Footer.js';
import { Lightbox }     from './components/Lightbox.js';
import { GalleryPage }  from './components/GalleryPage.js';

class App {
  #theme;
  #header;
  #footer;
  #lightbox;
  #gallery;

  constructor() {
    // 1. Apply saved theme immediately (before render, avoids flash)
    this.#theme = new ThemeManager();

    // 2. Instantiate all components
    this.#lightbox = new Lightbox();
    this.#gallery  = new GalleryPage(this.#lightbox);
    this.#header   = new Header();
    this.#footer   = new Footer();

    // 3. Mount all HTML into #root in one shot
    document.getElementById('root').innerHTML =
      this.#header.render() +
      `<main>
        ${this.#gallery.render()}
      </main>` +
      this.#lightbox.render() +
      this.#footer.render();

    // 4. Bind all events (DOM is now ready)
    this.#theme.bindEvents();
    this.#header.bindEvents();
    this.#gallery.bindEvents();
    this.#lightbox.bindEvents();

    // 5. Global keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.#lightbox.close();
      }
    });

    // 6. Show skeleton then render real content
    this.#gallery.showSkeleton(6);

    requestAnimationFrame(() => {
      this.#gallery.renderGrid();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
