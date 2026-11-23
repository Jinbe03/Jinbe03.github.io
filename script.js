(function () {
  const body = document.body;
  const cameraRig = document.getElementById('camera-rig');
  const wipeEl = document.getElementById('transition-wipe');
  const wipeLabel = document.getElementById('wipe-label');
  const hudLoc = document.getElementById('hud-location');
  const hudDate = document.getElementById('hud-date');
  const hudDay = document.getElementById('hud-day');
  const boardBtn = document.getElementById('boardBtn');
  const titleReturnBtn = document.getElementById('titleReturnBtn');
  const appShell = document.getElementById('app-shell');
  const sfxToggle = document.getElementById('sfxToggle');
  const sfxLabel = document.getElementById('sfxLabel');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));
  const panels = Array.from(document.querySelectorAll('.dossier-panel'));

  // ---------------------------------------------------------
  // 1. Live Persona HUD Date Widget
  // ---------------------------------------------------------
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  if (hudDate) hudDate.textContent = `${mm}/${dd}`;
  if (hudDay) hudDay.textContent = days[now.getDay()];

  // ---------------------------------------------------------
  // 2. Subtle Web Audio UI Synth (Zero external audio files)
  // ---------------------------------------------------------
  let sfxEnabled = true;
  let audioCtx = null;

  function ensureAudio() {
    if (!sfxEnabled) return null;
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playHoverTick() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  function playSelectSnap() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    [330, 660].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.03);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.45, t + 0.11 + idx * 0.03);
      gain.gain.setValueAtTime(0.045, t + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14 + idx * 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + idx * 0.03);
      osc.stop(t + 0.16 + idx * 0.03);
    });
  }

  if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxToggle.setAttribute('aria-pressed', String(sfxEnabled));
      sfxLabel.textContent = sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
      if (sfxEnabled) playHoverTick();
    });
  }

  // ---------------------------------------------------------
  // 3. Smooth Spring-Damped Mouse 3D Camera Parallax
  // ---------------------------------------------------------
  let targetMX = 0, targetMY = 0;
  let currMX = 0, currMY = 0;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetMY = nx * 5.2;   // yaw
    targetMX = -ny * 3.2;  // pitch
  });

  function animateCamera() {
    currMX += (targetMX - currMX) * 0.08;
    currMY += (targetMY - currMY) * 0.08;
    if (cameraRig) {
      cameraRig.style.setProperty('--mouse-rx', currMX.toFixed(3) + 'deg');
      cameraRig.style.setProperty('--mouse-ry', currMY.toFixed(3) + 'deg');
    }
    requestAnimationFrame(animateCamera);
  }
  requestAnimationFrame(animateCamera);

  // ---------------------------------------------------------
  // 4. Express Train Wipe + Perspective Switch Engine
  // ---------------------------------------------------------
  let isTransitioning = false;
  let activeIndex = 0;

  function triggerWipe(labelText, onMidpoint) {
    if (isTransitioning) {
      onMidpoint();
      return;
    }
    isTransitioning = true;
    if (wipeLabel) wipeLabel.textContent = labelText || 'NEXT STOP';
    wipeEl.classList.remove('active');
    void wipeEl.offsetWidth; // restart animation cleanly
    wipeEl.classList.add('active');

    setTimeout(() => {
      onMidpoint();
    }, 185);

    setTimeout(() => {
      wipeEl.classList.remove('active');
      isTransitioning = false;
    }, 480);
  }

  function enterStation(initialView) {
    if (!body.classList.contains('mode-title')) return;
    playSelectSnap();
    triggerWipe('BOARDING', () => {
      body.classList.remove('mode-title');
      if (appShell) appShell.setAttribute('aria-hidden', 'false');
      if (initialView) {
        switchView(initialView, true);
      }
    });
  }

  function returnToTitle() {
    if (body.classList.contains('mode-title')) return;
    playSelectSnap();
    triggerWipe('STATION LINE 03', () => {
      body.classList.add('mode-title');
      body.setAttribute('data-scene', 'station');
      if (hudLoc) hudLoc.textContent = 'SANTIAGO · PLATFORM 01';
      if (appShell) appShell.setAttribute('aria-hidden', 'true');
    });
  }

  function switchView(viewName, skipWipe) {
    const idx = menuItems.findIndex((m) => m.dataset.view === viewName);
    if (idx === -1) return;
    const item = menuItems[idx];
    const alreadyActive = !body.classList.contains('mode-title') && body.getAttribute('data-view') === viewName;
    if (alreadyActive && !skipWipe) return;

    activeIndex = idx;
    const scene = item.dataset.scene || 'station';
    const loc = item.dataset.loc || 'SANTIAGO · PLATFORM 01';
    const labelText = item.querySelector('.menu-label')?.textContent?.trim() || viewName.toUpperCase();

    const applyState = () => {
      body.setAttribute('data-view', viewName);
      body.setAttribute('data-scene', scene);
      if (hudLoc) hudLoc.textContent = loc;

      menuItems.forEach((btn, i) => {
        const isOn = i === idx;
        btn.classList.toggle('active', isOn);
        btn.setAttribute('aria-selected', String(isOn));
      });

      panels.forEach((p) => {
        p.classList.toggle('active', p.id === `view-${viewName}`);
      });
    };

    if (skipWipe) {
      applyState();
    } else {
      playSelectSnap();
      triggerWipe(labelText, applyState);
    }
  }

  // Title button & click-anywhere-on-title
  if (boardBtn) {
    boardBtn.addEventListener('click', () => enterStation('profile'));
  }

  if (titleReturnBtn) {
    titleReturnBtn.addEventListener('click', returnToTitle);
  }

  // Menu interactions + live hover perspective preview
  menuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      playHoverTick();
      // Subtle camera lean preview toward hovered station
      if (!isTransitioning && !body.classList.contains('mode-title')) {
        const hoverScene = item.dataset.scene;
        if (hoverScene === 'interior') {
          targetMY = Math.min(targetMY + 1.8, 6);
        } else {
          targetMY = Math.max(targetMY - 1.8, -6);
        }
      }
    });

    item.addEventListener('click', () => {
      switchView(item.dataset.view, false);
    });
  });

  // In-panel jump buttons
  document.querySelectorAll('[data-jump]').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.jump, false);
    });
  });

  // Keyboard navigation like Persona 5 menu!
  window.addEventListener('keydown', (e) => {
    if (body.classList.contains('mode-title')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterStation('profile');
      }
      return;
    }

    if (e.key === 'Escape') {
      returnToTitle();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      const next = (activeIndex + 1) % menuItems.length;
      switchView(menuItems[next].dataset.view, false);
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      const prev = (activeIndex - 1 + menuItems.length) % menuItems.length;
      switchView(menuItems[prev].dataset.view, false);
    } else if (e.key >= '1' && e.key <= '6') {
      const idx = Number(e.key) - 1;
      if (menuItems[idx]) switchView(menuItems[idx].dataset.view, false);
    }
  });

  // Copy email button
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      const orig = copyBtn.textContent;
      playSelectSnap();
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'COPIED!';
        setTimeout(() => { copyBtn.textContent = orig; }, 1800);
      } catch {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // Support direct hash links (e.g. #experience, #projects) for easy preview/sharing
  const hashView = window.location.hash.replace('#', '');
  if (hashView && menuItems.some((m) => m.dataset.view === hashView)) {
    body.classList.remove('mode-title');
    if (appShell) appShell.setAttribute('aria-hidden', 'false');
    switchView(hashView, true);
  }
})();
