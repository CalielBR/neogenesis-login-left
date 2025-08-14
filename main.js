Hooks.once('init', () => {
  registerSettings();
});

Hooks.on('renderSetup', (app, html) => {
  if (!html || !html[0]) return;

  const scrolling = game.settings.get('neogenesis-login-left', 'moving-bg');

  // Set the CSS --animation variable based on the setting
  document.documentElement.style.setProperty(
    '--animation',
    scrolling ? 'var(--default-animation)' : 'none'
  );

  // Add fade-in class to the login form
  const loginForm = html[0]; // html is the jQuery-like Setup window
  loginForm.classList.add('fade-in');

  // Select the join button inside the login form
  const joinButton = loginForm.querySelector('button[name="join"]');
  if (joinButton) {
    joinButton.addEventListener('click', () => {
      loginForm.classList.remove('fade-in');
      loginForm.classList.add('fade-out');

      // Timeout for the fade-out animation before the next step
      setTimeout(() => {
        // Place any post fade-out action here
        // Example: window.location.href = '/homepage';
      }, 500);
    });
  }
});

function registerSettings() {
  game.settings.register('neogenesis-login-left', 'moving-bg', {
    name: game.i18n.localize("NeogenesisLoginLeft.Scrolling-BG"),
    hint: game.i18n.localize("NeogenesisLoginLeft.Scrolling-BG-Desc"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => window.location.reload()
  });
}
