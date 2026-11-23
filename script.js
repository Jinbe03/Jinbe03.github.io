(function () {
  const body = document.body;
  const introOpener = document.getElementById('intro-opener');
  const cameraRig = document.getElementById('camera-rig');
  const wipeEl = document.getElementById('transition-wipe');
  const wipeLabel = document.getElementById('wipe-label');
  const wipeSub = document.getElementById('wipe-sub');
  const hudLoc = document.getElementById('hud-location');
  const hudDate = document.getElementById('hud-date');
  const hudDay = document.getElementById('hud-day');
  const boardBtn = document.getElementById('boardBtn');
  const titleReturnBtn = document.getElementById('titleReturnBtn');
  const appShell = document.getElementById('app-shell');
  const sfxToggle = document.getElementById('sfxToggle');
  const sfxLabel = document.getElementById('sfxLabel');
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmLabel = document.getElementById('bgmLabel');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));
  const panels = Array.from(document.querySelectorAll('.dossier-panel'));

  // Dialogue Box elements
  const dialogueTextEl = document.getElementById('dialogue-text');
  const dialogueClickable = document.getElementById('dialogueClickable');

  // PDF Modal elements
  const pdfModal = document.getElementById('pdf-modal');
  const pdfFrame = document.getElementById('pdfFrame');
  const pdfModalTitle = document.getElementById('pdfModalTitle');
  const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');
  const pdfNewTabBtn = document.getElementById('pdfNewTabBtn');
  const pdfCloseBtn = document.getElementById('pdfCloseBtn');
  const pdfBackdrop = document.getElementById('pdfBackdrop');

  // ---------------------------------------------------------
  // 1. First-Entry Motion Graphics Opener (~1.6s auto-dismiss)
  // ---------------------------------------------------------
  const hashView = window.location.hash.replace('#', '');
  if (introOpener) {
    if (hashView) {
      introOpener.classList.add('done');
    } else {
      setTimeout(() => introOpener.classList.add('done'), 1620);
      window.addEventListener('click', () => introOpener.classList.add('done'), { once: true });
    }
  }

  // ---------------------------------------------------------
  // 2. Live Persona HUD Date Widget
  // ---------------------------------------------------------
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  if (hudDate) hudDate.textContent = `${mm}/${dd}`;
  if (hudDay) hudDay.textContent = days[now.getDay()];

  // ---------------------------------------------------------
  // 3. Web Audio Engine: UI SFX + Original Acid-Jazz BGM Groove
  // ---------------------------------------------------------
  let sfxEnabled = true;
  let bgmEnabled = false;
  let audioCtx = null;
  let bgmTimer = null;
  let bgmStep = 0;

  function ensureAudio() {
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
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.032, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  function playSelectSnap() {
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    [330, 660].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.035);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.48, t + 0.12 + idx * 0.035);
      gain.gain.setValueAtTime(0.042, t + idx * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16 + idx * 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + idx * 0.035);
      osc.stop(t + 0.18 + idx * 0.035);
    });
  }

  // Original Royalty-Free Acid-Jazz / Shibuya Groove (Rhodes chords + funky bass + hat)
  const JAZZ_CHORDS = [
    [293.66, 349.23, 440.00, 523.25], // Dm7
    [392.00, 493.88, 587.33, 659.25], // G13
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00]  // Am7
  ];
  const BASS_LINE = [
    146.83, 0, 146.83, 174.61,  196.00, 0, 174.61, 164.81,
    130.81, 0, 130.81, 164.81,  110.00, 0, 130.81, 146.83
  ];

  function playJazzStep() {
    if (!bgmEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const step16 = bgmStep % 16;

    // Electric piano stab on beats 0, 4, 8, 12 (plus syncopated offbeat 6 & 14)
    if (step16 % 4 === 0 || step16 === 6 || step16 === 14) {
      const chordIdx = Math.floor(step16 / 4) % JAZZ_CHORDS.length;
      const chord = JAZZ_CHORDS[chordIdx];
      const dur = step16 % 4 === 0 ? 0.42 : 0.2;
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.014, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.02);
      });
    }

    // Walking funky bass
    const bassFreq = BASS_LINE[step16];
    if (bassFreq > 0) {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(bassFreq, t);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, t);
      gain.gain.setValueAtTime(0.055, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.24);
    }

    // Soft jazz hi-hat pulse
    if (step16 % 2 === 0 || step16 % 4 === 3) {
      const bufferSize = ctx.sampleRate * 0.03;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(6800, t);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(step16 % 4 === 2 ? 0.018 : 0.009, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      noise.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      noise.start(t);
    }

    bgmStep++;
  }

  function setBgm(on) {
    bgmEnabled = on;
    if (bgmToggle) bgmToggle.setAttribute('aria-pressed', String(on));
    if (bgmLabel) bgmLabel.textContent = on ? '♪ BGM: ON' : '♪ BGM: OFF';
    if (bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
    }
    if (on) {
      ensureAudio();
      playJazzStep();
      bgmTimer = setInterval(playJazzStep, 145); // ~103 BPM acid-jazz swing
    }
  }

  if (bgmToggle) {
    bgmToggle.addEventListener('click', () => setBgm(!bgmEnabled));
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
  // 4. Persona 5 Animated Dialogue Box (Typewriter + Lines)
  // ---------------------------------------------------------
  const DIALOGUES = {
    profile: [
      'Welcome to Line 03. I’m Bruno Maldonado — Software Engineer focused on Python, Backend, and clean full-stack systems.',
      'Tip: Use the station menu on the left (or press keys 1–6) to shift perspective between the platform, inside the express car, and the night overpass.'
    ],
    experience: [
      'At Huawei Technologies I built Python & SQL automation apps that compressed multi-week manual reporting (~90% automated, saving ~15 hrs/week).',
      'I also optimized national-scale SQL queries and relational models, cutting processing times by 35% while supporting customer churn analytics.'
    ],
    projects: [
      'Three core builds: a multinational financial compliance engine (Chile/Peru/Colombia), Life Harmony (AI mobile nutrition app), and my Python algorithms repo.',
      'Click any GITHUB REPO stamp to jump straight into the source code.'
    ],
    skills: [
      'My primary loadout centers on Python, Django, Node.js, PostgreSQL, and Firebase — backed by Docker, Jenkins CI/CD, and cloud fundamentals.',
      'I prefer building reliable architectures and writing clean code over chasing hype.'
    ],
    education: [
      'Finishing my B.S. in Computer Engineering at INACAP this December 2026 — click any certificate card above to inspect the official PDF right inside this page.',
      'You can also open my English or Spanish Resume anytime from the top HUD bar without leaving the site.'
    ],
    contact: [
      'That’s the final stop! Looking for a remote Junior / Trainee Software Engineer? Hit COPY EMAIL or shoot me a message on LinkedIn.',
      'Based in Santiago, Chile (UTC-3) — aligned with US/Americas time zones and ready to ship.'
    ]
  };

  let currentViewKey = 'profile';
  let dialogueIdx = 0;
  let typeTimer = null;
  let isTyping = false;
  let fullLine = '';

  function startDialogue(viewKey, lineIndex = 0) {
    currentViewKey = viewKey;
    const lines = DIALOGUES[viewKey] || DIALOGUES.profile;
    dialogueIdx = lineIndex % lines.length;
    fullLine = lines[dialogueIdx];
    if (typeTimer) clearInterval(typeTimer);
    if (!dialogueTextEl) return;

    dialogueTextEl.textContent = '';
    isTyping = true;
    let i = 0;
    typeTimer = setInterval(() => {
      dialogueTextEl.textContent += fullLine.charAt(i);
      i++;
      if (i >= fullLine.length) {
        clearInterval(typeTimer);
        isTyping = false;
      }
    }, 20);
  }

  if (dialogueClickable) {
    dialogueClickable.addEventListener('click', () => {
      playHoverTick();
      if (isTyping) {
        clearInterval(typeTimer);
        isTyping = false;
        dialogueTextEl.textContent = fullLine;
      } else {
        startDialogue(currentViewKey, dialogueIdx + 1);
      }
    });
  }

  // ---------------------------------------------------------
  // 5. Smooth Spring-Damped Mouse 3D Camera Parallax
  // ---------------------------------------------------------
  let targetMX = 0, targetMY = 0;
  let currMX = 0, currMY = 0;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetMY = nx * 4.8;
    targetMX = -ny * 3.0;
  });

  function animateCamera() {
    currMX += (targetMX - currMX) * 0.075;
    currMY += (targetMY - currMY) * 0.075;
    if (cameraRig) {
      cameraRig.style.setProperty('--mouse-rx', currMX.toFixed(3) + 'deg');
      cameraRig.style.setProperty('--mouse-ry', currMY.toFixed(3) + 'deg');
    }
    requestAnimationFrame(animateCamera);
  }
  requestAnimationFrame(animateCamera);

  // ---------------------------------------------------------
  // 6. Paper-Crumple & Cut-In Transition Engine (~900ms!)
  // ---------------------------------------------------------
  let isTransitioning = false;
  let activeIndex = 0;

  function triggerWipe(labelText, subText, withCutin, onMidpoint) {
    if (isTransitioning) {
      onMidpoint();
      return;
    }
    isTransitioning = true;
    if (wipeLabel) wipeLabel.textContent = labelText || 'NEXT STOP';
    if (wipeSub) wipeSub.textContent = subText || 'NEXT STATION';

    wipeEl.classList.remove('active', 'with-cutin');
    void wipeEl.offsetWidth;
    if (withCutin) wipeEl.classList.add('with-cutin');
    wipeEl.classList.add('active');

    // Swap scene cleanly right at midpoint while shards fully cover the screen
    setTimeout(() => {
      onMidpoint();
    }, 390);

    setTimeout(() => {
      wipeEl.classList.remove('active', 'with-cutin');
      isTransitioning = false;
    }, 930);
  }

  function enterStation(initialView) {
    if (!body.classList.contains('mode-title')) return;
    playSelectSnap();
    triggerWipe('BOARDING', 'SANTIAGO EXPRESS // LINE 03', true, () => {
      body.classList.remove('mode-title');
      if (appShell) appShell.setAttribute('aria-hidden', 'false');
      switchView(initialView || 'profile', true);
    });
  }

  function returnToTitle() {
    if (body.classList.contains('mode-title')) return;
    playSelectSnap();
    triggerWipe('TITLE SCREEN', 'SANTIAGO · PLATFORM 01', false, () => {
      body.classList.add('mode-title');
      body.setAttribute('data-scene', 'station');
      if (hudLoc) hudLoc.textContent = 'BRUNO MALDONADO · PLATFORM 01';
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
    const loc = item.dataset.loc || 'BRUNO MALDONADO · PLATFORM 01';
    const sub = item.dataset.sub || 'NEXT STATION';
    const withCutin = item.dataset.cutin === 'true';
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

      startDialogue(viewName, 0);
    };

    if (skipWipe) {
      applyState();
    } else {
      playSelectSnap();
      triggerWipe(labelText, sub, withCutin, applyState);
    }
  }

  if (boardBtn) boardBtn.addEventListener('click', () => enterStation('profile'));
  if (titleReturnBtn) titleReturnBtn.addEventListener('click', returnToTitle);

  menuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      playHoverTick();
      if (!isTransitioning && !body.classList.contains('mode-title')) {
        const hoverScene = item.dataset.scene;
        targetMY = hoverScene === 'interior' ? Math.min(targetMY + 2.0, 6) : Math.max(targetMY - 2.0, -6);
      }
    });
    item.addEventListener('click', () => switchView(item.dataset.view, false));
  });

  document.querySelectorAll('[data-jump]').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.jump, false));
  });

  // ---------------------------------------------------------
  // 7. Custom In-Page Persona 5 PDF Viewer Modal
  // ---------------------------------------------------------
  function openPdfModal(pdfPath, titleText) {
    if (!pdfModal || !pdfFrame) return;
    playSelectSnap();
    pdfModalTitle.textContent = titleText || 'DOCUMENT PREVIEW';
    pdfFrame.src = pdfPath + '#toolbar=1&view=FitH';
    pdfDownloadBtn.href = pdfPath;
    pdfNewTabBtn.href = pdfPath;
    pdfModal.classList.add('open');
    pdfModal.setAttribute('aria-hidden', 'false');
  }

  function closePdfModal() {
    if (!pdfModal || !pdfModal.classList.contains('open')) return;
    playHoverTick();
    pdfModal.classList.remove('open');
    pdfModal.setAttribute('aria-hidden', 'true');
    pdfFrame.src = '';
  }

  document.querySelectorAll('.js-open-pdf').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPdfModal(btn.dataset.pdf, btn.dataset.pdfTitle);
    });
  });

  if (pdfCloseBtn) pdfCloseBtn.addEventListener('click', closePdfModal);
  if (pdfBackdrop) pdfBackdrop.addEventListener('click', closePdfModal);

  // ---------------------------------------------------------
  // 8. Keyboard Controls + Copy Email
  // ---------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (pdfModal && pdfModal.classList.contains('open')) {
      if (e.key === 'Escape') closePdfModal();
      return;
    }

    if (body.classList.contains('mode-title')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (introOpener) introOpener.classList.add('done');
        enterStation('profile');
      }
      return;
    }

    if (e.key === 'Escape') {
      returnToTitle();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      switchView(menuItems[(activeIndex + 1) % menuItems.length].dataset.view, false);
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      switchView(menuItems[(activeIndex - 1 + menuItems.length) % menuItems.length].dataset.view, false);
    } else if (e.key >= '1' && e.key <= '6') {
      const idx = Number(e.key) - 1;
      if (menuItems[idx]) switchView(menuItems[idx].dataset.view, false);
    }
  });

  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      const orig = copyBtn.textContent;
      playSelectSnap();
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'EMAIL COPIED!';
        setTimeout(() => { copyBtn.textContent = orig; }, 1800);
      } catch {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // Hash deep-linking (#profile, #experience, #projects, #skills, #education, #contact)
  if (hashView && menuItems.some((m) => m.dataset.view === hashView)) {
    body.classList.remove('mode-title');
    if (appShell) appShell.setAttribute('aria-hidden', 'false');
    switchView(hashView, true);
  }
})();
