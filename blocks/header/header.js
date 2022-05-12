
import { readBlockConfig, decorateIcons } from '../../scripts/scripts.js';
import createTag from "./header-utils.js";

/**
 * collapses all open nav sections
 * @param {Element} sections The container element
 */

 const BRAND_IMG = '<img alt="Adobe" src="/blocks/header/brand-logo.svg">';
 const IS_OPEN = 'is-Open';

function collapseAllNavSections(sections) {
  sections.querySelectorAll('.nav-section.is-Open').forEach((section) => {
    section.classList.remove(IS_OPEN);
    section.setAttribute('aria-expanded','false');
  });
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
    const cfg = readBlockConfig(block);
    block.textContent = '';

    // fetch nav content
    const navPath = '/gnav';
    const resp = await fetch(`${navPath}.plain.html`);
    const html = await resp.text(); 

    // decorate nav DOM
    const nav = document.createElement('div');
    nav.classList.add('nav');
    nav.setAttribute('aria-role', 'navigation');
    nav.innerHTML = html;
    
    const container = nav.querySelector('div');
    container.classList.add('nav-branding-container');
    const logo = document.createElement('div');
    logo.classList.add('header-logo');
    logo.innerHTML= BRAND_IMG;
    container.prepend(logo);

    
    const brandText = container.querySelectorAll('.branding > div');
    brandText[0].classList.add('spectrum-Heading', 'spectrum-Heading--sizeM');
    brandText[1].classList.add('spectrum-Detail', 'spectrum-Detail--sizeM');

    const navSections = nav.querySelectorAll('.nav-sections > div');
    navSections.forEach(section => {
      section.classList.add('nav-section', 'has-Menu');
      section.setAttribute('aria-expanded', 'false');
      section.addEventListener('click', () => {
        const expanded = section.getAttribute('aria-expanded') === 'true';
        
        collapseAllNavSections(nav);
        section.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        
        if(expanded) {
          section.classList.remove(IS_OPEN);
        } else {
          section.classList.add(IS_OPEN);
        }
      });
    })

    // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = '<div class="nav-hamburger-icon"></div>';
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    document.body.style.overflowY = expanded ? '' : 'hidden';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  decorateIcons(nav);
  block.append(nav);
  
  }
