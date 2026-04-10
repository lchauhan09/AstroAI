// Astro AI - Core Logic
// Handling premium navigation and interactions

function init() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Hide bottom nav on onboarding
  updateNavVisibility('onboarding');
}

function navigateTo(viewId) {
  const views = document.querySelectorAll('.view');
  const navItems = document.querySelectorAll('.nav-item');
  const bottomNav = document.getElementById('main-nav');

  // Fade out current views
  views.forEach(v => {
    v.classList.remove('active');
  });

  // Enable the target view
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
    
    // Update nav active state
    navItems.forEach(item => {
      const label = item.querySelector('span').innerText.toLowerCase();
      if (viewId === 'dashboard' && label === 'home') item.classList.add('active');
      else if (viewId === 'details' && label === 'chart') item.classList.add('active');
      else item.classList.remove('active');
    });
    
    // Manage bottom nav visibility
    updateNavVisibility(viewId);
  }
}

function updateNavVisibility(viewId) {
  const bottomNav = document.getElementById('main-nav');
  if (viewId === 'onboarding' || viewId === 'loading') {
    bottomNav.style.display = 'none';
  } else {
    bottomNav.style.display = 'flex';
  }
}

function showLoading() {
  const name = document.getElementById('input-name').value || 'Seeker';
  document.getElementById('user-display').innerText = name;
  
  navigateTo('loading');
  
  // Artificial delay for luxury feel
  setTimeout(() => {
    navigateTo('dashboard');
  }, 3500);
}

function switchTab(event, tabId) {
  // Update Tab Buttons
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  // Show Tab Content
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(c => c.style.display = 'none');
  
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.style.display = 'block';
  }
}

// Start local server helper (not for front-end, but conceptual)
console.log("%c Astro AI Initialized ", "color: #D4AF37; font-size: 20px; font-weight: bold; background: #0A0F2C; padding: 5px;");

window.onload = init;
