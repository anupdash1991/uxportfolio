const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
if (toggle && navigation) {
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.navigation')) closeMenu(); });
  window.matchMedia('(min-width: 641px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
}
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = category === 'all' || card.dataset.categories.split(' ').includes(category);
      card.hidden = !show;
      if (show) count++;
    });
    document.getElementById('filter-status').textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}${category === 'all' ? '' : ' for ' + button.textContent.trim()}.`;
  });
});
const copyButton = document.getElementById('copy-email');
if (copyButton) {
  let resetTimer;
  copyButton.addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText('anupdash1991@gmail.com');
      copyButton.textContent = 'Email copied ✓';
      status.textContent = 'Email address copied to your clipboard.';
      resetTimer = setTimeout(() => { copyButton.textContent = 'Copy email ⧉'; status.textContent = ''; }, 5000);
    } catch {
      status.textContent = 'Copy this address: anupdash1991@gmail.com';
    }
  });
}
