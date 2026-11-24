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
  const hudDateBox = document.getElementById('hudDateBox');
  const hankoSeal = document.getElementById('hankoSeal');
  const jpSecretBtn = document.getElementById('jpSecretBtn');
  const boardBtn = document.getElementById('boardBtn');
  const titleReturnBtn = document.getElementById('titleReturnBtn');
  const appShell = document.getElementById('app-shell');
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const sfxToggle = document.getElementById('sfxToggle');
  const sfxLabel = document.getElementById('sfxLabel');
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmLabel = document.getElementById('bgmLabel');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));
  const panels = Array.from(document.querySelectorAll('.dossier-panel'));

  // Dialogue & Easter Egg Elements
  const dialogueTextEl = document.getElementById('dialogue-text');
  const dialogueClickable = document.getElementById('dialogueClickable');
  const dialogueEmblemBtn = document.getElementById('dialogueEmblemBtn');
  const alloutOverlay = document.getElementById('allout-overlay');
  const callingCardOverlay = document.getElementById('calling-card-overlay');
  const ccCloseBtn = document.getElementById('ccCloseBtn');
  const ccBackdrop = document.getElementById('ccBackdrop');

  // PDF Modal Elements
  const pdfModal = document.getElementById('pdf-modal');
  const pdfFrame = document.getElementById('pdfFrame');
  const pdfModalTitle = document.getElementById('pdfModalTitle');
  const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');
  const pdfNewTabBtn = document.getElementById('pdfNewTabBtn');
  const pdfCloseBtn = document.getElementById('pdfCloseBtn');
  const pdfBackdrop = document.getElementById('pdfBackdrop');

  // ---------------------------------------------------------
  // 1. TRILINGUAL DICTIONARY (EN / ES + SECRET JP EASTER EGG!)
  // ---------------------------------------------------------
  const I18N = {
    en: {
      hud_resume_en: 'RESUME (EN)', hud_resume_es: 'CV (ES)', hud_title: 'TITLE',
      title_eyebrow: 'PORTFOLIO // SANTIAGO EXPRESS',
      title_status: 'OPEN TO REMOTE JR / TRAINEE ROLES',
      title_role: 'SOFTWARE ENGINEER',
      title_huawei: 'AUTOMATION & CLOUD',
      title_board: 'BOARD THE STATION',
      title_hint: 'CLICK OR PRESS [ENTER] / [SPACE] TO START · TURN ON ♪ BGM FOR FULL VIBE',
      nav_select: 'SELECT STOP',
      nav_hint: '[↑/↓] MOVE   [1-6] JUMP   [ESC] TITLE',
      menu: {
        profile: ['P', 'ROFILE', true], experience: ['E', 'XPERIENCE', false], projects: ['P', 'ROJECTS', false],
        skills: ['S', 'KILLS', false], education: ['C', 'ERTS', true], contact: ['C', 'ONTACT', false]
      },
      radar: ['BACKEND', 'SQL', 'AUTOMATION', 'CLOUD', 'FULL-STACK'],
      mission_cleared: 'MISSION CLEARED',
      tab_p1: '02 · SALON 24/7 APP', tab_p2: '03 · FINANCIAL ENGINE', tab_p3: '04 · LIFE HARMONY AI', tab_p4: '05 · ALGORITHMS',
      deck: [
        {
          role: '01 // PRODUCTION DEPLOY', title: 'PHANTOMSW — MULTI-VERTICAL SAAS',
          copy: 'Production web platform built in a <strong>React, Vite &amp; Serverless Functions</strong> architecture featuring <strong>Flow.cl</strong> live payments, automatic IP currency detection (CLP/USD), automated PDF receipts, and transactional emails with attachments.',
          chips: ['REACT', 'VITE', 'NODE SERVERLESS', 'FLOW.CL', 'PDF & EMAIL'],
          link: 'https://phantomsw.vercel.app/', linkLabel: 'OPEN LIVE SITE ↗'
        },
        {
          role: '02 // PRODUCTION WEB APP', title: 'SALON & BARBERSHOP 24/7 BOOKING',
          copy: 'Deployed booking &amp; management web app for salons and service businesses with <strong>24/7 online scheduling</strong>, real-time admin dashboard, cash-flow tracking, and <strong>Firebase / Firestore</strong> authentication &amp; security rules.',
          chips: ['REACT', 'FIREBASE AUTH', 'FIRESTORE RULES', 'ADMIN DASHBOARD', '24/7 BOOKING']
        },
        {
          role: '03 // TECH LEAD', title: 'MULTINATIONAL FINANCIAL ENGINE',
          copy: 'Full-stack platform managing complex tax compliance workflows across <strong>Chile, Peru, and Colombia</strong>. Includes brute-force lockout protection, RBAC admin dashboard, automated tax reporting (<strong>40% fewer manual errors</strong>), and a <strong>Jenkins CI/CD</strong> pipeline.',
          chips: ['PYTHON', 'DJANGO', 'JAVASCRIPT', 'POSTGRESQL', 'JENKINS CI/CD']
        },
        {
          role: '04 // BACKEND LEAD · AI', title: 'LIFE HARMONY — AI NUTRITION APP',
          copy: 'Cross-platform mobile app combining <strong>AI-assisted calorie tracking</strong> with a real-time <strong>Firebase / Firestore</strong> backend, offline persistence, granular security rules for sensitive health records, and <strong>+25% navigation efficiency</strong>.',
          chips: ['DART', 'FLUTTER', 'AI INTEGRATION', 'FIREBASE', 'FIRESTORE RULES']
        },
        {
          role: '05 // CONTINUOUS PRACTICE', title: 'ALGORITHMS & CS FUNDAMENTALS',
          copy: 'Python engineering practice covering algorithmic problem-solving, clean code patterns, time/space complexity optimization, and core computer science fundamentals written from scratch.',
          chips: ['PYTHON', 'ALGORITHMS', 'DATA STRUCTURES', 'CLEAN CODE']
        }
      ],
      locs: {
        profile: 'BRUNO MALDONADO · PLATFORM 01', experience: 'EXPRESS CAR 01 · EXPERIENCE',
        projects: 'EXPRESS CAR 02 · BUILDS', skills: 'SKYLINE OVERPASS · LOADOUT',
        education: 'ARCHIVE PLATFORM · INACAP', contact: 'FINAL STOP · DIRECT SNS'
      },
      subs: {
        profile: 'STOP 01 // PLATFORM', experience: 'STOP 02 // BOARDING CAR 01',
        projects: 'STOP 03 // BOARDING CAR 02', skills: 'STOP 04 // NIGHT OVERPASS',
        education: 'STOP 05 // CREDENTIALS', contact: 'STOP 06 // PHONE MESSAGE'
      },
      sub_profile: 'UNDERGROUND PLATFORM', sub_experience: 'INSIDE EXPRESS CAR',
      sub_projects: 'INSIDE EXPRESS CAR', sub_skills: 'NIGHT SKYLINE VIEW',
      sub_education: 'VERIFIABLE PDFS', sub_contact: 'DIRECT MESSAGE',
      code_profile: 'STOP 01 // ENGINEER DOSSIER',
      profile_bio: 'Final-year Computer Engineering student at <strong>INACAP</strong> (graduating Dec 2026) based in <strong>Santiago, Chile</strong>. I design reliable backend architectures, automate complex data workflows, optimize SQL at scale, and ship clean full-stack applications built to last.',
      stat1_lbl: 'CORE FOCUS', stat1_val: 'Backend & Automation', stat1_note: 'Python · SQL · APIs',
      stat2_lbl: 'LANGUAGES', stat2_val: 'ES (Native) / EN (B1)', stat2_note: 'Technical & Conversational',
      stat3_lbl: 'WORK MODE', stat3_val: '100% Remote',
      btn_board_exp: 'BOARD EXPERIENCE CAR →', btn_view_resume: 'VIEW RESUME PDF',
      code_exp: 'STOP 02 // EXPRESS CAR 01', hdr_exp: 'EXPERIENCE', exp_kicker: 'ENTERPRISE INTERNSHIP',
      exp_date: 'JAN 2026 – MAY 2026', exp_m1: '~90% AUTO', exp_m2: 'CHURN DATA', exp_m3: '-35% TIME',
      exp_b1: 'Built internal automation applications in <strong>Python and SQL</strong> to generate business reports and analytical insights, compressing workflows that previously took <strong>weeks of manual effort</strong> (saving ~15 hrs/week).',
      exp_b2: 'Contributed to data processing and exploratory analysis for <strong>customer churn</strong> initiatives, cleaning and transforming large-scale datasets into actionable retention metrics.',
      exp_b3: 'Optimized complex SQL queries and relational database models at national scale, <strong>cutting data processing time by 35%</strong> while safeguarding integrity across mission-critical reports.',
      code_proj: 'STOP 03 // EXPRESS CAR 02', hdr_proj: 'SELECTED PROJECTS', btn_repo: 'GITHUB REPO ↗',
      btn_live: 'LIVE SITE ↗', btn_live_app: 'LIVE APP ↗',
      p0_role: '01 // PRODUCTION DEPLOY', p0_title: 'PhantomSW — Multi-Vertical SaaS Platform',
      p0_copy: 'Production web platform built in a <strong>React, Vite &amp; Serverless Functions</strong> architecture featuring <strong>Flow.cl</strong> live payments, automatic IP currency detection (CLP/USD), automated PDF receipts, and transactional emails with attachments.',
      p0b_role: '02 // PRODUCTION DEPLOY', p0b_title: 'Salon & Barbershop 24/7 Booking Platform',
      p0b_copy: 'Deployed booking &amp; management web app for salons and service businesses with <strong>24/7 online scheduling</strong>, real-time admin dashboard, cash-flow tracking, and <strong>Firebase / Firestore</strong> authentication &amp; security rules.',
      p1_role: '03 // TECH LEAD', p1_title: 'Multinational Financial Compliance Engine',
      p1_copy: 'Full-stack platform managing complex tax compliance workflows across <strong>Chile, Peru, and Colombia</strong>. Includes brute-force lockout protection, RBAC admin dashboard, automated tax reporting (<strong>40% fewer manual errors</strong>), and a <strong>Jenkins CI/CD</strong> pipeline.',
      p2_role: '04 // BACKEND LEAD', p2_title: 'Life Harmony — AI Mobile Nutrition App',
      p2_copy: 'Cross-platform mobile app combining <strong>AI-assisted calorie tracking</strong> with a real-time <strong>Firebase / Firestore</strong> backend, offline persistence, granular security rules for sensitive health records, and <strong>+25% navigation efficiency</strong>.',
      p3_role: '05 // CONTINUOUS PRACTICE', p3_title: 'Algorithms & Engineering Fundamentals',
      p3_copy: 'Open Python repository documenting algorithmic problem-solving, clean code patterns, time/space complexity optimization, and core computer science fundamentals written from scratch.',
      code_skills: 'STOP 04 // NIGHT SKYLINE LOADOUT', hdr_skills: 'TECHNICAL SKILLS',
      sk1: 'Backend & Data', sk2: 'Frontend & Mobile', sk3: 'Cloud & DevOps',
      code_edu: 'STOP 05 // ARCHIVE CREDENTIALS', hdr_edu: 'EDUCATION & CERTIFICATIONS',
      edu_kicker: 'DEGREE', edu_degree: 'B.S. in Computer Engineering', edu_date: 'EXPECTED DEC 2026',
      certs_caption: 'CLICK ANY CREDENTIAL TO INSPECT PDF RIGHT INSIDE THIS PAGE',
      c1_t: 'Cloud Architecture', c2_t: 'Full-Stack Developer', c3_t: 'Database Design & Mgmt', c4_t: 'Agile Systems Design',
      btn_view_pdf: 'VIEW PDF',
      code_contact: 'STOP 06 // DIRECT SNS LINE', hdr_contact: 'CONTACT BRUNO',
      sns_out1: 'Leave it to me.',
      chat1: 'Hey! Looking for a remote Junior / Trainee Software Engineer?',
      chat2: 'Python, Backend, SQL &amp; Full-Stack &mdash; building clean, automated software from <strong>Santiago, Chile (UTC-3)</strong>.',
      chat3: 'Drop me an email at <strong>brunomaldonado04@gmail.com</strong> &mdash; fast response guaranteed.',
      contact_kicker: 'QUICK ACTIONS', contact_h3: 'CONNECT DIRECTLY',
      contact_copy: 'Choose a channel below or open my updated resume right inside the page.',
      btn_copy_email: 'COPY EMAIL ADDRESS', btn_copied: 'EMAIL COPIED!',
      btn_send_mail: 'SEND EMAIL ↗', btn_linkedin: 'LINKEDIN PROFILE ↗',
      btn_github: 'GITHUB REPOSITORIES ↗', btn_inspect_resume: 'INSPECT RESUME PDF',
      pdf_stamp: 'CONFIDENTIAL // IN-PAGE VIEWER', pdf_download: 'DOWNLOAD PDF', pdf_newtab: 'NEW TAB ↗', pdf_close: 'CLOSE ×',
      aoa_kicker: 'ALL-OUT ATTACK // FINISHER', aoa_headline: 'THE CODE IS CLEAN.', aoa_sub: 'BRUNO MALDONADO · MISSION COMPLETE · CLICK TO CONTINUE',
      cc_slogan: 'SHIP YOUR CODE',
      cc_target: 'Your Team',
      cc_sub: '- The builders of great software',
      cc_body: 'We know your backlog is full of slow queries and manual chaos. That is why I will arrive remotely from Chile to automate it and ship clean production code.',
      cc_from: 'FROM,',
      cc_sign: 'Bruno Maldonado',
      dialogues: {
        profile: [
          'Welcome to Line 03. I’m Bruno Maldonado — Software Engineer focused on Python, Backend, and clean full-stack systems.',
          'Tip: Use keys 1–6 or ↑/↓ to jump stops. And yes... there are a few Persona 5 Easter Eggs hidden around this station.'
        ],
        experience: [
          'At Huawei Technologies I built Python & SQL automation apps that compressed multi-week manual reporting (~90% automated, saving ~15 hrs/week).',
          'I also optimized national-scale SQL queries and relational models, cutting processing times by 35% while supporting customer churn analytics.'
        ],
        projects: [
          'Five featured builds: PhantomSW & my deployed 24/7 Salon booking platform, plus a multinational tax engine, Life Harmony (AI), and my Python algorithms suite.',
          'Scroll through the dossier cards or click LIVE SITE on PhantomSW to see it running in production.'
        ],
        skills: [
          'My primary loadout centers on Python, Django, Node.js, PostgreSQL, and Firebase — backed by Docker, Jenkins CI/CD, and cloud fundamentals.',
          'I prefer building reliable architectures and writing clean code over chasing hype.'
        ],
        education: [
          'Finishing my Computer Engineering degree at INACAP this December 2026 — click any certificate card above to inspect the official PDF inside this page.',
          'You can also open my English or Spanish Resume anytime from the top HUD bar without leaving the site.'
        ],
        contact: [
          'Final stop! Looking for a remote Junior / Trainee Software Engineer? Hit COPY EMAIL or shoot me a message on LinkedIn.',
          'Based in Santiago, Chile (UTC-3) — aligned with US/Americas time zones and ready to ship.'
        ]
      }
    },
    es: {
      hud_resume_en: 'CV (EN)', hud_resume_es: 'CV (ES)', hud_title: 'INICIO',
      title_eyebrow: 'PORTAFOLIO // SANTIAGO EXPRESS',
      title_status: 'DISPONIBLE PARA ROLES JR / TRAINEE 100% REMOTOS',
      title_role: 'INGENIERO DE SOFTWARE',
      title_huawei: 'AUTOMATIZACIÓN Y CLOUD',
      title_board: 'ENTRAR A LA ESTACIÓN',
      title_hint: 'HAZ CLIC O PRESIONA [ENTER] / [ESPACIO] · ACTIVA ♪ BGM PARA EL RITMO',
      nav_select: 'ELIGE PARADA',
      nav_hint: '[↑/↓] MOVER   [1-6] SALTAR   [ESC] INICIO',
      menu: {
        profile: ['P', 'ERFIL', true], experience: ['E', 'XPERIENCIA', false], projects: ['P', 'ROYECTOS', false],
        skills: ['S', 'KILLS', false], education: ['C', 'ERTS', true], contact: ['C', 'ONTACTO', false]
      },
      radar: ['BACKEND', 'SQL', 'AUTOMATIZACIÓN', 'CLOUD', 'FULL-STACK'],
      mission_cleared: 'MISIÓN COMPLETADA',
      tab_p1: '02 · APP PELUQUERÍA 24/7', tab_p2: '03 · MOTOR TRIBUTARIO', tab_p3: '04 · LIFE HARMONY IA', tab_p4: '05 · ALGORITMOS',
      deck: [
        {
          role: '01 // DESPLEGADO EN PRODUCCIÓN', title: 'PHANTOMSW — PLATAFORMA SAAS',
          copy: 'Plataforma web en producción construida con <strong>React, Vite y Serverless Functions</strong> con pagos reales vía <strong>Flow.cl</strong>, detección automática de divisa por IP (CLP/USD), comprobantes PDF automáticos y correos transaccionales con adjuntos.',
          chips: ['REACT', 'VITE', 'NODE SERVERLESS', 'FLOW.CL', 'PDF Y CORREOS'],
          link: 'https://phantomsw.vercel.app/', linkLabel: 'ABRIR SITIO EN VIVO ↗'
        },
        {
          role: '02 // APP EN PRODUCCIÓN', title: 'RESERVAS 24/7 PARA PELUQUERÍAS',
          copy: 'Aplicación web desplegada para salones y negocios de servicios con <strong>agenda online 24/7</strong>, panel administrativo en tiempo real, control de caja y autenticación + reglas de seguridad en <strong>Firebase / Firestore</strong>.',
          chips: ['REACT', 'FIREBASE AUTH', 'FIRESTORE RULES', 'PANEL ADMIN', 'AGENDA 24/7']
        },
        {
          role: '03 // LÍDER TÉCNICO', title: 'MOTOR FINANCIERO MULTINACIONAL',
          copy: 'Plataforma full-stack para gestionar flujos impositivos complejos en <strong>Chile, Perú y Colombia</strong>. Incluye protección contra fuerza bruta, panel administrativo RBAC, automatización tributaria (<strong>40% menos errores manuales</strong>) y pipeline <strong>CI/CD con Jenkins</strong>.',
          chips: ['PYTHON', 'DJANGO', 'JAVASCRIPT', 'POSTGRESQL', 'JENKINS CI/CD']
        },
        {
          role: '04 // LÍDER BACKEND · IA', title: 'LIFE HARMONY — APP NUTRICIÓN IA',
          copy: 'App móvil multiplataforma que combina <strong>control calórico asistido con IA</strong> y base de datos en tiempo real <strong>Firebase / Firestore</strong>, persistencia offline, reglas de seguridad granulares y <strong>+25% eficiencia de navegación</strong>.',
          chips: ['DART', 'FLUTTER', 'INTEGRACIÓN IA', 'FIREBASE', 'FIRESTORE RULES']
        },
        {
          role: '05 // PRÁCTICA CONTINUA', title: 'ALGORITMOS Y FUNDAMENTOS CS',
          copy: 'Práctica continua en Python resolviendo problemas algorítmicos, estructuras de datos, optimización de complejidad temporal/espacial y código limpio escrito desde cero.',
          chips: ['PYTHON', 'ALGORITMOS', 'ESTRUCTURAS', 'CLEAN CODE']
        }
      ],
      locs: {
        profile: 'BRUNO MALDONADO · ANDÉN 01', experience: 'VAGÓN EXPRESO 01 · EXPERIENCIA',
        projects: 'VAGÓN EXPRESO 02 · PROYECTOS', skills: 'ESTACIÓN NOCTURNA · STACK',
        education: 'ANDÉN ARCHIVO · INACAP', contact: 'PARADA FINAL · MENSAJE'
      },
      subs: {
        profile: 'PARADA 01 // ANDÉN', experience: 'PARADA 02 // SUBIENDO VAGÓN 01',
        projects: 'PARADA 03 // SUBIENDO VAGÓN 02', skills: 'PARADA 04 // ESTACIÓN NOCTURNA',
        education: 'PARADA 05 // CREDENCIALES', contact: 'PARADA 06 // MENSAJE SNS'
      },
      sub_profile: 'ANDÉN SUBTERRÁNEO', sub_experience: 'ADENTRO DEL VAGÓN',
      sub_projects: 'ADENTRO DEL VAGÓN', sub_skills: 'VISTA NOCTURNA',
      sub_education: 'PDFS VERIFICABLES', sub_contact: 'MENSAJE DIRECTO',
      code_profile: 'PARADA 01 // PERFIL INGENIERO',
      profile_bio: 'Estudiante de último año de Ingeniería en Informática en <strong>INACAP</strong> (titulación Dic. 2026), basado en <strong>Santiago, Chile</strong>. Diseño arquitecturas backend confiables, automatizo procesos de datos, optimizo SQL a escala y construyo software full-stack limpio y mantenible.',
      stat1_lbl: 'FOCO PRINCIPAL', stat1_val: 'Backend y Automatización', stat1_note: 'Python · SQL · APIs',
      stat2_lbl: 'IDIOMAS', stat2_val: 'ES (Nativo) / EN (B1)', stat2_note: 'Técnico y Conversacional',
      stat3_lbl: 'MODALIDAD', stat3_val: '100% Remoto',
      btn_board_exp: 'IR A EXPERIENCIA →', btn_view_resume: 'VER CV EN PDF',
      code_exp: 'PARADA 02 // VAGÓN EXPRESO 01', hdr_exp: 'EXPERIENCIA', exp_kicker: 'PRÁCTICA PROFESIONAL',
      exp_date: 'ENE 2026 – MAY 2026', exp_m1: '~90% AUTO', exp_m2: 'DATOS CHURN', exp_m3: '-35% TIEMPO',
      exp_b1: 'Desarrollé aplicaciones internas de automatización en <strong>Python y SQL</strong> para reportes e insights de negocio, comprimiendo procesos que tomaban <strong>semanas de trabajo manual</strong> (~15 h/semana ahorradas).',
      exp_b2: 'Participé en el procesamiento y análisis de datos para iniciativas de <strong>churn (fuga de clientes)</strong>, limpiando y transformando grandes volúmenes de datos en métricas accionables.',
      exp_b3: 'Optimicé consultas SQL complejas y modelos relacionales a escala nacional, <strong>reduciendo el tiempo de procesamiento en un 35%</strong> y asegurando integridad en reportes críticos.',
      code_proj: 'PARADA 03 // VAGÓN EXPRESO 02', hdr_proj: 'PROYECTOS DESTACADOS', btn_repo: 'VER REPO ↗',
      btn_live: 'SITIO EN VIVO ↗', btn_live_app: 'APP EN VIVO ↗',
      p0_role: '01 // DESPLEGADO EN PRODUCCIÓN', p0_title: 'PhantomSW — Plataforma SaaS Multi-Vertical',
      p0_copy: 'Plataforma web en producción construida con <strong>React, Vite y Serverless Functions</strong> con pagos reales vía <strong>Flow.cl</strong>, detección automática de divisa por IP (CLP/USD), comprobantes PDF automáticos y correos transaccionales con adjuntos.',
      p0b_role: '02 // DESPLEGADO EN PRODUCCIÓN', p0b_title: 'Plataforma de Reservas 24/7 para Peluquerías',
      p0b_copy: 'Aplicación web desplegada para salones y negocios de servicios con <strong>agenda online 24/7</strong>, panel administrativo en tiempo real, control de caja y autenticación + reglas de seguridad en <strong>Firebase / Firestore</strong>.',
      p1_role: '03 // LÍDER TÉCNICO', p1_title: 'Motor de Cumplimiento Financiero Multinacional',
      p1_copy: 'Plataforma full-stack para gestionar flujos impositivos complejos en <strong>Chile, Perú y Colombia</strong>. Incluye protección contra fuerza bruta, panel administrativo RBAC, automatización tributaria (<strong>40% menos errores manuales</strong>) y pipeline <strong>CI/CD con Jenkins</strong>.',
      p2_role: '04 // LÍDER BACKEND', p2_title: 'Life Harmony — App Móvil de Nutrición con IA',
      p2_copy: 'App móvil multiplataforma que combina <strong>control calórico asistido con IA</strong> y base de datos en tiempo real <strong>Firebase / Firestore</strong>, persistencia offline, reglas de seguridad granulares y <strong>+25% eficiencia de navegación</strong>.',
      p3_role: '05 // PRÁCTICA CONTINUA', p3_title: 'Algoritmos y Fundamentos de Ingeniería',
      p3_copy: 'Repositorio abierto en Python documentando resolución de problemas algorítmicos, código limpio, optimización de complejidad y fundamentos de ciencias de la computación escritos desde cero.',
      code_skills: 'PARADA 04 // EQUIPAMIENTO TÉCNICO', hdr_skills: 'HABILIDADES TÉCNICAS',
      sk1: 'Backend y Datos', sk2: 'Frontend y Móvil', sk3: 'Cloud y DevOps',
      code_edu: 'PARADA 05 // CREDENCIALES', hdr_edu: 'EDUCACIÓN Y CERTIFICACIONES',
      edu_kicker: 'CARRERA', edu_degree: 'Ingeniería en Informática', edu_date: 'TITULACIÓN DIC 2026',
      certs_caption: 'HAZ CLIC EN CUALQUIER CERTIFICADO PARA VER EL PDF AQUÍ MISMO',
      c1_t: 'Arquitectura Cloud', c2_t: 'Desarrollador Full-Stack', c3_t: 'Diseño y Gestión de BD', c4_t: 'Diseño Ágil de Sistemas',
      btn_view_pdf: 'VER PDF',
      code_contact: 'PARADA 06 // LÍNEA DIRECTA SNS', hdr_contact: 'CONTACTO',
      sns_out1: 'Déjamelo a mí.',
      chat1: '¡Hola! ¿Buscas un Ingeniero de Software Jr / Trainee 100% remoto?',
      chat2: 'Python, Backend, SQL y Full-Stack &mdash; construyendo software limpio y automatizado desde <strong>Santiago, Chile (UTC-3)</strong>.',
      chat3: 'Escríbeme directo a <strong>brunomaldonado04@gmail.com</strong> &mdash; respondo rápido.',
      contact_kicker: 'ACCIONES RÁPIDAS', contact_h3: 'CONECTEMOS',
      contact_copy: 'Elige un canal o abre mi CV actualizado directamente dentro de esta página.',
      btn_copy_email: 'COPIAR CORREO', btn_copied: '¡CORREO COPIADO!',
      btn_send_mail: 'ENVIAR CORREO ↗', btn_linkedin: 'PERFIL LINKEDIN ↗',
      btn_github: 'REPOSITORIOS GITHUB ↗', btn_inspect_resume: 'VER CV EN PDF',
      pdf_stamp: 'CONFIDENCIAL // VISOR INTEGRADO', pdf_download: 'DESCARGAR PDF', pdf_newtab: 'NUEVA PESTAÑA ↗', pdf_close: 'CERRAR ×',
      aoa_kicker: 'ALL-OUT ATTACK // REMATE', aoa_headline: 'EL CÓDIGO ESTÁ LIMPIO.', aoa_sub: 'BRUNO MALDONADO · MISIÓN CUMPLIDA · CLIC PARA SEGUIR',
      cc_slogan: 'SHIP YOUR CODE',
      cc_target: 'Tu Equipo',
      cc_sub: '- Los creadores de software',
      cc_body: 'Sabemos que su backlog tiene consultas lentas y tareas manuales. Por eso llegaré remoto desde Chile a automatizar el caos y entregar código limpio en producción.',
      cc_from: 'DE PARTE DE,',
      cc_sign: 'Bruno Maldonado',
      dialogues: {
        profile: [
          'Bienvenido a la Línea 03. Soy Bruno Maldonado — Ingeniero de Software enfocado en Python, Backend y sistemas full-stack limpios.',
          'Tip: Usa las teclas 1–6 o ↑/↓ para moverte. Y sí... hay varios Easter Eggs de Persona 5 escondidos en esta estación.'
        ],
        experience: [
          'En Huawei Technologies creé apps de automatización en Python y SQL que comprimieron reportes de semanas (~90% automatizado, ~15 h/semana ahorradas).',
          'También optimicé consultas SQL a escala nacional reduciendo el tiempo de procesamiento en un 35% y apoyé análisis de fuga de clientes.'
        ],
        projects: [
          'Cinco proyectos clave: PhantomSW y la app desplegada de peluquerías 24/7, más el motor tributario multinacional, Life Harmony (IA) y mi práctica de algoritmos.',
          'Haz scroll en las tarjetas o clic en SITIO EN VIVO en PhantomSW para verlo funcionando en producción.'
        ],
        skills: [
          'Mi stack principal gira en torno a Python, Django, Node.js, PostgreSQL y Firebase — respaldado por Docker, Jenkins CI/CD y Cloud.',
          'Prefiero arquitecturas sólidas y código mantenible antes que modas pasajeras.'
        ],
        education: [
          'Cerrando Ingeniería en Informática en INACAP este diciembre 2026 — haz clic en cualquier certificado para abrir el PDF oficial sin salir de la página.',
          'También puedes abrir mi CV en inglés o español desde la barra superior cuando quieras.'
        ],
        contact: [
          '¡Última parada! Si buscas un desarrollador Jr / Trainee remoto, copia mi correo o escríbeme por LinkedIn.',
          'Desde Santiago, Chile (UTC-3) — mismo huso horario que EE.UU./América y listo para aportar.'
        ]
      }
    },
    jp: {
      hud_resume_en: '履歴書 (EN)', hud_resume_es: '履歴書 (ES)', hud_title: 'タイトル',
      title_eyebrow: 'ポートフォリオ // サンティアゴ急行',
      title_status: 'フルリモート ジュニア開発者 募集中',
      title_role: 'ソフトウェアエンジニア',
      title_huawei: '自動化・クラウド',
      title_board: 'ホームに入る',
      title_hint: 'クリック または [ENTER] で開始 · ♪ BGM で音楽再生 (秘密の日本語モード発動中！)',
      nav_select: '停車駅を選択',
      nav_hint: '[↑/↓] 移動   [1-6] 駅選択   [ESC] タイトル',
      menu: {
        profile: ['プ', 'ロフィール', true], experience: ['経', '歴', false], projects: ['実', '績', false],
        skills: ['技', '術', false], education: ['資', '格', true], contact: ['連', '絡先', false]
      },
      radar: ['バックエンド', 'SQL', '自動化', 'クラウド', 'フルスタック'],
      mission_cleared: 'ミッション達成',
      tab_p1: '02 · サロン24時間予約', tab_p2: '03 · 多国籍税務基盤', tab_p3: '04 · LIFE HARMONY AI', tab_p4: '05 · アルゴリズム',
      deck: [
        {
          role: '01 // 本番運用中', title: 'PHANTOMSW — マルチ業種SAAS',
          copy: '<strong>React・Vite・Serverless Functions</strong>で構築した本番Web基盤。<strong>Flow.cl</strong>決済連携、IP通貨自動切替(CLP/USD)、PDF領収書自動生成、添付付きトランザクションメールを実装。',
          chips: ['REACT', 'VITE', 'SERVERLESS', 'FLOW.CL', 'PDF自動化'],
          link: 'https://phantomsw.vercel.app/', linkLabel: '公開サイトを開く ↗'
        },
        {
          role: '02 // 本番運用中', title: '美容室・サロン24時間予約アプリ',
          copy: 'サロン・サービス業向けに本番デプロイ済みの予約管理アプリ。<strong>24時間Web予約</strong>、リアルタイム管理画面、収支管理、<strong>Firebase / Firestore</strong>認証＆セキュリティルールを搭載。',
          chips: ['REACT', 'FIREBASE AUTH', 'FIRESTORE', '管理画面', '24時間予約']
        },
        {
          role: '03 // テックリード', title: '多国籍 金融・税務エンジン',
          copy: '<strong>チリ・ペルー・コロンビア</strong>の税務ワークフローを統合管理するフルスタック基盤。ブルートフォース防御、RBAC管理画面、税務レポート自動化（<strong>手作業ミス40%削減</strong>）、<strong>Jenkins CI/CD</strong> を構築。',
          chips: ['PYTHON', 'DJANGO', 'POSTGRESQL', 'JENKINS CI/CD']
        },
        {
          role: '04 // バックエンドリード · AI', title: 'LIFE HARMONY — AI栄養管理アプリ',
          copy: '<strong>AIカロリー管理</strong>とリアルタイム <strong>Firebase / Firestore</strong> バックエンドを統合したモバイルアプリ。オフライン永続化、厳格なセキュリティルール、<strong>操作効率+25%向上</strong>を実現。',
          chips: ['DART', 'FLUTTER', 'AI連携', 'FIREBASE', 'FIRESTORE']
        },
        {
          role: '05 // 継続トレーニング', title: 'アルゴリズム＆計算機科学の基礎',
          copy: 'Pythonでゼロから実装したアルゴリズム問題解決、計算量最適化、データ構造とクリーンコード設計の継続トレーニング。',
          chips: ['PYTHON', 'アルゴリズム', 'データ構造', 'CLEAN CODE']
        }
      ],
      locs: {
        profile: 'ブルーノ・マルドナド · 1番線ホーム', experience: '急行1号車 · 実務経歴',
        projects: '急行2号車 · プロジェクト', skills: '夜間高架駅 · 技術装備',
        education: '記録車両 · INACAP', contact: '終点 · ダイレクトSNS'
      },
      subs: {
        profile: '第1駅 // プラットフォーム', experience: '第2駅 // 急行1号車へ乗車',
        projects: '第3駅 // 急行2号車へ乗車', skills: '第4駅 // 夜間高架ホーム',
        education: '第5駅 // 認定証アーカイブ', contact: '終点 // スマートフォン通信'
      },
      sub_profile: '地下ホーム', sub_experience: '急行車内',
      sub_projects: '急行車内', sub_skills: '夜景高架駅',
      sub_education: '公式PDF証明書', sub_contact: 'ダイレクト連絡',
      code_profile: '第1駅 // エンジニア・ファイル',
      profile_bio: 'チリ・サンティアゴ在住、<strong>INACAP</strong> 情報工学部 最終学年（2026年12月卒業予定）。Python・SQL最適化・業務自動化・堅牢なバックエンド設計からフルスタック開発まで一貫して構築します。',
      stat1_lbl: '専門領域', stat1_val: 'バックエンド＆自動化', stat1_note: 'Python · SQL · APIs',
      stat2_lbl: '対応言語', stat2_val: '西語(母語) / 英語(B1)', stat2_note: '技術読解・ビジネス会話',
      stat3_lbl: '勤務形態', stat3_val: '100% リモート',
      btn_board_exp: '経歴車両へ乗車 →', btn_view_resume: '履歴書PDFを表示',
      code_exp: '第2駅 // 急行1号車', hdr_exp: '実務経歴', exp_kicker: '企業インターンシップ',
      exp_date: '2026年1月 – 2026年5月', exp_m1: '約90% 自動化', exp_m2: '離脱分析', exp_m3: '処理 -35%',
      exp_b1: '<strong>Python と SQL</strong> を用いて社内向け業務レポート自動化アプリを開発。数週間かかっていた手作業を <strong>約90%自動化</strong>（週約15時間削減）。',
      exp_b2: '顧客離脱（<strong>チャーン分析</strong>）プロジェクトにて大規模データセットの前処理・探索的分析を担当し、施策に直結する指標を整備。',
      exp_b3: '全国規模の複雑なSQLクエリおよびリレーショナル設計を最適化し、<strong>データ処理時間を35%短縮</strong>。',
      code_proj: '第3駅 // 急行2号車', hdr_proj: '主要プロジェクト', btn_repo: 'GITHUBを見る ↗',
      btn_live: '公開サイト ↗', btn_live_app: '公開アプリ ↗',
      p0_role: '01 // 本番運用中', p0_title: 'PhantomSW — マルチ業種SaaSプラットフォーム',
      p0_copy: '<strong>React・Vite・Serverless Functions</strong>で構築した本番Web基盤。<strong>Flow.cl</strong>決済連携、IP通貨自動切替(CLP/USD)、PDF領収書自動生成、添付付きトランザクションメールを実装。',
      p0b_role: '02 // 本番運用中', p0b_title: '美容室・サロン向け24時間オンライン予約アプリ',
      p0b_copy: 'サロン・サービス業向けに本番デプロイ済みの予約管理アプリ。<strong>24時間Web予約</strong>、リアルタイム管理画面、収支管理、<strong>Firebase / Firestore</strong>認証＆セキュリティルールを搭載。',
      p1_role: '03 // テックリード', p1_title: '多国籍 金融・税務コンプライアンスエンジン',
      p1_copy: '<strong>チリ・ペルー・コロンビア</strong>の税務ワークフローを統合管理するフルスタック基盤。ブルートフォース防御、RBAC管理画面、税務レポート自動化（<strong>手作業ミス40%削減</strong>）、<strong>Jenkins CI/CD</strong> を構築。',
      p2_role: '04 // バックエンドリード', p2_title: 'Life Harmony — AI栄養管理モバイルアプリ',
      p2_copy: '<strong>AIカロリー管理</strong>とリアルタイム <strong>Firebase / Firestore</strong> バックエンドを統合したモバイルアプリ。オフライン永続化、厳格なセキュリティルール、<strong>操作効率+25%向上</strong>を実現。',
      p3_role: '05 // 継続トレーニング', p3_title: 'アルゴリズム＆計算機科学の基礎',
      p3_copy: 'Pythonでゼロから実装したアルゴリズム問題解決、計算量最適化、クリーンコード設計を記録する公開リポジトリ。',
      code_skills: '第4駅 // 技術ロードアウト', hdr_skills: 'テクニカルスキル',
      sk1: 'バックエンド＆データ', sk2: 'フロント＆モバイル', sk3: 'クラウド＆DevOps',
      code_edu: '第5駅 // 資格・学歴アーカイブ', hdr_edu: '学歴・公式認定資格',
      edu_kicker: '学位', edu_degree: '情報工学 学士（Computer Engineering）', edu_date: '2026年12月 卒業予定',
      certs_caption: '各認定カードをクリックすると、このページ内で公式PDFを確認できます',
      c1_t: 'クラウドアーキテクチャ', c2_t: 'フルスタック開発者', c3_t: 'データベース設計・管理', c4_t: 'アジャイルシステム設計',
      btn_view_pdf: 'PDF表示',
      code_contact: '終点 // ダイレクト通信', hdr_contact: 'お問い合わせ',
      sns_out1: 'まかせろ',
      chat1: 'こんにちは！フルリモートのジュニア・ソフトウェアエンジニアをお探しですか？',
      chat2: 'Python・バックエンド・SQL・フルスタック対応 — <strong>チリ・サンティアゴ (UTC-3)</strong> よりクリーンな開発をお届けします。',
      chat3: 'ご連絡は <strong>brunomaldonado04@gmail.com</strong> まで — 迅速に返信します！',
      contact_kicker: 'クイックアクション', contact_h3: 'ダイレクト連絡',
      contact_copy: '下のボタンからメールコピーや履歴書PDFの閲覧ができます。',
      btn_copy_email: 'メールアドレスをコピー', btn_copied: 'コピー完了！',
      btn_send_mail: 'メールを送る ↗', btn_linkedin: 'LINKEDIN を見る ↗',
      btn_github: 'GITHUB リポジトリ ↗', btn_inspect_resume: '履歴書PDFを確認',
      pdf_stamp: '極秘資料 // ページ内ビューア', pdf_download: 'PDF保存', pdf_newtab: '別タブで開く ↗', pdf_close: '閉じる ×',
      aoa_kicker: '総攻撃 // フィニッシュ', aoa_headline: 'コードは完璧だ。', aoa_sub: 'BRUNO MALDONADO · ミッション完了 · クリックで戻る',
      cc_slogan: 'SHIP YOUR CODE',
      cc_target: '貴社開発チーム殿',
      cc_sub: '- 未来を創るエンジニアへ',
      cc_body: '遅いSQLと手作業のバックログを確認した。サンティアゴからフルリモートで参上し、自動化とクリーンなコードで課題を鮮やかに解決する。',
      cc_from: '差出人：',
      cc_sign: 'Bruno Maldonado',
      dialogues: {
        profile: [
          'シークレット日本語モードへようこそ！ブルーノ・マルドナドです。Pythonとバックエンド開発が得意なエンジニアです。',
          '隠しコマンド発見おめでとう！ジョッキーロゴを3回クリックすると…「総攻撃」が見られるかも？'
        ],
        experience: [
          'Huawei TechnologiesではPythonとSQLで社内レポートを約90%自動化し、毎週約15時間の工数を削減しました。',
          '全国規模のSQL最適化によりデータ処理速度を35%高速化しました。'
        ],
        projects: [
          '本番稼働中のPhantomSW＆美容室24時間予約アプリに加え、多国籍税務基盤・AI栄養アプリ・Pythonアルゴリズム集の5本を掲載しています。',
          'スクロールして各カードを確認し、PhantomSWの公開サイトも直接チェックできます。'
        ],
        skills: [
          'Python・Django・Node.js・PostgreSQL・Firebaseを軸に、DockerとJenkins CI/CDで堅実な開発を行います。',
          '流行り言葉より、安定して動くクリーンな設計を大切にしています。'
        ],
        education: [
          '2026年12月にINACAPを卒業予定です。上のカードをクリックすると、ページを離れずに公式PDF証明書を閲覧できます。',
          '上部のバーから英語・スペイン語の履歴書PDFもすぐ開けます。'
        ],
        contact: [
          '終点に到着しました！リモート開発の案件や採用のご相談は、メールまたはLinkedInまでお気軽にどうぞ。',
          '上の日付ボックスを3回クリックすると、秘密の「予告状」が出現しますよ。'
        ]
      }
    }
  };

  let currentLang = 'en';

  // Authentic Persona 5 Ransom-Note Cutout Letter Generator
  const RANSOM_STYLES = ['r-bw', 'r-wb', 'r-bw', 'r-br', 'r-wb', 'r-bw', 'r-wr', 'r-wb'];
  const RANSOM_FONTS = ['r-f0', 'r-f1', 'r-f2', 'r-f3'];
  const RANSOM_ROT = [-7, 5, -4, 7, -6, 3, -8, 6, -3, 4];

  function renderRansomHtml(text, isSlogan) {
    const words = String(text || '').split(' ');
    let charIdx = 0;
    return words.map((word) => {
      const tiles = Array.from(word).map((ch) => {
        const i = charIdx++;
        const rot = RANSOM_ROT[i % RANSOM_ROT.length];
        const dy = ((i % 3) - 1) * 1.5;
        const font = RANSOM_FONTS[(i * 3 + 1) % RANSOM_FONTS.length];
        if (isSlogan) {
          const alt = (i % 5 === 2) ? ' r-alt' : '';
          return `<span class="r-tile ${font}${alt}" style="transform:rotate(${rot}deg) translateY(${dy}px)">${ch}</span>`;
        }
        const style = RANSOM_STYLES[(i * 7 + ch.charCodeAt(0)) % RANSOM_STYLES.length];
        return `<span class="r-tile ${style} ${font}" style="transform:rotate(${rot}deg) translateY(${dy}px)">${ch}</span>`;
      }).join('');
      return `<span class="r-word">${tiles}</span>`;
    }).join('');
  }

  function renderCallingCard(lang) {
    const dict = I18N[lang] || I18N.en;
    const set = (id, text, isSlogan) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = renderRansomHtml(text, isSlogan);
    };
    set('ccSlogan', dict.cc_slogan, true);
    set('ccTarget', dict.cc_target, false);
    set('ccSubtitle', dict.cc_sub, false);
    set('ccBodyRansom', dict.cc_body, false);
    set('ccFrom', dict.cc_from, false);
    set('ccSignature', dict.cc_sign, false);
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    body.setAttribute('data-lang', lang);
    const dict = I18N[lang];
    renderCallingCard(lang);

    if (langLabel && langToggle) {
      langLabel.textContent = lang === 'jp' ? '日本語 ★' : (lang === 'es' ? 'ES / EN' : 'EN / ES');
      langToggle.classList.toggle('is-jp', lang === 'jp');
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-menu]').forEach((el) => {
      const key = el.getAttribute('data-i18n-menu');
      if (dict.menu && dict.menu[key]) {
        const [first, rest, hasStar] = dict.menu[key];
        const star = hasStar ? '<span class="arc-star">&#9733;</span>' : '';
        el.innerHTML = `<span class="big-first">${first}</span>${rest}${star}`;
      }
    });

    // Update Radar Pentagon labels
    if (dict.radar) {
      dict.radar.forEach((lbl, i) => {
        const tEl = document.getElementById('rad' + (i + 1));
        if (tEl) tEl.textContent = lbl;
      });
    }

    // Re-render Compendium active project plate in current language
    renderCompendiumPlate(activeProjectIdx);

    // Update current HUD location & dialogue text immediately
    const activeView = body.getAttribute('data-view') || 'profile';
    if (hudLoc && dict.locs[activeView]) {
      hudLoc.textContent = body.classList.contains('mode-title') ? dict.locs.profile : dict.locs[activeView];
    }
    if (!body.classList.contains('mode-title')) {
      startDialogue(activeView, 0);
    }
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      playSelectSnap();
      applyLanguage(currentLang === 'en' ? 'es' : 'en');
    });
  }

  // ---------------------------------------------------------
  // 2. First-Entry Motion Graphics Opener
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
  // 3. Live Persona HUD Date Widget
  // ---------------------------------------------------------
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  if (hudDate) hudDate.textContent = `${mm}/${dd}`;
  if (hudDay) hudDay.textContent = days[now.getDay()];

  // ---------------------------------------------------------
  // 4. Web Audio Engine: UI SFX + 122 BPM Jazztronik Nu-Jazz BGM
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

  // Reusable noise buffer for tactile paper-flick / slash / shatter foley
  let cachedNoiseBuf = null;
  function getNoiseBuffer(ctx) {
    if (!cachedNoiseBuf || cachedNoiseBuf.sampleRate !== ctx.sampleRate) {
      const len = Math.floor(ctx.sampleRate * 0.4);
      cachedNoiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = cachedNoiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    return cachedNoiseBuf;
  }

  // 1. Iconic Persona-style Hover: crisp card/paper flick + metallic micro-snap
  function playHoverTick() {
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Layer A: razor-sharp paper-flick transient
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3400, t);
    bp.Q.setValueAtTime(2.6, t);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.09, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.024);
    noise.connect(bp);
    bp.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.028);

    // Layer B: snappy woody/metallic pitch drop
    const osc = ctx.createOscillator();
    const oGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1450, t);
    osc.frequency.exponentialRampToValueAtTime(460, t + 0.032);
    oGain.gain.setValueAtTime(0.045, t);
    oGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.036);
    osc.connect(oGain);
    oGain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  // 2. Iconic Confirm Click: diagonal blade/card whip + sub-thump + stylish 2-note jazz stab
  function playSelectSnap() {
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Layer A: tactile slash / card-whip swoosh
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(900, t);
    bp.frequency.exponentialRampToValueAtTime(4600, t + 0.055);
    bp.frequency.exponentialRampToValueAtTime(1200, t + 0.14);
    bp.Q.setValueAtTime(1.8, t);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.11, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    noise.connect(bp);
    bp.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.16);

    // Layer B: physical sub-bass punch
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(165, t);
    sub.frequency.exponentialRampToValueAtTime(44, t + 0.09);
    subGain.gain.setValueAtTime(0.14, t);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
    sub.connect(subGain);
    subGain.connect(ctx.destination);
    sub.start(t);
    sub.stop(t + 0.12);

    // Layer C: stylish 2-note staccato jazz-horn accent (D5 -> A5)
    const notes = [
      { f: 587.33, delay: 0.0, dur: 0.075 },
      { f: 880.00, delay: 0.045, dur: 0.14 }
    ];
    notes.forEach(({ f, delay, dur }) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t + delay);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, t + delay);
      filter.frequency.exponentialRampToValueAtTime(780, t + delay + dur);
      g.gain.setValueAtTime(0.038, t + delay);
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
      osc.connect(filter);
      filter.connect(g);
      g.connect(ctx.destination);
      osc.start(t + delay);
      osc.stop(t + delay + dur + 0.01);
    });
  }

  // 3. Iconic Cancel / Close / Back: reverse downward whip + muted drop
  function playBackCancel() {
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3400, t);
    bp.frequency.exponentialRampToValueAtTime(620, t + 0.11);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.075, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    noise.connect(bp);
    bp.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.13);

    [440, 293.66].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t + idx * 0.04);
      g.gain.setValueAtTime(0.045, t + idx * 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.04 + 0.08);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t + idx * 0.04);
      osc.stop(t + idx * 0.04 + 0.09);
    });
  }

  // 4. Ultra-subtle Dialogue Typewriter micro-tick
  function playTypeTick() {
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(920 + Math.random() * 140, t);
    g.gain.setValueAtTime(0.007, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.014);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.016);
  }

  // 5. All-Out Attack Finisher: glass/spark shatter + sub-boom + dramatic detective jazz chord
  function playAllOutHit() {
    if (!sfxEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Metallic shatter crash
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(2400, t);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.14, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
    noise.connect(hp);
    hp.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.38);

    // Deep cinematic impact boom
    const sub = ctx.createOscillator();
    const sGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(140, t);
    sub.frequency.exponentialRampToValueAtTime(32, t + 0.34);
    sGain.gain.setValueAtTime(0.22, t);
    sGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    sub.connect(sGain);
    sGain.connect(ctx.destination);
    sub.start(t);
    sub.stop(t + 0.44);

    // Rich Persona-style minor-major-9th brass chord stab (D-F-A-C#-E)
    [146.83, 293.66, 349.23, 440.00, 554.37, 659.25].forEach((freq) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + 0.02);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3400, t + 0.02);
      filter.frequency.exponentialRampToValueAtTime(420, t + 0.72);
      gain.gain.setValueAtTime(0.036, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.78);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + 0.02);
      osc.stop(t + 0.8);
    });
  }

  // =========================================================
  // 4B. SPECIAL EASTER EGG MUSIC THEMES (100% ORIGINAL SYNTH)
  // =========================================================
  let ccMusicTimer = null;
  let ccMusicStep = 0;
  let aoaTimers = [];

  // Reusable plucked Japanese Shamisen / Koto voice (Hirajoshi scale!)
  function playShamisenPluck(ctx, freq, t, vol = 0.055) {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    osc2.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    osc2.frequency.setValueAtTime(freq * 2, t);
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 3.2, t);
    filter.Q.setValueAtTime(1.6, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc2.start(t);
    osc.stop(t + 0.26);
    osc2.stop(t + 0.26);
  }

  // Easter Egg #3 Intro Sting: Japanese Hyoshigi wooden clappers + Hirajoshi koto flourish
  function playJapaneseRevealTheme() {
    if (!sfxEnabled && !bgmEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Two sharp Hyoshigi wooden clapper hits ("KAK! KAK!")
    [0, 0.16].forEach((offset) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2150, t + offset);
      osc.frequency.exponentialRampToValueAtTime(1680, t + offset + 0.045);
      g.gain.setValueAtTime(0.07, t + offset);
      g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.055);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t + offset);
      osc.stop(t + offset + 0.06);
    });

    // Rapid Hirajoshi pentatonic Shamisen flourish (D4, Eb4, G4, A4, Bb4, D5, G5)
    const scale = [293.66, 311.13, 392.00, 440.00, 466.16, 587.33, 783.99];
    scale.forEach((f, idx) => {
      playShamisenPluck(ctx, f, t + 0.26 + idx * 0.068, 0.065);
    });
  }

  // Easter Egg #1 Theme & Authentic Multi-Phase All-Out Attack Audio Engine
  // (100% Original Web Audio API Synthesis: Vinyl Scratch + Cut-In Shing + Brawl Hits
  //  + 134 BPM Hip-Hop Brass Battle Groove inspired by classic Persona battle energy!)
  let aoaMusicTimer = null;
  let aoaMusicStep = 0;
  let aoaPausedNormalBgm = false;

  // Phase 1A: Classic Hip-Hop Vinyl Turntable Scratch ("Zzzip-Wika!")
  function playVinylScratch() {
    if (!sfxEnabled && !bgmEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    [0, 0.14].forEach((offset, idx) => {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.setValueAtTime(5.2, t + offset);
      if (idx === 0) {
        bp.frequency.setValueAtTime(650, t + offset);
        bp.frequency.exponentialRampToValueAtTime(2800, t + offset + 0.065);
        bp.frequency.exponentialRampToValueAtTime(720, t + offset + 0.12);
      } else {
        bp.frequency.setValueAtTime(820, t + offset);
        bp.frequency.exponentialRampToValueAtTime(3400, t + offset + 0.09);
      }
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.11, t + offset);
      g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.125);
      noise.connect(bp);
      bp.connect(g);
      g.connect(ctx.destination);
      noise.start(t + offset);
      noise.stop(t + offset + 0.13);
    });
  }

  // Phase 1B: Iconic Persona Eye Cut-In Metallic Blade "SHING!"
  function playCutinShing() {
    if (!sfxEnabled && !bgmEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    [1567.98, 2349.32, 3135.96].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq * 0.85, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.12, t + 0.06);
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.34);
      g.gain.setValueAtTime(i === 0 ? 0.045 : 0.032, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });

    // Sub punch underneath the cut-in rip
    const sub = ctx.createOscillator();
    const sg = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(175, t);
    sub.frequency.exponentialRampToValueAtTime(42, t + 0.18);
    sg.gain.setValueAtTime(0.18, t);
    sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    sub.connect(sg);
    sg.connect(ctx.destination);
    sub.start(t);
    sub.stop(t + 0.24);
  }

  // Phase 2: Rapid Comic Dust-Cloud Brawl Punch / Slash / Crit Impacts
  function playBrawlImpact(variant) {
    if (!sfxEnabled && !bgmEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Punchy body thud
    const kick = ctx.createOscillator();
    const kg = ctx.createGain();
    kick.type = 'sine';
    kick.frequency.setValueAtTime(180 + (variant % 3) * 35, t);
    kick.frequency.exponentialRampToValueAtTime(38, t + 0.1);
    kg.gain.setValueAtTime(0.16, t);
    kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    kick.connect(kg);
    kg.connect(ctx.destination);
    kick.start(t);
    kick.stop(t + 0.13);

    // Comic smack / slash burst
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(variant % 2 === 0 ? 1850 : 3200, t);
    bp.frequency.exponentialRampToValueAtTime(620, t + 0.09);
    bp.Q.setValueAtTime(1.4, t);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.12, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.11);

    // Critical spark ping on every 2nd impact
    if (variant % 2 === 1) {
      const ping = ctx.createOscillator();
      const pg = ctx.createGain();
      ping.type = 'square';
      ping.frequency.setValueAtTime(1174.66 + (variant * 120), t);
      pg.gain.setValueAtTime(0.032, t);
      pg.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
      ping.connect(pg);
      pg.connect(ctx.destination);
      ping.start(t);
      ping.stop(t + 0.09);
    }
  }

  // 134 BPM Hip-Hop Brass Battle Groove (Original Persona-3 Battle Vibe Synth!)
  const BATTLE_BASS_32 = [
    98.00, 0, 98.00, 116.54,  0, 98.00, 130.81, 0,
    138.59, 0, 146.83, 0,     130.81, 116.54, 98.00, 87.31,
    98.00, 0, 98.00, 116.54,  0, 130.81, 146.83, 0,
    174.61, 0, 146.83, 130.81, 116.54, 0, 130.81, 146.83
  ];

  // Punchy 3-voice Trumpet / Brass Horn Battle Stabs (G minor high-energy riff!)
  const BATTLE_BRASS_32 = {
    0:  [392.00, 587.33, 783.99], // G4-D5-G5 BLAST!
    3:  [466.16, 698.46, 932.33], // Bb stab
    6:  [523.25, 783.99, 1046.50], // C stab
    8:  [587.33, 880.00, 1174.66], // D5-A5-D6 HIGH STAB!
    11: [523.25, 783.99],
    14: [466.16, 698.46],
    16: [392.00, 587.33, 783.99], // G BLAST!
    19: [466.16, 698.46],
    22: [587.33, 880.00, 1174.66], // D PEAK!
    24: [698.46, 1046.50, 1396.91], // F6 SOARING HORN!
    27: [587.33, 880.00],
    30: [523.25, 783.99, 1046.50]
  };

  function playAllOutBattleStep() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const s16 = aoaMusicStep % 16;
    const s32 = aoaMusicStep % 32;

    // 1. Heavy Boom-Bap Hip-Hop Kick (steps 0, 6, 8, 10, 14)
    if (s16 === 0 || s16 === 6 || s16 === 8 || s16 === 10 || s16 === 14) {
      const k = ctx.createOscillator();
      const kg = ctx.createGain();
      k.type = 'sine';
      k.frequency.setValueAtTime(148, t);
      k.frequency.exponentialRampToValueAtTime(38, t + 0.085);
      kg.gain.setValueAtTime(s16 === 0 || s16 === 8 ? 0.14 : 0.1, t);
      kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      k.connect(kg);
      kg.connect(ctx.destination);
      k.start(t);
      k.stop(t + 0.13);
    }

    // 2. Snappy Boom-Bap Snare + Clap on beats 2 & 4 (steps 4, 12)
    if (s16 === 4 || s16 === 12) {
      const n = ctx.createBufferSource();
      n.buffer = getNoiseBuffer(ctx);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(2100, t);
      bp.Q.setValueAtTime(0.9, t);
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.095, t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
      n.connect(bp);
      bp.connect(ng);
      ng.connect(ctx.destination);
      n.start(t);
      n.stop(t + 0.12);

      // Snare body snap
      const body = ctx.createOscillator();
      const bg = ctx.createGain();
      body.type = 'triangle';
      body.frequency.setValueAtTime(215, t);
      body.frequency.exponentialRampToValueAtTime(110, t + 0.05);
      bg.gain.setValueAtTime(0.07, t);
      bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.065);
      body.connect(bg);
      bg.connect(ctx.destination);
      body.start(t);
      body.stop(t + 0.07);
    }

    // 3. Crispy 16th-Note Swinging Hi-Hats
    if (s16 % 2 === 0 || s16 === 15) {
      const n = ctx.createBufferSource();
      n.buffer = getNoiseBuffer(ctx);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(7600, t);
      const hg = ctx.createGain();
      const openHat = s16 === 2 || s16 === 10;
      hg.gain.setValueAtTime(openHat ? 0.026 : 0.015, t);
      hg.gain.exponentialRampToValueAtTime(0.0001, t + (openHat ? 0.08 : 0.032));
      n.connect(hp);
      hp.connect(hg);
      hg.connect(ctx.destination);
      n.start(t);
      n.stop(t + (openHat ? 0.09 : 0.04));
    }

    // 4. Driving Funky Battle Bassline
    const bf = BATTLE_BASS_32[s32];
    if (bf > 0) {
      const b = ctx.createOscillator();
      const flt = ctx.createBiquadFilter();
      const bg = ctx.createGain();
      b.type = 'sawtooth';
      b.frequency.setValueAtTime(bf, t);
      flt.type = 'lowpass';
      flt.frequency.setValueAtTime(780, t);
      flt.frequency.exponentialRampToValueAtTime(210, t + 0.14);
      bg.gain.setValueAtTime(0.068, t);
      bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      b.connect(flt);
      flt.connect(bg);
      bg.connect(ctx.destination);
      b.start(t);
      b.stop(t + 0.18);
    }

    // 5. High-Energy Persona-Style Staccato Trumpet / Brass Section Stabs!
    const brassChord = BATTLE_BRASS_32[s32];
    if (brassChord) {
      const dur = (s32 === 0 || s32 === 8 || s32 === 16 || s32 === 24) ? 0.24 : 0.12;
      brassChord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const flt = ctx.createBiquadFilter();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        osc.detune.setValueAtTime(idx === 1 ? 6 : (idx === 2 ? -6 : 0), t);
        flt.type = 'lowpass';
        flt.frequency.setValueAtTime(950, t);
        flt.frequency.exponentialRampToValueAtTime(3800, t + 0.025);
        flt.frequency.exponentialRampToValueAtTime(1100, t + dur);
        flt.Q.setValueAtTime(2.4, t);
        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.038, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.03);
        osc.connect(flt);
        flt.connect(g);
        g.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.05);
      });
    }

    aoaMusicStep++;
  }

  function startAllOutBattleGroove() {
    if (!sfxEnabled && !bgmEnabled) return;
    if (aoaMusicTimer) clearInterval(aoaMusicTimer);
    aoaMusicStep = 0;
    ensureAudio();
    playAllOutBattleStep();
    aoaMusicTimer = setInterval(playAllOutBattleStep, 112); // ~134 BPM Hip-Hop Brass Battle!
  }

  function stopAllOutMusic() {
    aoaTimers.forEach((id) => clearTimeout(id));
    aoaTimers = [];
    if (aoaMusicTimer) {
      clearInterval(aoaMusicTimer);
      aoaMusicTimer = null;
    }
    if (aoaPausedNormalBgm) {
      aoaPausedNormalBgm = false;
      if (bgmEnabled && !bgmTimer) {
        bgmTimer = setInterval(playNuJazzStep, 123);
      }
    }
  }

  // Easter Egg #2 Theme: Calling Card Stealth Heist Groove (E minor suspense loop!)
  const HEIST_BASS = [
    164.81, 0, 164.81, 196.00,  220.00, 0, 233.08, 246.94,
    164.81, 0, 329.63, 293.66,  246.94, 233.08, 220.00, 196.00
  ];
  const HEIST_CHORDS = [
    [329.63, 392.00, 493.88, 587.33], // Em7
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [246.94, 311.13, 369.99, 440.00]  // B7
  ];

  function playCallingCardStep() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const s16 = ccMusicStep % 16;

    // Tense driving heist kick + snare
    if (s16 % 4 === 0) {
      const k = ctx.createOscillator();
      const kg = ctx.createGain();
      k.type = 'sine';
      k.frequency.setValueAtTime(140, t);
      k.frequency.exponentialRampToValueAtTime(42, t + 0.08);
      kg.gain.setValueAtTime(0.095, t);
      kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
      k.connect(kg);
      kg.connect(ctx.destination);
      k.start(t);
      k.stop(t + 0.11);
    }

    if (s16 === 4 || s16 === 12) {
      const n = ctx.createBufferSource();
      n.buffer = getNoiseBuffer(ctx);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(1850, t);
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.065, t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
      n.connect(bp);
      bp.connect(ng);
      ng.connect(ctx.destination);
      n.start(t);
      n.stop(t + 0.09);
    }

    // Sneaky E-minor heist bass riff
    const bf = HEIST_BASS[s16];
    if (bf > 0) {
      const osc = ctx.createOscillator();
      const flt = ctx.createBiquadFilter();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(bf, t);
      flt.type = 'lowpass';
      flt.frequency.setValueAtTime(680, t);
      flt.frequency.exponentialRampToValueAtTime(220, t + 0.12);
      g.gain.setValueAtTime(0.055, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      osc.connect(flt);
      flt.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    }

    // Dramatic staccato heist brass stabs
    if (s16 === 0 || s16 === 6 || s16 === 12) {
      const cIdx = s16 === 12 ? 2 : (s16 === 6 ? 1 : 0);
      HEIST_CHORDS[cIdx].forEach((f) => {
        const osc = ctx.createOscillator();
        const flt = ctx.createBiquadFilter();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, t);
        flt.type = 'lowpass';
        flt.frequency.setValueAtTime(2200, t);
        g.gain.setValueAtTime(0.015, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        osc.connect(flt);
        flt.connect(g);
        g.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    }

    ccMusicStep++;
  }

  function startCallingCardMusic() {
    stopCallingCardMusic();
    if (!sfxEnabled && !bgmEnabled) return;
    ensureAudio();
    ccMusicStep = 0;
    playCallingCardStep();
    ccMusicTimer = setInterval(playCallingCardStep, 118); // ~127 BPM tense heist pulse
  }

  function stopCallingCardMusic() {
    if (ccMusicTimer) {
      clearInterval(ccMusicTimer);
      ccMusicTimer = null;
    }
  }

  // Upbeat 122 BPM Jazztronik-style Nu-Jazz House Groove (morphs into Tokyo Shamisen Jazz in JP mode!)
  const JP_SHAMISEN_RIFF = [
    587.33, 0, 622.25, 0,  783.99, 0, 880.00, 783.99,
    0, 622.25, 587.33, 0,  466.16, 0, 587.33, 0
  ];
  const NUJAZZ_CHORDS = [
    [293.66, 349.23, 440.00, 523.25, 659.25], // Dm9
    [392.00, 493.88, 587.33, 659.25, 783.99], // G13
    [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
    [220.00, 261.63, 329.63, 392.00, 493.88]  // Am9
  ];
  const FUNK_BASS = [
    146.83, 0, 293.66, 146.83,  0, 174.61, 196.00, 0,
    196.00, 0, 392.00, 174.61,  164.81, 0, 146.83, 130.81,
    130.81, 0, 261.63, 130.81,  0, 146.83, 164.81, 0,
    110.00, 0, 220.00, 130.81,  146.83, 0, 164.81, 130.81
  ];

  function playNuJazzStep() {
    if (!bgmEnabled) return;
    // Duck/pause main BGM automatically while Calling Card or All-Out Attack theme is playing
    if (ccMusicTimer || (alloutOverlay && alloutOverlay.classList.contains('active'))) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const s32 = bgmStep % 32;
    const s16 = bgmStep % 16;

    // In Secret Japanese Mode, weave plucked Hirajoshi Shamisen melody over the Nu-Jazz groove!
    if (currentLang === 'jp') {
      const sf = JP_SHAMISEN_RIFF[s16];
      if (sf > 0) playShamisenPluck(ctx, sf, t, 0.042);
    }

    // Four-on-the-floor punchy house kick (steps 0, 4, 8, 12)
    if (s16 % 4 === 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(128, t);
      osc.frequency.exponentialRampToValueAtTime(42, t + 0.09);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.13);
    }

    // Syncopated electric piano Jazztronik stabs
    if (s16 === 0 || s16 === 3 || s16 === 6 || s16 === 10 || s16 === 14) {
      const chordIdx = Math.floor(s32 / 8) % NUJAZZ_CHORDS.length;
      const chord = NUJAZZ_CHORDS[chordIdx];
      const dur = (s16 === 0 || s16 === 10) ? 0.34 : 0.16;
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1900, t);
        gain.gain.setValueAtTime(0.011, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.02);
      });
    }

    // Octave funky bassline
    const bassFreq = FUNK_BASS[s32];
    if (bassFreq > 0) {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(bassFreq, t);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(520, t);
      filter.frequency.exponentialRampToValueAtTime(190, t + 0.14);
      gain.gain.setValueAtTime(0.048, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    }

    // Crispy offbeat house hi-hat + snare/clap on 4 & 12
    if (s16 % 4 === 2 || s16 % 4 === 0) {
      const isOffbeat = s16 % 4 === 2;
      const len = isOffbeat ? 0.055 : 0.02;
      const bufferSize = Math.floor(ctx.sampleRate * len);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(isOffbeat ? 7200 : 8800, t);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isOffbeat ? 0.022 : 0.008, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len);
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
      playNuJazzStep();
      bgmTimer = setInterval(playNuJazzStep, 123); // ~122 BPM Nu-Jazz House
    }
  }

  if (bgmToggle) bgmToggle.addEventListener('click', () => setBgm(!bgmEnabled));

  if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxToggle.setAttribute('aria-pressed', String(sfxEnabled));
      sfxLabel.textContent = sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
      if (sfxEnabled) playHoverTick();
    });
  }

  // ---------------------------------------------------------
  // 5. Animated Dialogue Box
  // ---------------------------------------------------------
  let currentViewKey = 'profile';
  let dialogueIdx = 0;
  let typeTimer = null;
  let isTyping = false;
  let fullLine = '';

  function startDialogue(viewKey, lineIndex = 0) {
    currentViewKey = viewKey;
    const lines = (I18N[currentLang].dialogues[viewKey]) || I18N.en.dialogues.profile;
    dialogueIdx = lineIndex % lines.length;
    fullLine = lines[dialogueIdx];
    if (typeTimer) clearInterval(typeTimer);
    if (!dialogueTextEl) return;

    dialogueTextEl.textContent = '';
    isTyping = true;
    let i = 0;
    typeTimer = setInterval(() => {
      dialogueTextEl.textContent += fullLine.charAt(i);
      if (i % 4 === 0 && fullLine.charAt(i) !== ' ') playTypeTick();
      i++;
      if (i >= fullLine.length) {
        clearInterval(typeTimer);
        isTyping = false;
      }
    }, 18);
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
  // 6. SECRET PERSONA 5 EASTER EGGS!
  //    - All-Out Attack: Click Jockey Emblem 3x OR Shift+A OR type "take"
  //    - Calling Card:   Click Date HUD 3x OR Shift+C
  //    - Secret Japanese: Click "路線" stamp OR Hanko BM 3x OR press J
  // ---------------------------------------------------------
  let emblemClicks = 0, emblemTimer = null;
  let dateClicks = 0, dateTimer = null;
  let hankoClicks = 0, hankoTimer = null;
  let allOutTimeout = null;
  let secretBuffer = '';

  function flashAllOut() {
    if (!alloutOverlay) return;
    alloutOverlay.classList.remove('flash-hit');
    void alloutOverlay.offsetWidth;
    alloutOverlay.classList.add('flash-hit');
  }

  function triggerAllOutAttack() {
    if (!alloutOverlay) return;
    stopCallingCardMusic();
    stopAllOutMusic();
    if (allOutTimeout) clearTimeout(allOutTimeout);

    // Duck/pause background BGM cleanly so the Battle Groove owns the speakers!
    if (bgmEnabled && bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
      aoaPausedNormalBgm = true;
    }

    // PHASE 1 (0ms - 760ms): Iconic Eye-Level Diagonal Cut-In Banner
    alloutOverlay.classList.remove('phase-cutin', 'phase-brawl', 'phase-finisher', 'flash-hit');
    alloutOverlay.classList.add('active', 'phase-cutin');
    alloutOverlay.setAttribute('aria-hidden', 'false');
    flashAllOut();

    playVinylScratch();
    aoaTimers.push(setTimeout(playCutinShing, 90));
    aoaTimers.push(setTimeout(startAllOutBattleGroove, 180));

    // PHASE 2 (760ms - 2360ms): Comic Dust Cloud Brawl + 7 Synced Punch/Slash Impacts
    aoaTimers.push(setTimeout(() => {
      if (!alloutOverlay.classList.contains('active')) return;
      alloutOverlay.classList.remove('phase-cutin');
      alloutOverlay.classList.add('phase-brawl');
      flashAllOut();
    }, 760));

    [800, 1000, 1200, 1410, 1630, 1870, 2110].forEach((ms, idx) => {
      aoaTimers.push(setTimeout(() => {
        if (!alloutOverlay.classList.contains('active')) return;
        playBrawlImpact(idx);
      }, ms));
    });

    // PHASE 3 (2360ms - 6800ms): Violent Glass Shatter -> Crimson Finisher Splash Screen!
    aoaTimers.push(setTimeout(() => {
      if (!alloutOverlay.classList.contains('active')) return;
      alloutOverlay.classList.remove('phase-brawl');
      alloutOverlay.classList.add('phase-finisher');
      flashAllOut();
      playAllOutHit();
    }, 2360));

    allOutTimeout = setTimeout(closeAllOutAttack, 6800);
  }

  function closeAllOutAttack() {
    if (!alloutOverlay) return;
    if (allOutTimeout) {
      clearTimeout(allOutTimeout);
      allOutTimeout = null;
    }
    stopAllOutMusic();
    alloutOverlay.classList.remove('active', 'phase-cutin', 'phase-brawl', 'phase-finisher', 'flash-hit');
    alloutOverlay.setAttribute('aria-hidden', 'true');
  }

  if (alloutOverlay) alloutOverlay.addEventListener('click', closeAllOutAttack);

  function openCallingCard() {
    if (!callingCardOverlay) return;
    playSelectSnap();
    callingCardOverlay.classList.add('active');
    callingCardOverlay.setAttribute('aria-hidden', 'false');
    startCallingCardMusic();
  }

  function closeCallingCard() {
    if (!callingCardOverlay) return;
    stopCallingCardMusic();
    playBackCancel();
    callingCardOverlay.classList.remove('active');
    callingCardOverlay.setAttribute('aria-hidden', 'true');
  }

  if (ccCloseBtn) ccCloseBtn.addEventListener('click', closeCallingCard);
  if (ccBackdrop) ccBackdrop.addEventListener('click', closeCallingCard);

  function triggerJapaneseMode() {
    const target = currentLang === 'jp' ? 'en' : 'jp';
    if (target === 'jp') {
      playJapaneseRevealTheme();
    } else {
      playBackCancel();
    }
    triggerWipe(target === 'jp' ? '日本語モード' : 'ENGLISH MODE', 'SECRET LANGUAGE // 秘密', true, () => {
      applyLanguage(target);
    });
  }

  if (dialogueEmblemBtn) {
    dialogueEmblemBtn.addEventListener('click', () => {
      playHoverTick();
      emblemClicks++;
      clearTimeout(emblemTimer);
      emblemTimer = setTimeout(() => { emblemClicks = 0; }, 1200);
      if (emblemClicks >= 3) {
        emblemClicks = 0;
        triggerAllOutAttack();
      }
    });
  }

  if (hudDateBox) {
    hudDateBox.addEventListener('click', (e) => {
      if (e.target === hankoSeal) return;
      dateClicks++;
      clearTimeout(dateTimer);
      dateTimer = setTimeout(() => { dateClicks = 0; }, 1200);
      if (dateClicks >= 3) {
        dateClicks = 0;
        openCallingCard();
      }
    });
  }

  if (hankoSeal) {
    hankoSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      hankoClicks++;
      clearTimeout(hankoTimer);
      hankoTimer = setTimeout(() => { hankoClicks = 0; }, 1200);
      if (hankoClicks >= 3) {
        hankoClicks = 0;
        triggerJapaneseMode();
      }
    });
  }

  if (jpSecretBtn) {
    jpSecretBtn.addEventListener('click', triggerJapaneseMode);
  }

  // ---------------------------------------------------------
  // 7. Smooth Spring-Damped Mouse 3D Camera Parallax
  // ---------------------------------------------------------
  let targetMX = 0, targetMY = 0;
  let currMX = 0, currMY = 0;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetMY = nx * 4.5;
    targetMX = -ny * 2.8;
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
  // 8. Paper-Crumple & Cut-In Transition Engine (~900ms)
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

    setTimeout(() => { onMidpoint(); }, 390);
    setTimeout(() => {
      wipeEl.classList.remove('active', 'with-cutin');
      isTransitioning = false;
    }, 930);
  }

  function enterStation(initialView) {
    if (!body.classList.contains('mode-title')) return;
    playSelectSnap();
    const label = currentLang === 'jp' ? '乗車中' : (currentLang === 'es' ? 'INGRESANDO' : 'BOARDING');
    triggerWipe(label, 'SANTIAGO EXPRESS // LINE 03', true, () => {
      body.classList.remove('mode-title');
      if (appShell) appShell.setAttribute('aria-hidden', 'false');
      switchView(initialView || 'profile', true);
    });
  }

  function returnToTitle() {
    if (body.classList.contains('mode-title')) return;
    playBackCancel();
    const label = currentLang === 'jp' ? 'タイトル' : (currentLang === 'es' ? 'INICIO' : 'TITLE SCREEN');
    triggerWipe(label, I18N[currentLang].locs.profile, false, () => {
      body.classList.add('mode-title');
      body.setAttribute('data-scene', 'station');
      if (hudLoc) hudLoc.textContent = I18N[currentLang].locs.profile;
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
    const dict = I18N[currentLang];
    const scene = item.dataset.scene || 'station';
    const loc = dict.locs[viewName] || dict.locs.profile;
    const sub = dict.subs[viewName] || 'NEXT STATION';
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
        targetMY = item.dataset.scene === 'interior' ? Math.min(targetMY + 2.0, 6) : Math.max(targetMY - 2.0, -6);
      }
    });
    item.addEventListener('click', () => switchView(item.dataset.view, false));
  });

  document.querySelectorAll('[data-jump]').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.jump, false));
  });

  // ---------------------------------------------------------
  // 9. Custom In-Page PDF Viewer Modal
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
    playBackCancel();
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
  // 10. Keyboard Controls + Easter Egg Hotkeys + Copy Email
  // ---------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (pdfModal && pdfModal.classList.contains('open')) {
      if (e.key === 'Escape') closePdfModal();
      return;
    }
    if (callingCardOverlay && callingCardOverlay.classList.contains('active')) {
      if (e.key === 'Escape') closeCallingCard();
      return;
    }
    if (alloutOverlay && alloutOverlay.classList.contains('active')) {
      closeAllOutAttack();
      return;
    }

    // Secret word buffer ("take" -> All-Out Attack!)
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      secretBuffer = (secretBuffer + e.key.toLowerCase()).slice(-8);
      if (secretBuffer.endsWith('take')) {
        secretBuffer = '';
        triggerAllOutAttack();
        return;
      }
    }

    // Direct Easter Egg shortcuts
    if (e.shiftKey && (e.key === 'A' || e.key === 'a')) { e.preventDefault(); triggerAllOutAttack(); return; }
    if (e.shiftKey && (e.key === 'C' || e.key === 'c')) { e.preventDefault(); openCallingCard(); return; }
    if (!e.shiftKey && (e.key === 'j' || e.key === 'J')) { triggerJapaneseMode(); return; }

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
      const txtEl = copyBtn.querySelector('.reply-txt') || copyBtn;
      playSelectSnap();
      try {
        await navigator.clipboard.writeText(email);
        txtEl.textContent = I18N[currentLang].btn_copied;
        setTimeout(() => { txtEl.textContent = I18N[currentLang].btn_copy_email; }, 1800);
      } catch {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // ---------------------------------------------------------
  // 1B. Interactive Projects Compendium Deck
  // ---------------------------------------------------------
  let activeProjectIdx = 0;
  const deckTabs = Array.from(document.querySelectorAll('.deck-tab'));
  const compendiumPlate = document.getElementById('compendiumPlate');

  function renderCompendiumPlate(idx) {
    if (!compendiumPlate) return;
    const list = (I18N[currentLang] && I18N[currentLang].deck) || I18N.en.deck;
    const item = list[idx] || list[0];
    activeProjectIdx = idx;
    deckTabs.forEach((t, i) => t.classList.toggle('active', i === idx));
    compendiumPlate.innerHTML = `
      <div>
        <span class="plate-role mono">${item.role}</span>
        <h3>${item.title}</h3>
      </div>
      <p>${item.copy}</p>
      <div class="deck-chips">${item.chips.map((c) => `<span class="deck-chip">${c}</span>`).join('')}</div>
      ${item.link ? `<div><a class="skin-btn skin-btn-red" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.linkLabel}</a></div>` : ''}
    `;
  }

  deckTabs.forEach((tab) => {
    tab.addEventListener('mouseenter', playHoverTick);
    tab.addEventListener('click', () => {
      playSelectSnap();
      renderCompendiumPlate(Number(tab.dataset.proj));
    });
  });

  // Render default Calling Card ransom letters & Compendium Deck on init
  renderCallingCard('en');
  renderCompendiumPlate(0);

  // Deep-link hash support (also supports #jp, #allout, #callingcard for instant QA!)
  if (hashView === 'jp') {
    body.classList.remove('mode-title');
    if (appShell) appShell.setAttribute('aria-hidden', 'false');
    applyLanguage('jp');
    switchView('profile', true);
  } else if (hashView === 'allout' || hashView === 'allout-p1' || hashView === 'allout-p2') {
    body.classList.remove('mode-title');
    if (appShell) appShell.setAttribute('aria-hidden', 'false');
    switchView('profile', true);
    const phaseClass = hashView === 'allout-p1' ? 'phase-cutin' : (hashView === 'allout-p2' ? 'phase-brawl' : 'phase-finisher');
    alloutOverlay.classList.add('active', phaseClass);
    alloutOverlay.setAttribute('aria-hidden', 'false');
  } else if (hashView === 'callingcard') {
    body.classList.remove('mode-title');
    if (appShell) appShell.setAttribute('aria-hidden', 'false');
    switchView('profile', true);
    callingCardOverlay.classList.add('active');
  } else if (hashView && menuItems.some((m) => m.dataset.view === hashView)) {
    body.classList.remove('mode-title');
    if (appShell) appShell.setAttribute('aria-hidden', 'false');
    switchView(hashView, true);
  }
})();
