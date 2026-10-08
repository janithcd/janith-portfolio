(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function updateThemeLabel() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${next} mode`);
    themeButton.title = `Switch to ${next} mode`;
    themeButton.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', root.dataset.theme === 'light' ? '#f5f7fa' : '#0b1020');
  }
  updateThemeLabel();
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const rect = themeButton.getBoundingClientRect();
    root.style.setProperty('--theme-x', `${rect.left + rect.width / 2}px`);
    root.style.setProperty('--theme-y', `${rect.top + rect.height / 2}px`);
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch { /* Keep theme for this page. */ }
      updateThemeLabel();
    };
    if (!motionReduced.matches && document.startViewTransition) document.startViewTransition(apply);
    else apply();
  });

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');
  function closeMenu() {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });

  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  document.querySelector('.copy-email')?.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try { await navigator.clipboard.writeText('djanith11@gmail.com'); status.textContent = 'Email address copied.'; }
    catch { status.textContent = 'Select and copy the address above.'; }
  });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('[data-category]')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projectCards.forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
      if (!card.hidden) count++;
    });
    document.querySelector('#project-count').textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
  }));

  if ('IntersectionObserver' in window && !motionReduced.matches) {
    const reveal = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .07, rootMargin: '0px 0px 60px 0px' });
    root.classList.add('motion-ready');
    reveal.forEach(element => observer.observe(element));
  }
  const progress = document.querySelector('.scroll-progress');
  let ticking = false;
  function updateProgress() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
