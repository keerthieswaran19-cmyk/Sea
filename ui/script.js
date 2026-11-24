/**
 * AURA ENGLISH ATELIER — A-Z ALPHABET RAIN ENGINE
 * Big chunky 3D clay letters, all 26 (A-Z) cycling continuously
 * Ocean Blue palette, drag & toss physics, liquid splash
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const canvas = document.getElementById('alphabetCanvas');
  const stage = document.getElementById('visualStage');
  const magneticBtn = document.querySelector('.btn-magnetic-luxury');

  const modal = document.getElementById('diagnosticDialog');
  const navTrigger = document.getElementById('navModalTrigger');
  const heroTrigger = document.getElementById('heroModalTrigger');
  const closeBtn = document.getElementById('closeDialogBtn');
  const form = document.getElementById('diagnosticForm');
  const toast = document.getElementById('statusToast');

  // --- 1. Magnetic Button Pull ---
  if (magneticBtn && window.innerWidth > 992) {
    magneticBtn.addEventListener('mousemove', (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magneticBtn.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
    });

    magneticBtn.addEventListener('mouseleave', () => {
      magneticBtn.style.transform = 'translate(0px, 0px)';
    });
  }

  // --- 2. Modal Handlers ---
  function openModal() {
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  }

  function closeModal() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  if (navTrigger) navTrigger.addEventListener('click', openModal);
  if (heroTrigger) heroTrigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const inDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inDialog) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    form.reset();

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  });

  // --- 2.1 Dynamic Carousel Content Controller ---
  const carouselContent = [
    {
      badge: '01',
      title: 'Spoken Fluency',
      text: 'Boutique, personalized English language training in Pallavaram, Chennai. We transform hesitant speakers into articulate communicators, instilling effortless cadence, spontaneous conversational flow, and stage poise in a warm, supportive environment.'
    },
    {
      badge: '02',
      title: 'Applied Grammar',
      text: 'Master intuitive, real-world English grammar without rote memorization. Students naturally internalize structured syntax, sophisticated vocabulary, and seamless sentence construction through active spoken dialogue.'
    },
    {
      badge: '03',
      title: 'Natural Pronunciation',
      text: 'Neutralize mother-tongue influence and cultivate crisp, clear English diction. Guided by senior phonetics trainers, children master precise articulation, vowel length, and natural syllable stress with complete phonetic clarity.'
    }
  ];

  const carouselPara = document.getElementById('carouselPara');
  const carouselTabs = document.querySelectorAll('#carouselTabs .ticker-item');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let carouselTimer = null;

  function setSlide(index) {
    if (index === currentSlide) return;
    currentSlide = index;

    // Update active tab styling
    carouselTabs.forEach((tab, i) => {
      if (i === currentSlide) {
        tab.classList.add('active-glow');
      } else {
        tab.classList.remove('active-glow');
      }
    });

    // Update dot indicator
    carouselDots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Smooth fade transition of text
    if (carouselPara) {
      carouselPara.classList.add('fading');
      setTimeout(() => {
        carouselPara.textContent = carouselContent[currentSlide].text;
        carouselPara.classList.remove('fading');
      }, 350);
    }
  }

  function startCarouselTimer() {
    stopCarouselTimer();
    carouselTimer = setInterval(() => {
      const next = (currentSlide + 1) % carouselContent.length;
      setSlide(next);
    }, 5500);
  }

  function stopCarouselTimer() {
    if (carouselTimer) clearInterval(carouselTimer);
  }

  carouselTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      setSlide(idx);
      if (carouselPara) {
    startCarouselTimer();
  }
    });
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      setSlide(idx);
      if (carouselPara) {
    startCarouselTimer();
  }
    });
  });

  if (carouselPara) {
    startCarouselTimer();
  }

  // --- 2.2 Boutique Courses Syllabus Dossier Modal Controller ---
  const coursesData = {
    ripples: {
      age: 'AGES 8 – 10 / 8+',
      title: 'Little Ripples',
      tagline: 'Warm, playful, and instantly attractive foundational fluency',
      duration: '12 Weeks • 24 Studio Hours',
      focusKey: 'junior',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 3',
          title: 'Joyful Vocal Exploration & Sound Play',
          desc: 'Overcoming initial shyness through interactive rhythm games, vocal tongue-twisters, and lively peer storytelling.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 4 – 6',
          title: 'Everyday Dialogue & Expressive Words',
          desc: 'Building vibrant everyday vocabulary and natural sentence building through playful classroom simulations.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 7 – 9',
          title: 'Interactive Show & Tell Sessions',
          desc: 'Holding the microphone, describing favorite books, characters, and hobbies with smiling confidence.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 10 – 12',
          title: 'Little Orators Studio Showcase',
          desc: 'Celebrating growth with an intimate stage recital in front of parents and cohort friends.'
        }
      ],
      outcomes: [
        'Zero Fear of Speaking in Groups',
        'Warm, Expressive Pronunciation',
        'Intuitive Sentence Flow',
        'Day-One Confidence & Smiles'
      ]
    },
    character_quest: {
      age: 'AGES 10 – 12',
      title: 'Character Quest',
      tagline: 'An engaging, gamified fluency adventure',
      duration: '12 Weeks • 24 Studio Hours',
      focusKey: 'scholar',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 3',
          title: 'Roleplay Worlds & Narrative Sparks',
          desc: 'Stepping into exciting characters, detectives, and explorers to practice dynamic dialogue and quick thinking.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 4 – 6',
          title: 'Verbal Quests & Collaborative Debates',
          desc: 'Solving mystery challenges and defending team ideas with structured, clear English sentences.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 7 – 9',
          title: 'Emotional Range & Vocal Modulation',
          desc: 'Mastering pauses, expressive pitch, and body language to captivate any audience.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 10 – 12',
          title: 'The Grand Quest Presentation',
          desc: 'A live cohort presentation showcasing imaginative storytelling and poised public speaking.'
        }
      ],
      outcomes: [
        'Quick-Thinking Impromptu Fluency',
        'Rich Descriptive Vocabulary',
        'Expressive Tone & Modulation',
        'Leadership & Team Discourse Poise'
      ]
    },
    stage_voice: {
      age: 'SCHOOL STUDENTS / TEENS',
      title: 'Stage & Voice',
      tagline: 'Modern, bold, and tells teens and parents the exact skill they will master',
      duration: '12 Weeks • 24 Studio Hours',
      focusKey: 'scholar',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 3',
          title: 'Vocal Projection & Diction Calibration',
          desc: 'Breathing mechanics, eliminating nervous tremors, and projecting voice clearly across any auditorium.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 4 – 6',
          title: 'Speech Structure & Rhetorical Hooks',
          desc: 'Crafting persuasive speeches, TED-style introductions, and memorable conclusions that stick.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 7 – 9',
          title: 'Extempore Drills & Stage Movement',
          desc: 'Mastering impromptu topics on the spot with commanding posture, eye contact, and stage poise.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 10 – 12',
          title: 'Keynote Showcase & Audio Portfolio',
          desc: 'Delivering a signature keynote with studio microphone critique and verified speaker audit.'
        }
      ],
      outcomes: [
        'Fearless Auditorium Stage Presence',
        'Crisp Diction & Resonant Vocal Delivery',
        'Impromptu Speaking Without Hesitation',
        'Standout Inter-School Competition Poise'
      ]
    },
    global_currents: {
      age: 'ADULTS & PROFESSIONALS',
      title: 'Global Currents',
      tagline: 'Sleek, aspirational international accent and executive communication',
      duration: '10 Weeks • 20 Studio Hours',
      focusKey: 'executive',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 2',
          title: 'Global Acoustic Cadence & Rhythm',
          desc: 'Neutralizing local acoustic barriers, mastering international English rhythm, linking, and natural stress patterns.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 3 – 5',
          title: 'Executive Phrasing & Diplomatic Tact',
          desc: 'High-level business idiom, boardroom negotiation nuances, assertive brevity, and diplomatic tact.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 6 – 8',
          title: 'Global Presentations & Demo Poise',
          desc: 'Leading cross-border client calls, product walk-throughs, and handling spontaneous Q&A effortlessly.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 9 – 10',
          title: 'Executive Sound Signature Audit',
          desc: 'Final acoustic diagnostic portfolio recording and bespoke global communication roadmap.'
        }
      ],
      outcomes: [
        'Polished International Sound Signature',
        'Effortless Cross-Border Business Fluency',
        'Executive Boardroom Authority',
        'Diplomatic Persuasion Under Pressure'
      ]
    }
  };

  const dossierDialog = document.getElementById('dossierDialog');
  const closeDossierBtn = document.getElementById('closeDossierBtn');
  const dossierEnrollBtn = document.getElementById('dossierEnrollBtn');
  const dossierAge = document.getElementById('dossierAge');
  const dossierTitle = document.getElementById('dossierTitle');
  const dossierTagline = document.getElementById('dossierTagline');
  const dossierDuration = document.getElementById('dossierDuration');
  const dossierPhases = document.getElementById('dossierPhases');
  const dossierOutcomes = document.getElementById('dossierOutcomes');

  let activeDossierCourse = 'junior';

  function openDossier(courseKey) {
    const data = coursesData[courseKey] || coursesData.junior;
    activeDossierCourse = courseKey;

    if (dossierAge) dossierAge.textContent = data.age;
    if (dossierTitle) dossierTitle.textContent = data.title;
    if (dossierTagline) dossierTagline.textContent = data.tagline;
    if (dossierDuration) dossierDuration.textContent = data.duration;

    // Render Phases
    if (dossierPhases) {
      dossierPhases.innerHTML = data.phases.map(p => `
        <div class="phase-card">
          <div class="phase-header">
            <span class="phase-badge">${p.num}</span>
            <span class="phase-weeks">${p.weeks}</span>
          </div>
          <div class="phase-title">${p.title}</div>
          <p class="phase-desc">${p.desc}</p>
        </div>
      `).join('');
    }

    // Render Outcomes
    if (dossierOutcomes) {
      dossierOutcomes.innerHTML = data.outcomes.map(o => `
        <div class="outcome-pill">
          <span class="outcome-dot"></span>
          <span>${o}</span>
        </div>
      `).join('');
    }

    if (dossierDialog) {
      document.body.style.overflow = 'hidden'; // Lock background body scroll completely
      if (typeof dossierDialog.showModal === 'function') {
        dossierDialog.showModal();
      } else {
        dossierDialog.setAttribute('open', '');
      }
    }
  }

  function closeDossier() {
    document.body.style.overflow = ''; // Restore background scroll cleanly
    if (!dossierDialog) return;
    if (typeof dossierDialog.close === 'function') {
      dossierDialog.close();
    } else {
      dossierDialog.removeAttribute('open');
    }
  }

  if (closeDossierBtn) closeDossierBtn.addEventListener('click', closeDossier);

  if (dossierDialog) {
    dossierDialog.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });

    dossierDialog.addEventListener('click', (e) => {
      const rect = dossierDialog.getBoundingClientRect();
      const inDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inDialog) closeDossier();
    });
  }

  // Connect Dossier "Reserve Cohort Seat" directly to Diagnostic Modal with course pre-selected
  if (dossierEnrollBtn) {
    dossierEnrollBtn.addEventListener('click', () => {
      closeDossier();
      const targetSelect = document.getElementById('focusTarget');
      if (targetSelect && coursesData[activeDossierCourse]) {
        targetSelect.value = coursesData[activeDossierCourse].focusKey || 'all';
      }
      openModal();
    });
  }

  // Bind Open Dossier triggers to all course cards and "View Course" buttons
  document.querySelectorAll('.btn-view-course, .btn-open-dossier, .btn-card-learn-more').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const courseKey = btn.getAttribute('data-course');
      openDossier(courseKey);
    });
  });

  document.querySelectorAll('.course-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const courseKey = card.getAttribute('data-course');
      openDossier(courseKey);
    });
    
    // Keyboard accessibility: Enter or Space opens dossier
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const courseKey = card.getAttribute('data-course');
        openDossier(courseKey);
      }
    });
  });

  // Category Switcher Tabs Controller (Inspired by Reference 1)
  const filterTabs = document.querySelectorAll('.filter-tab');
  const courseCards = document.querySelectorAll('.course-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      courseCards.forEach((card) => {
        const course = card.getAttribute('data-course');
        if (filter === 'all' || course === filter) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            if (tab.getAttribute('data-filter') !== 'all' && card.getAttribute('data-course') !== tab.getAttribute('data-filter')) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });

  // --- 3. Real Ocean Sea Waves & 3D Alphabet Splash Engine ---
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const viewportCanvas = document.getElementById('viewportCanvas') || document.querySelector('.viewport-canvas');
  let width, height;

  function resizeCanvas() {
    const rect = viewportCanvas ? viewportCanvas.getBoundingClientRect() : (stage ? stage.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight });
    const dpr = window.devicePixelRatio || 1;
    width = canvas.width = rect.width * dpr;
    height = canvas.height = rect.height * dpr;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // 4 Colors matching reference design — Vibrant Purple, Royal Blue, Cyan, Lavender
  const oceanPalette = [
    { front: '#8B5CF6', depth: '#6D28D9', highlight: '#DDD6FE' },
    { front: '#3B82F6', depth: '#1D4ED8', highlight: '#BFDBFE' },
    { front: '#22D3EE', depth: '#0891B2', highlight: '#CFFAFE' },
    { front: '#A78BFA', depth: '#7C3AED', highlight: '#EDE9FE' },
  ];

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const MAX_ON_SCREEN = 6;
  const SPAWN_INTERVAL_MS = 1450;

  // --- Real Ocean Wave Model (Multi-Harmonic Gerstner Swells) ---
  function getSeaWaveHeight(x, time, layer = 'front') {
    const t = time * 0.001;
    if (layer === 'back') {
      const s1 = Math.sin(x * 0.003 + t * 1.2) * 16;
      const s2 = Math.sin(x * 0.007 - t * 0.9) * 8;
      return s1 + s2;
    } else if (layer === 'mid') {
      const s1 = (Math.pow((Math.sin(x * 0.004 + t * 1.5 + 1.1) + 1) * 0.5, 1.6) * 2 - 1) * 20;
      const s2 = Math.sin(x * 0.009 - t * 1.1 + 0.6) * 10;
      const s3 = Math.cos(x * 0.016 + t * 1.8) * 5;
      return s1 + s2 + s3;
    } else {
      // Front prominent swell (Gerstner-style trochoidal peaks with sharp crests)
      const s1 = (Math.pow((Math.sin(x * 0.0045 + t * 1.9 + 2.1) + 1) * 0.5, 1.8) * 2 - 1) * 24;
      const s2 = Math.sin(x * 0.011 - t * 1.5 + 1.5) * 11;
      const s3 = Math.cos(x * 0.022 + t * 2.4) * 6;
      const s4 = Math.sin(x * 0.042 - t * 3.1) * 3;
      return s1 + s2 + s3 + s4;
    }
  }

  // --- Draw Real Ocean Sea Waves (With Crest Whitecaps & Foam Shimmer) ---
  function drawRealisticOceanWaves(ctx, width, height, time, layer) {
    const dpr = window.devicePixelRatio || 1;
    // Lowered base (~15% coverage) + Right side dipped lower to clear text & buttons
    const baseY = height * 0.85;
    const step = 8 * dpr;

    if (layer === 'back') {
      // 1. Back Swell (Distant Soft Ocean Layer)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width + step; x += step) {
        const rightDip = (x / width) * 45 * dpr;
        const y = baseY + rightDip - 18 * dpr + getSeaWaveHeight(x, time, 'back') * dpr * 0.75;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const backGrad = ctx.createLinearGradient(0, baseY - 50 * dpr, 0, height);
      backGrad.addColorStop(0, 'rgba(224, 247, 250, 0.7)');
      backGrad.addColorStop(0.35, 'rgba(186, 230, 253, 0.55)');
      backGrad.addColorStop(1, 'rgba(125, 211, 252, 0.45)');
      ctx.fillStyle = backGrad;
      ctx.fill();
      ctx.restore();
    } else if (layer === 'front') {
      // 2. Mid Swell Layer (Translucent Turquoise Lagoon)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width + step; x += step) {
        const rightDip = (x / width) * 50 * dpr;
        const y = baseY + rightDip - 8 * dpr + getSeaWaveHeight(x, time, 'mid') * dpr * 0.75;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const midGrad = ctx.createLinearGradient(0, baseY - 35 * dpr, 0, height);
      midGrad.addColorStop(0, 'rgba(34, 211, 238, 0.38)');
      midGrad.addColorStop(0.4, 'rgba(0, 157, 196, 0.45)');
      midGrad.addColorStop(1, 'rgba(8, 145, 178, 0.55)');
      ctx.fillStyle = midGrad;
      ctx.fill();

      // 3. Front Active Swell Layer (The Main Sea Wave with Crest Foam Whitecaps)
      const frontPoints = [];
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width + step; x += step) {
        const rightDip = (x / width) * 55 * dpr;
        const y = baseY + rightDip + getSeaWaveHeight(x, time, 'front') * dpr * 0.75;
        frontPoints.push({ x, y });
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const frontGrad = ctx.createLinearGradient(0, baseY - 25 * dpr, 0, height);
      frontGrad.addColorStop(0, 'rgba(34, 211, 238, 0.55)');
      frontGrad.addColorStop(0.3, 'rgba(0, 157, 196, 0.65)');
      frontGrad.addColorStop(0.7, 'rgba(0, 138, 175, 0.78)');
      frontGrad.addColorStop(1, 'rgba(1, 102, 130, 0.88)');
      ctx.fillStyle = frontGrad;
      ctx.fill();

      // 4. Whitecap Seafoam & Specular Highlights (Matching Reference Photo)
      for (let i = 0; i < frontPoints.length - 1; i++) {
        const pt = frontPoints[i];
        const nextPt = frontPoints[i + 1];
        const waveAmp = (baseY - pt.y) / dpr;

        // On wave crests (high peaks):
        if (waveAmp > 7) {
          const foamAlpha = Math.min(0.95, (waveAmp - 7) / 12);

          // White seafoam cap along crest
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(nextPt.x, nextPt.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${foamAlpha * 0.94})`;
          ctx.lineWidth = (3.5 + (waveAmp - 7) * 0.35) * dpr;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Delicate sparkling spray foam glints on highest peaks
          if (waveAmp > 14 && (i % 3 === 0)) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y - 1.5 * dpr, 2.5 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${foamAlpha})`;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 8 * dpr;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 5. Multi-depth Caustic Rays & Water Texture across 35% depth
      ctx.beginPath();
      for (let cx = 15 * dpr; cx < width; cx += 40 * dpr) {
        const waveY = baseY + getSeaWaveHeight(cx, time, 'front') * dpr;
        for (let depthOffset of [30, 75, 135]) {
          const cy = waveY + (depthOffset + Math.sin(cx * 0.04 + time * 0.0025 + depthOffset) * 14) * dpr;
          if (cy < height - 10 * dpr) {
            ctx.moveTo(cx - 15 * dpr, cy);
            ctx.lineTo(cx + 15 * dpr, cy + 5 * dpr);
          }
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.6 * dpr;
      ctx.stroke();

      ctx.restore();
    }
  }

  // --- Real Ocean Water Splash Droplets ---
  class OceanSplashDroplet {
    constructor(x, y, vx, vy, color, size) {
      const dpr = window.devicePixelRatio || 1;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.gravity = 0.38 * dpr;
      this.radius = (size || (Math.random() * 4 + 2)) * dpr;
      this.alpha = 1;
      this.color = color || '#ffffff';
      this.decay = Math.random() * 0.02 + 0.025;
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  // --- Water Impact Concentric Rings ---
  class OceanWaveRipple {
    constructor(x, y, intensity) {
      const dpr = window.devicePixelRatio || 1;
      this.x = x;
      this.y = y;
      this.rX = (6 + intensity * 4) * dpr;
      this.rY = (2.5 + intensity * 1.5) * dpr;
      this.alpha = 0.85;
      this.speed = (2.2 + intensity * 1.2) * dpr;
      this.lineWidth = (2.5 + intensity * 0.5) * dpr;
    }

    update() {
      this.rX += this.speed;
      this.rY += this.speed * 0.32;
      this.alpha -= 0.022;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.rX, this.rY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = this.lineWidth;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();
    }
  }

  const splashes = [];
  const ripples = [];

  function triggerWaterSplash(x, y, speed, letterColor) {
    const dpr = window.devicePixelRatio || 1;
    const intensity = Math.min(3.2, Math.max(1, speed / (2.5 * dpr)));
    const count = Math.floor(22 * intensity);

    const colors = [
      '#ffffff',
      'rgba(255, 255, 255, 0.95)',
      'rgba(224, 247, 250, 0.9)',
      'rgba(34, 211, 238, 0.85)',
      letterColor || 'rgba(0, 157, 196, 0.8)'
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 6) + Math.random() * (2 * Math.PI / 3);
      const vel = (Math.random() * 8 + 4) * intensity * dpr;
      const vx = Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1) * (vel * 0.7);
      const vy = -Math.sin(angle) * vel;
      const col = colors[Math.floor(Math.random() * colors.length)];
      splashes.push(new OceanSplashDroplet(
        x + (Math.random() - 0.5) * 35 * dpr,
        y - 4 * dpr,
        vx, vy, col, Math.random() * 3.5 + 1.8
      ));
    }

    ripples.push(new OceanWaveRipple(x, y, intensity));
    ripples.push(new OceanWaveRipple(x, y, intensity * 0.65));
  }

  // --- Ambient Floating Ocean Micro-Bubbles ---
  class AmbientBubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const dpr = window.devicePixelRatio || 1;
      this.x = Math.random() * (width || 800);
      this.y = initial ? Math.random() * (height || 600) : (height || 600) + 15 * dpr;
      this.radius = (Math.random() * 3 + 1.8) * dpr;
      this.speed = (Math.random() * 0.45 + 0.25) * dpr;
      this.driftPhase = Math.random() * Math.PI * 2;
      this.driftSpeed = Math.random() * 0.02 + 0.01;
      this.driftAmp = (Math.random() * 1.5 + 0.8) * dpr;
      this.alpha = Math.random() * 0.35 + 0.15;
      this.color = Math.random() > 0.4 ? 'rgba(0, 157, 196, ' : 'rgba(34, 211, 238, ';
    }

    update() {
      this.driftPhase += this.driftSpeed;
      this.x += Math.sin(this.driftPhase) * this.driftAmp * 0.35;
      this.y -= this.speed;

      if (this.y < -20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();

      // Soft reflection glint
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 1.2})`;
      ctx.fill();
      ctx.restore();
    }
  }

  const ambientBubbles = [];
  for (let b = 0; b < 28; b++) {
    ambientBubbles.push(new AmbientBubble());
  }

  // --- 3D Clay Alphabet with Real Ocean Buoyancy ---
  class ClayAlphabet {
    constructor(charData, x, y) {
      this.dpr = window.devicePixelRatio || 1;
      this.char = charData.char;
      this.frontColor = charData.front;
      this.depthColor = charData.depth;
      this.highlightColor = charData.highlight;

      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2.2 * this.dpr;
      this.vy = (Math.random() * 1.2 + 0.8) * this.dpr;

      this.gravity = 0.22 * this.dpr;
      this.bounce = 0.55;
      this.friction = 0.988;

      this.fontSize = (Math.random() * 18 + 66) * this.dpr;
      this.extrusion = 14 * this.dpr;
      this.radius = this.fontSize * 0.42;

      this.rotation = (Math.random() - 0.5) * 0.35;
      this.rotSpeed = (Math.random() - 0.5) * 0.025;

      this.scaleX = 1;
      this.scaleY = 1;
      this.isDragging = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
      this.idlePhase = Math.random() * Math.PI * 2;

      // Lifecycle
      this.state = 'falling';
      this.floatStartTime = 0;
      this.fadeAlpha = 1;
      this.dead = false;
      this.hasLanded = false;
      this.inWater = false;
      this.entryScale = 1.15;
    }

    update(now, allLetters) {
      this.idlePhase += 0.025;
      this.scaleX += (1 - this.scaleX) * 0.1;
      this.scaleY += (1 - this.scaleY) * 0.1;
      this.entryScale += (1 - this.entryScale) * 0.04;

      if (this.isDragging) {
        this.state = 'falling';
        this.fadeAlpha = 1;
        this.hasLanded = false;
        this.inWater = false;
        return;
      }

      // Gravity & Air physics
      this.vy += this.gravity;
      this.vx *= this.friction;
      this.vy *= 0.993;

      this.x += this.vx;
      this.y += this.vy;

      this.rotation += this.rotSpeed;
      this.rotSpeed *= 0.992;

      // Repulsion between floating letters
      if (allLetters) {
        for (let j = 0; j < allLetters.length; j++) {
          const other = allLetters[j];
          if (other === this || other.dead) continue;
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const dist = Math.hypot(dx, dy);
          const minDist = (this.radius + other.radius) * 1.15;
          if (dist < minDist && dist > 0.1) {
            const overlap = (minDist - dist) * 0.5;
            const nx = dx / dist;
            this.x += nx * overlap * 0.25;
            this.vx += nx * 0.35 * this.dpr;
            other.x -= nx * overlap * 0.25;
            other.vx -= nx * 0.35 * this.dpr;
          }
        }
      }

      // Ocean Water Surface Collision & Archimedes Buoyancy (Synchronized with realistic waves)
      const rightDip = (this.x / width) * 55 * this.dpr;
      const baseY = height * 0.85 + rightDip;
      const waterY = baseY + getSeaWaveHeight(this.x, now, 'front') * this.dpr * 0.75;
      const bottomY = this.y + this.radius * 0.45;

      if (bottomY >= waterY) {
        this.inWater = true;

        // Splash trigger on entry
        if (!this.hasLanded) {
          this.hasLanded = true;
          this.state = 'floating';
          this.floatStartTime = now;
          const impactSpeed = Math.abs(this.vy);
          if (impactSpeed > 1.2 * this.dpr) {
            triggerWaterSplash(this.x, waterY, impactSpeed, this.frontColor);
            this.scaleX = 1 + Math.min(0.35, impactSpeed * 0.035);
            this.scaleY = Math.max(0.7, 1 - Math.min(0.3, impactSpeed * 0.035));
          }
        }

        // Archimedes Buoyancy Force
        const submerged = bottomY - waterY;
        const buoyantForce = Math.min(submerged * 0.15, 2.8 * this.dpr);
        this.vy -= buoyantForce;

        // Water resistance damping
        this.vy *= 0.86;
        this.vx *= 0.94;
        this.rotSpeed *= 0.85;

        // Gentle drift with ocean current
        this.vx += 0.07 * this.dpr;

        // Micro ripples while floating
        if (Math.random() < 0.04) {
          ripples.push(new OceanWaveRipple(this.x, waterY, 0.35));
        }
      } else {
        this.inWater = false;
        if (this.hasLanded && this.vy < -1.8 * this.dpr) {
          this.hasLanded = false; // Player flung it into the air!
        }
      }

      // Left/Right Wall boundary
      const halfW = this.radius;
      if (this.x < halfW) {
        this.x = halfW;
        this.vx = Math.abs(this.vx) * 0.55;
      } else if (this.x > width - halfW) {
        this.x = width - halfW;
        this.vx = -Math.abs(this.vx) * 0.55;
      }

      // Lifecycle transitions
      if (this.state === 'floating' && (now - this.floatStartTime) > 4200) {
        this.state = 'fading';
      }

      if (this.state === 'fading') {
        this.fadeAlpha -= (16.67 / 850);
        if (this.fadeAlpha <= 0) {
          this.fadeAlpha = 0;
          this.dead = true;
        }
      }
    }

    draw() {
      if (this.dead) return;

      ctx.save();
      ctx.globalAlpha = Math.max(0, this.fadeAlpha);

      // 3D Letter
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      const sc = this.entryScale;
      ctx.scale(this.scaleX * sc, this.scaleY * sc);

      ctx.font = `900 ${this.fontSize}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 3D Extrusion layers
      const slices = 10;
      const sliceStep = this.extrusion / slices;

      for (let s = slices; s >= 1; s--) {
        const offsetX = s * sliceStep * 0.55;
        const offsetY = s * sliceStep * 0.85;
        ctx.fillStyle = this.depthColor;
        ctx.fillText(this.char, offsetX, offsetY);
      }

      // Front face
      ctx.shadowColor = 'rgba(0, 50, 80, 0.18)';
      ctx.shadowBlur = 10 * this.dpr;
      ctx.shadowOffsetY = 4 * this.dpr;
      ctx.fillStyle = this.frontColor;
      ctx.fillText(this.char, 0, 0);
      ctx.shadowBlur = 0;

      // Specular highlight — top-left white sheen
      ctx.save();
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText(this.char, -2 * this.dpr, -2.5 * this.dpr);
      ctx.restore();

      // Extra glossy reflection strip
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#ffffff';
      const reflectY = -this.fontSize * 0.15;
      ctx.fillRect(-this.radius * 0.6, reflectY, this.radius * 1.2, this.fontSize * 0.08);
      ctx.restore();

      ctx.restore();
    }
  }

  // --- Letter Pool & Spawning ---
  const lettersPool = [];
  let nextCharIdx = 0;
  let lastSpawnTime = 0;

  function getNextChar() {
    const char = ALPHABET[nextCharIdx % 26];
    nextCharIdx++;
    return char;
  }

  function spawnLetter(now) {
    const activeCount = lettersPool.filter(l => !l.dead).length;
    if (activeCount >= MAX_ON_SCREEN) return;

    const char = getNextChar();
    const colorIdx = (nextCharIdx - 1) % oceanPalette.length;
    const color = oceanPalette[colorIdx];

    const charData = {
      char: char,
      front: color.front,
      depth: color.depth,
      highlight: color.highlight,
    };

    const dpr = window.devicePixelRatio || 1;
    const stageRect = stage ? stage.getBoundingClientRect() : null;
    const canvasRect = canvas.getBoundingClientRect();

    let x, y;
    if (stageRect) {
      // Direct alphabet letters to fall into the Left Sea Wave zone (12% to 42% width)
      const minX = (stageRect.left - canvasRect.left + stageRect.width * 0.12) * dpr;
      const maxX = (stageRect.left - canvasRect.left + stageRect.width * 0.42) * dpr;
      x = minX + Math.random() * (maxX - minX);
      y = (stageRect.top - canvasRect.top + 20 + Math.random() * 40) * dpr;
    } else {
      x = (width * 0.22) + (Math.random() - 0.5) * (width * 0.18);
      y = 80 * dpr;
    }

    lettersPool.push(new ClayAlphabet(charData, x, y));
  }

  // Initial batch — 3 letters
  function spawnInitialBatch() {
    const dpr = window.devicePixelRatio || 1;
    const stageRect = stage ? stage.getBoundingClientRect() : null;
    const canvasRect = canvas.getBoundingClientRect();

    for (let i = 0; i < 3; i++) {
      const char = getNextChar();
      const colorIdx = i % oceanPalette.length;
      const color = oceanPalette[colorIdx];

      const charData = {
        char: char,
        front: color.front,
        depth: color.depth,
        highlight: color.highlight,
      };

      let x, y;
      if (stageRect) {
        const laneOffsets = [0.15, 0.28, 0.40];
        x = (stageRect.left - canvasRect.left + stageRect.width * laneOffsets[i]) * dpr;
        y = (stageRect.top - canvasRect.top - (i * 90) + 40) * dpr;
      } else {
        x = (0.16 + i * 0.12) * width;
        y = (80 - i * 80) * dpr;
      }

      lettersPool.push(new ClayAlphabet(charData, x, y));
    }
  }

  spawnInitialBatch();

  // --- Interactive Drag & Throw into Ocean ---
  let draggedLetter = null;
  let lastX = 0;
  let lastY = 0;
  let tossVx = 0;
  let tossVy = 0;

  window.addEventListener('mousedown', (e) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clickX = (e.clientX - rect.left) * dpr;
    const clickY = (e.clientY - rect.top) * dpr;

    for (let i = lettersPool.length - 1; i >= 0; i--) {
      const letter = lettersPool[i];
      if (letter.dead) continue;
      const dist = Math.hypot(clickX - letter.x, clickY - letter.y);

      if (dist < letter.radius * 1.45) {
        draggedLetter = letter;
        draggedLetter.isDragging = true;
        draggedLetter.hasLanded = false; // Allow re-splashing when thrown!
        draggedLetter.dragOffsetX = letter.x - clickX;
        draggedLetter.dragOffsetY = letter.y - clickY;

        lastX = clickX;
        lastY = clickY;
        tossVx = 0;
        tossVy = 0;

        lettersPool.splice(i, 1);
        lettersPool.push(draggedLetter);
        break;
      }
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const curX = (e.clientX - rect.left) * dpr;
    const curY = (e.clientY - rect.top) * dpr;

    if (!draggedLetter) {
      let isOver = false;
      for (let i = 0; i < lettersPool.length; i++) {
        const letter = lettersPool[i];
        if (!letter.dead && Math.hypot(curX - letter.x, curY - letter.y) < letter.radius * 1.3) {
          isOver = true;
          break;
        }
      }
      if (viewportCanvas) {
        viewportCanvas.style.cursor = isOver ? 'grab' : '';
      }
      return;
    }

    tossVx = (curX - lastX) * 0.95;
    tossVy = (curY - lastY) * 0.95;

    draggedLetter.x = curX + draggedLetter.dragOffsetX;
    draggedLetter.y = curY + draggedLetter.dragOffsetY;

    lastX = curX;
    lastY = curY;
    if (viewportCanvas) viewportCanvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (draggedLetter) {
      draggedLetter.isDragging = false;
      draggedLetter.vx = tossVx * 1.25;
      draggedLetter.vy = tossVy * 1.25;
      draggedLetter.rotSpeed = tossVx * 0.015;
      draggedLetter = null;
      if (viewportCanvas) viewportCanvas.style.cursor = '';
    }
  });

  // --- Animation Loop ---
  let isCanvasActive = true;
  let canvasFrameId = null;

  function animate(timestamp) {
    if (!isCanvasActive) {
      canvasFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Ambient Ocean Micro-Bubbles
    for (let b = 0; b < ambientBubbles.length; b++) {
      ambientBubbles[b].update();
      ambientBubbles[b].draw();
    }

    // 2. Draw Back Ocean Swell (Distant Horizon Sea Layer)
    drawRealisticOceanWaves(ctx, width, height, timestamp, 'back');

    // 3. Update & Draw Water Surface Ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.update();
      r.draw();
      if (r.alpha <= 0) ripples.splice(i, 1);
    }

    // 4. Update & Draw 3D Clay Alphabet Letters
    for (let i = lettersPool.length - 1; i >= 0; i--) {
      const letter = lettersPool[i];
      letter.update(timestamp, lettersPool);
      letter.draw();
      if (letter.dead && !letter.isDragging) {
        lettersPool.splice(i, 1);
      }
    }

    // 5. Draw Mid & Front Ocean Wave Swell (With Crest Whitecaps & Foam Shimmer)
    // This renders over the submerged part of the floating letters, naturally dipping them in the ocean!
    drawRealisticOceanWaves(ctx, width, height, timestamp, 'front');

    // 6. Update & Draw Water Spray Splashes
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      s.update();
      s.draw();
      if (s.alpha <= 0) splashes.splice(i, 1);
    }

    // Spawn new letters
    if (timestamp - lastSpawnTime > SPAWN_INTERVAL_MS) {
      spawnLetter(timestamp);
      lastSpawnTime = timestamp;
    }

    canvasFrameId = requestAnimationFrame(animate);
  }

  // Canvas Intersection Observer — pause physics canvas when user scrolls down
  if ('IntersectionObserver' in window && viewportCanvas) {
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isCanvasActive = entry.isIntersecting;
        if (isCanvasActive && !canvasFrameId) {
          canvasFrameId = requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.05 });
    canvasObserver.observe(viewportCanvas);
  }

  canvasFrameId = requestAnimationFrame(animate);

  // --- 4. Sticky Frosted Header & Scroll Controller (Zero Jank / 120 FPS Native) ---
  const studioNav = document.getElementById('studioNav');
  const navScrollProgress = document.getElementById('navScrollProgress');
  const navLinkHome = document.getElementById('navLinkHome');
  const navLinkCourses = document.getElementById('navLinkCourses');
  const navLinkBlogs = document.getElementById('navLinkBlogs');
  const navLinkImpacts = document.getElementById('navLinkImpacts');
  const navLinkAbout = document.getElementById('navLinkAbout');
  const coursesSection = document.getElementById('coursesSection');
  const impactSection = document.getElementById('impactSection');
  const learnSection = document.getElementById('learnSection');
  const aboutSection = document.getElementById('aboutSection');
  const coursesHeaderBlock = document.getElementById('coursesHeaderBlock');
  const coursesGrid = document.querySelector('.courses-grid');
  const coursesGridDuo = document.querySelector('.courses-grid-duo');
  const coursesBottomRow = document.getElementById('coursesBottomRow');
  const learnCardsTrack = document.getElementById('learnCardsTrack');
  const orbLeft = document.getElementById('orbLeft');
  const orbRight = document.getElementById('orbRight');

  const navLinksArray = [navLinkHome, navLinkCourses, navLinkBlogs, navLinkImpacts, navLinkAbout].filter(Boolean);

  function setActiveNavLink(activeLink) {
    navLinksArray.forEach(link => {
      if (link === activeLink) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    // A. Dynamic Scroll Depth Indicator in Navbar
    if (navScrollProgress) {
      navScrollProgress.style.width = `${scrollPercent}%`;
    }

    // B. Sticky Frosted Capsule Docking & Morph
    if (studioNav) {
      if (scrollY > 30) {
        studioNav.classList.add('scrolled');
      } else {
        studioNav.classList.remove('scrolled');
      }
    }

    // C. Active Section Indicator Spy for 5 Sections
    const aboutTop = aboutSection ? aboutSection.offsetTop - 280 : Infinity;
    const blogsTop = learnSection ? learnSection.offsetTop - 280 : Infinity;
    const impactsTop = impactSection ? impactSection.offsetTop - 280 : Infinity;
    const coursesTop = coursesSection ? coursesSection.offsetTop - 280 : 800;

    if (scrollY >= aboutTop) {
      setActiveNavLink(navLinkAbout);
    } else if (scrollY >= blogsTop) {
      setActiveNavLink(navLinkBlogs);
    } else if (scrollY >= impactsTop) {
      setActiveNavLink(navLinkImpacts);
    } else if (scrollY >= coursesTop) {
      setActiveNavLink(navLinkCourses);
    } else {
      setActiveNavLink(navLinkHome);
    }

    // D. Lightweight Parallax for Ambient Ocean Blue Orbs
    if (orbLeft && coursesSection) {
      const offset = (scrollY - coursesSection.offsetTop) * 0.06;
      orbLeft.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    if (orbRight && coursesSection) {
      const offset = (scrollY - coursesSection.offsetTop) * -0.05;
      orbRight.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
  }

  // --- Butter-Smooth 120FPS Scroll Listener ---
  let isScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  }, { passive: true });

  handleScroll();

  // --- 5. GPU-Driven Scroll Entrances & Center Fan-Out via IntersectionObserver ---
  if ('IntersectionObserver' in window) {
    // Courses Header Observer
    if (coursesHeaderBlock) {
      const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            coursesHeaderBlock.classList.add('revealed');
          } else if (entry.boundingClientRect.top > 0) {
            coursesHeaderBlock.classList.remove('revealed');
          }
        });
      }, { threshold: 0.2 });
      headerObserver.observe(coursesHeaderBlock);
    }

    // Courses Grid (Row 1 Fan-Out) Observer — Triggers smoothly right as top edge enters viewport
    if (coursesGrid) {
      const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            coursesGrid.classList.add('fanned-out');
          } else if (entry.boundingClientRect.top > 0) {
            coursesGrid.classList.remove('fanned-out');
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
      gridObserver.observe(coursesGrid);
    }

    // Courses Grid Duo (Row 2 Fan-Out) Observer
    if (coursesGridDuo) {
      const duoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            coursesGridDuo.classList.add('fanned-out');
          } else if (entry.boundingClientRect.top > 0) {
            coursesGridDuo.classList.remove('fanned-out');
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
      duoObserver.observe(coursesGridDuo);
    }

    // Courses Bottom Row (1 Solo Card Fan-Out) Observer
    if (coursesBottomRow) {
      const bottomObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            coursesBottomRow.classList.add('fanned-out');
          } else if (entry.boundingClientRect.top > 0) {
            coursesBottomRow.classList.remove('fanned-out');
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
      bottomObserver.observe(coursesBottomRow);
    }

    // Learn With Us (Section 3) Observer
    if (learnSection) {
      const learnObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            learnSection.classList.add('revealed');
            if (learnCardsTrack) learnCardsTrack.classList.add('fanned-out');
          } else if (entry.boundingClientRect.top > 0) {
            learnSection.classList.remove('revealed');
            if (learnCardsTrack) learnCardsTrack.classList.remove('fanned-out');
          }
        });
      }, { threshold: 0.15 });
      learnObserver.observe(learnSection);
    }

    // Studio Footer Cinematic Wave Surge Observer
    const studioFooter = document.getElementById('studioFooter');
    if (studioFooter) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            studioFooter.classList.add('wave-surged');
          } else if (entry.boundingClientRect.top > 0) {
            studioFooter.classList.remove('wave-surged');
          }
        });
      }, { threshold: 0.12 });
      footerObserver.observe(studioFooter);
    }
  } else {
    // Fallback if IntersectionObserver not supported
    if (coursesHeaderBlock) coursesHeaderBlock.classList.add('revealed');
    if (coursesGrid) coursesGrid.classList.add('fanned-out');
    if (coursesGridDuo) coursesGridDuo.classList.add('fanned-out');
    if (learnSection) learnSection.classList.add('revealed');
    if (learnCardsTrack) learnCardsTrack.classList.add('fanned-out');
    const studioFooterFallback = document.getElementById('studioFooter');
    if (studioFooterFallback) studioFooterFallback.classList.add('wave-surged');
  }

  // Interactive Replay for Ocean Wave Surge in Footer
  const btnReplayWaveSurge = document.getElementById('btnReplayWaveSurge');
  const footerForReplay = document.getElementById('studioFooter');
  if (btnReplayWaveSurge && footerForReplay) {
    btnReplayWaveSurge.addEventListener('click', (e) => {
      e.preventDefault();
      footerForReplay.classList.remove('wave-surged');
      // Trigger DOM reflow so the transition restarts from scratch
      void footerForReplay.offsetHeight;
      setTimeout(() => {
        footerForReplay.classList.add('wave-surged');
      }, 50);
    });
  }

  // --- About Showcase Segmented Pill Switcher (with Scroll-Driven Morph) ---
  const btnAboutAtelier = document.getElementById('btnAboutAtelier');
  const btnAboutTrainer = document.getElementById('btnAboutTrainer');
  const panelAboutAtelier = document.getElementById('panelAboutAtelier');
  const panelAboutTrainer = document.getElementById('panelAboutTrainer');

  function switchAboutTab(tabName) {
    if (tabName === 'trainer') {
      if (btnAboutTrainer) {
        btnAboutTrainer.classList.add('active');
        btnAboutTrainer.setAttribute('aria-selected', 'true');
      }
      if (btnAboutAtelier) {
        btnAboutAtelier.classList.remove('active');
        btnAboutAtelier.setAttribute('aria-selected', 'false');
      }
      if (panelAboutTrainer) panelAboutTrainer.classList.add('active');
      if (panelAboutAtelier) panelAboutAtelier.classList.remove('active');
    } else {
      if (btnAboutAtelier) {
        btnAboutAtelier.classList.add('active');
        btnAboutAtelier.setAttribute('aria-selected', 'true');
      }
      if (btnAboutTrainer) {
        btnAboutTrainer.classList.remove('active');
        btnAboutTrainer.setAttribute('aria-selected', 'false');
      }
      if (panelAboutAtelier) panelAboutAtelier.classList.add('active');
      if (panelAboutTrainer) panelAboutTrainer.classList.remove('active');
    }
  }

  // In-Place Scroll Swap: Swaps between About Us and About Trainer on the spot without scrolling away
  const aboutSectionEl = document.getElementById('aboutSection');
  if (aboutSectionEl) {
    let swapCooldown = false;
    function triggerCooldown() {
      swapCooldown = true;
      setTimeout(() => { swapCooldown = false; }, 450);
    }

    if (btnAboutAtelier) {
      btnAboutAtelier.addEventListener('click', () => {
        switchAboutTab('atelier');
        triggerCooldown();
      });
    }
    if (btnAboutTrainer) {
      btnAboutTrainer.addEventListener('click', () => {
        switchAboutTab('trainer');
        triggerCooldown();
      });
    }

    // Wheel listener: intercepts wheel at this section to swap in-place
    aboutSectionEl.addEventListener('wheel', (e) => {
      const rect = aboutSectionEl.getBoundingClientRect();
      const winH = window.innerHeight;
      // Active viewing zone (section is prominent in the screen)
      const inView = rect.top <= winH * 0.5 && rect.bottom >= winH * 0.4;

      if (!inView || swapCooldown) return;

      if (e.deltaY > 15 && panelAboutAtelier && panelAboutAtelier.classList.contains('active')) {
        // Scrolling down on About Us: stop scroll from moving away, swap to Trainer in place!
        e.preventDefault();
        switchAboutTab('trainer');
        triggerCooldown();
      } else if (e.deltaY < -15 && panelAboutTrainer && panelAboutTrainer.classList.contains('active')) {
        // Scrolling up on About Trainer: stop scroll from moving away, swap to Atelier in place!
        e.preventDefault();
        switchAboutTab('atelier');
        triggerCooldown();
      }
    }, { passive: false });

    // Touch swipe listener for mobile:
    let touchStartY = 0;
    aboutSectionEl.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    aboutSectionEl.addEventListener('touchmove', (e) => {
      if (!touchStartY || swapCooldown) return;
      const rect = aboutSectionEl.getBoundingClientRect();
      const winH = window.innerHeight;
      const inView = rect.top <= winH * 0.55 && rect.bottom >= winH * 0.35;
      if (!inView) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;

      if (diffY > 30 && panelAboutAtelier && panelAboutAtelier.classList.contains('active')) {
        // Swipe up: swap to Trainer
        e.preventDefault();
        switchAboutTab('trainer');
        triggerCooldown();
        touchStartY = 0;
      } else if (diffY < -30 && panelAboutTrainer && panelAboutTrainer.classList.contains('active')) {
        // Swipe down: swap to Atelier
        e.preventDefault();
        switchAboutTab('atelier');
        triggerCooldown();
        touchStartY = 0;
      }
    }, { passive: false });
  }

  // Handle hash changes (e.g. clicking #aboutTrainerSection link in footer)
  function checkAboutHash() {
    if (window.location.hash === '#aboutTrainerSection') {
      switchAboutTab('trainer');
    } else if (window.location.hash === '#aboutSection') {
      switchAboutTab('atelier');
    }
  }
  window.addEventListener('hashchange', checkAboutHash);
  checkAboutHash();

  document.querySelectorAll('a[href="#aboutTrainerSection"]').forEach(link => {
    link.addEventListener('click', () => {
      switchAboutTab('trainer');
    });
  });
  document.querySelectorAll('a[href="#aboutSection"]').forEach(link => {
    link.addEventListener('click', () => {
      switchAboutTab('atelier');
    });
  });

  // --- 6. Interactive Card 3D Magnetic Tilt & Spotlight (Apple / Stripe style) ---
  const allInteractiveCards = document.querySelectorAll('.course-card');
  allInteractiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates for radial gradient glow
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation (subtle luxury angle, max 4.5 degrees)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.018)`;
    });

    card.addEventListener('mouseleave', () => {
      // Revert inline transform cleanly so CSS fanned-out state seamlessly resumes
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // SECTION 3: LEARN WITH US (EDITORIAL BLOGS & MASTERCLASSES)
  // ==========================================================================
  const articlesData = {
    courses: {
      kicker: 'PEDAGOGY & METHODOLOGY',
      title: 'Speech Cadence & MTI Neutralization',
      meta: '6 Min Read • Senior Phonetics Lead • Pallavaram Atelier',
      content: `
        <p>Mother Tongue Influence (MTI) is fundamentally an acoustic placement reflex rather than a lack of vocabulary. When speaking English, non-native speakers intuitively project vowel resonances from their native phonological muscle memory.</p>
        <h4>1. The Acoustic Vowel Shift</h4>
        <p>At Aura Atelier in Pallavaram, our diagnostic training targets diaphragmatic breath regulation and thought-chunking. Instead of translating sentences word-by-word, students practice syllable stress hierarchies and unvoiced stops (p, t, k) with natural acoustic cadence.</p>
        <div class="reader-takeaway-box">
          <strong>Pedagogical Milestone</strong>
          <span>12 studio hours of phonetic placement drills reduces conversational regional hesitation by over 80%, establishing spontaneous global speech cadence.</span>
        </div>
        <h4>2. Thought-to-Speech Sentence Architecture</h4>
        <p>By training in intimate 1:6 cohorts, each student receives immediate corrective audio feedback, replacing mental mother-tongue translation with instantaneous rhetorical instincts.</p>
      `
    },
    blog: {
      kicker: 'THE ATELIER JOURNAL',
      title: 'The Cognitive Art of Impromptu Debate',
      meta: '8 Min Read • Debate & Rhetoric Coach • Pallavaram Atelier',
      content: `
        <p>Impromptu speaking—speaking under scrutiny without prior preparation—is the ultimate benchmark of linguistic fluency. The primary barrier to fluency is cognitive self-censorship, where the speaker pauses to second-guess sentence structures.</p>
        <h4>1. The 3-Tier Rhetorical Pillar</h4>
        <p>We train students to deploy the Hook-Point-Impact architecture in parliamentary and extempore debates. This allows thoughts to flow directly into speech without vocal fry or hesitation fillers like "uh" and "um".</p>
        <div class="reader-takeaway-box">
          <strong>Cognitive Reflex</strong>
          <span>Mastering structural rhetorical templates enables speakers to respond to unpredictable questions with calm composure and boardroom authority.</span>
        </div>
        <h4>2. Handling Counter-Arguments with Poise</h4>
        <p>Structured rebuttal drills instill diplomatic nuance, ensuring arguments are defended logically with assertive vocal modulation.</p>
      `
    },
    webinars: {
      kicker: 'AUDIO MASTERCLASSES',
      title: 'Acoustic Diction & Tone Calibration',
      meta: 'Audio Masterclass • 28 Mins • Director of Diction',
      content: `
        <p>Tone calibration separates mundane communicators from commanding leaders. Vocal fry, upward inflection at sentence endings, and rushing tempo project insecurity, even when the substance is brilliant.</p>
        <h4>1. Pitch Stabilization & Chest Resonance</h4>
        <p>This masterclass guides you through diaphragmatic pitch grounding, training you to end declarative sentences on a downward pitch anchor that commands room respect.</p>
        <div class="reader-takeaway-box">
          <strong>Acoustic Insight</strong>
          <span>Pitch stabilization and conscious strategic pauses amplify executive verbal authority more effectively than increasing speech volume.</span>
        </div>
        <h4>2. Cross-Cultural International Cadence</h4>
        <p>Learn to calibrate conversational tempo for global boardrooms, investors, and high-stakes media interviews.</p>
      `
    }
  };

  const readerDialog = document.getElementById('readerDialog');
  const closeReaderBtn = document.getElementById('closeReaderBtn');
  const readerKicker = document.getElementById('readerKicker');
  const readerTitle = document.getElementById('readerTitle');
  const readerMeta = document.getElementById('readerMeta');
  const readerContent = document.getElementById('readerContent');

  function openReader(articleKey) {
    const article = articlesData[articleKey] || articlesData.courses;
    if (readerKicker) readerKicker.textContent = article.kicker;
    if (readerTitle) readerTitle.textContent = article.title;
    if (readerMeta) readerMeta.textContent = article.meta;
    if (readerContent) readerContent.innerHTML = article.content;

    if (readerDialog) {
      document.body.style.overflow = 'hidden';
      if (typeof readerDialog.showModal === 'function') {
        readerDialog.showModal();
      } else {
        readerDialog.setAttribute('open', '');
      }
    }
  }

  function closeReader() {
    document.body.style.overflow = '';
    if (!readerDialog) return;
    if (typeof readerDialog.close === 'function') {
      readerDialog.close();
    } else {
      readerDialog.removeAttribute('open');
    }
  }

  if (closeReaderBtn) closeReaderBtn.addEventListener('click', closeReader);

  if (readerDialog) {
    readerDialog.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
    readerDialog.addEventListener('click', (e) => {
      const rect = readerDialog.getBoundingClientRect();
      const inDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inDialog) closeReader();
    });
  }

  // Bind article clicks to Open Reader
  document.querySelectorAll('.learn-card, .learn-card-link').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const articleKey = elem.getAttribute('data-article');
      if (articleKey) openReader(articleKey);
    });
  });

  // Carousel Next/Prev Controls
  const learnPrevBtn = document.getElementById('learnPrevBtn');
  const learnNextBtn = document.getElementById('learnNextBtn');
  const learnTrack = document.getElementById('learnCardsTrack');

  if (learnPrevBtn && learnTrack) {
    learnPrevBtn.addEventListener('click', () => {
      learnTrack.scrollBy({ left: -420, behavior: 'smooth' });
    });
  }

  if (learnNextBtn && learnTrack) {
    learnNextBtn.addEventListener('click', () => {
      learnTrack.scrollBy({ left: 420, behavior: 'smooth' });
    });
  }

  // --- 8. 12-Card Fast Continuous Non-Stop Interactive Gallery Carousel ---
  const galleryViewport = document.getElementById('galleryViewport');
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');

  if (galleryViewport && galleryTrack) {
    let isPaused = false;
    let isDown = false;
    let startX = 0;
    let initialScroll = 0;
    let galleryAutoTimer = null;

    // Clone cards once to create an infinite wrap loop
    const originalCards = Array.from(galleryTrack.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      galleryTrack.appendChild(clone);
    });

    // A. 2-Second Step Carousel Engine
    function getCardStep() {
      const firstCard = galleryTrack.querySelector('.gallery-reel-card');
      if (!firstCard) return 335;
      const style = window.getComputedStyle(galleryTrack);
      const gap = parseFloat(style.gap) || 25;
      return firstCard.offsetWidth + gap;
    }

    function slideGalleryNext() {
      if (!galleryViewport) return;
      const step = getCardStep();
      const halfWidth = galleryTrack.scrollWidth / 2;
      if (galleryViewport.scrollLeft >= halfWidth - 5) {
        galleryViewport.style.scrollBehavior = 'auto';
        galleryViewport.scrollLeft = 0;
        void galleryViewport.offsetHeight;
        galleryViewport.style.scrollBehavior = 'smooth';
      }
      galleryViewport.scrollBy({ left: step, behavior: 'smooth' });
    }

    function slideGalleryPrev() {
      if (!galleryViewport) return;
      const step = getCardStep();
      const halfWidth = galleryTrack.scrollWidth / 2;
      if (galleryViewport.scrollLeft <= 5) {
        galleryViewport.style.scrollBehavior = 'auto';
        galleryViewport.scrollLeft = halfWidth;
        void galleryViewport.offsetHeight;
        galleryViewport.style.scrollBehavior = 'smooth';
      }
      galleryViewport.scrollBy({ left: -step, behavior: 'smooth' });
    }

    function startGalleryAutoTimer() {
      if (galleryAutoTimer) clearInterval(galleryAutoTimer);
      galleryAutoTimer = setInterval(() => {
        if (!isPaused && !isDown) {
          slideGalleryNext();
        }
      }, 2000); // 2 Seconds Auto Slide
    }

    function resetGalleryAutoTimer() {
      if (galleryAutoTimer) clearInterval(galleryAutoTimer);
      startGalleryAutoTimer();
    }

    startGalleryAutoTimer();

    // Pause on hover
    galleryViewport.addEventListener('mouseenter', () => { isPaused = true; });
    galleryViewport.addEventListener('mouseleave', () => { if (!isDown) isPaused = false; });

    // B. Interactive Arrow Navigation Buttons
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', () => {
        slideGalleryPrev();
        resetGalleryAutoTimer();
      });
    }

    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', () => {
        slideGalleryNext();
        resetGalleryAutoTimer();
      });
    }

    // C. Double Tap / Double Click Gesture (Forward or Backward)
    galleryViewport.addEventListener('dblclick', (e) => {
      const rect = galleryViewport.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width / 2) {
        slideGalleryNext();
      } else {
        slideGalleryPrev();
      }
      resetGalleryAutoTimer();
    });

    // Mobile double-tap detection
    let lastTapTime = 0;
    galleryViewport.addEventListener('touchend', (e) => {
      const currentTime = performance.now();
      const tapInterval = currentTime - lastTapTime;
      if (tapInterval < 320 && tapInterval > 0) {
        const touch = e.changedTouches[0];
        const rect = galleryViewport.getBoundingClientRect();
        const tapX = touch.clientX - rect.left;
        if (tapX > rect.width / 2) {
          slideGalleryNext();
        } else {
          slideGalleryPrev();
        }
        resetGalleryAutoTimer();
      }
      lastTapTime = currentTime;
    }, { passive: true });

    // D. Drag-to-Scroll Support
    galleryViewport.addEventListener('mousedown', (e) => {
      isDown = true;
      galleryViewport.classList.add('is-dragging');
      galleryViewport.style.scrollBehavior = 'auto';
      startX = e.pageX - galleryViewport.offsetLeft;
      initialScroll = galleryViewport.scrollLeft;
      isPaused = true;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        galleryViewport.classList.remove('is-dragging');
        galleryViewport.style.scrollBehavior = 'smooth';
        isPaused = false;
        resetGalleryAutoTimer();
      }
    });

    galleryViewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryViewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryViewport.scrollLeft = initialScroll - walk;
    });

    // E. Gallery Photo Click to Open Lightbox
    const oceanImageModal = document.getElementById('oceanImageModal');
    const oceanLightboxImg = document.getElementById('oceanLightboxImg');
    const modalImageTitle = document.getElementById('modalImageTitle');
    const modalImageDesc = document.getElementById('modalImageDesc');
    const closeImageModalBtn = document.getElementById('closeImageModalBtn');

    function openImageModal(card) {
      if (!oceanImageModal || !card) return;
      const img = card.querySelector('.gallery-reel-img');
      const h4 = card.querySelector('h4');
      const p = card.querySelector('p');

      if (oceanLightboxImg && img) {
        oceanLightboxImg.src = img.src;
        oceanLightboxImg.alt = img.alt || 'Studio Gallery View';
      }
      if (modalImageTitle && h4) {
        modalImageTitle.textContent = h4.textContent;
      }
      if (modalImageDesc && p) {
        modalImageDesc.textContent = p.textContent;
      }

      if (typeof oceanImageModal.showModal === 'function') {
        oceanImageModal.showModal();
      } else {
        oceanImageModal.setAttribute('open', '');
      }
    }

    if (closeImageModalBtn && oceanImageModal) {
      closeImageModalBtn.addEventListener('click', () => {
        if (typeof oceanImageModal.close === 'function') {
          oceanImageModal.close();
        } else {
          oceanImageModal.removeAttribute('open');
        }
      });

      oceanImageModal.addEventListener('click', (e) => {
        if (e.target === oceanImageModal) {
          if (typeof oceanImageModal.close === 'function') {
            oceanImageModal.close();
          } else {
            oceanImageModal.removeAttribute('open');
          }
        }
      });
    }

    galleryTrack.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-reel-card');
      if (card) {
        openImageModal(card);
      }
    });
  }

  // ==========================================================================
  // --- 9. The Cinema Stage & Holographic Review Deck (Testimonials) ---
  // ==========================================================================

  // A. Video Cinema Stage Engine
  const cinemaActiveVideo = document.getElementById('cinemaActiveVideo');
  const cinemaVideoSource = document.getElementById('cinemaVideoSource');
  const cinemaVideoType = document.getElementById('cinemaVideoType');
  const cinemaVideoTitle = document.getElementById('cinemaVideoTitle');
  const cinemaAmbientGlow = document.getElementById('cinemaAmbientGlow');
  const cinemaTabs = document.querySelectorAll('.cinema-selector-tab');
  const cinemaPlayerBox = document.getElementById('cinemaPlayerBox');
  const cinemaPlayTrigger = document.getElementById('cinemaPlayTrigger');

  const videoReelsData = [
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      type: '0:52 • SPEECH REEL',
      title: 'From Hesitation to Assembly Anchor',
      glow: 'radial-gradient(circle at 35% 40%, rgba(34, 211, 238, 0.38) 0%, rgba(0, 157, 196, 0.18) 45%, rgba(255, 107, 107, 0.28) 80%, transparent 100%)'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      type: '1:18 • CORPORATE REEL',
      title: 'Eliminating Internal Translation Lag',
      glow: 'radial-gradient(circle at 40% 45%, rgba(0, 157, 196, 0.4) 0%, rgba(255, 107, 107, 0.22) 50%, rgba(8, 45, 56, 0.15) 80%, transparent 100%)'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
      type: '0:45 • STORYTELLING REEL',
      title: 'Spontaneous Storytelling Without Pauses',
      glow: 'radial-gradient(circle at 35% 40%, rgba(255, 107, 107, 0.35) 0%, rgba(34, 211, 238, 0.28) 50%, rgba(0, 157, 196, 0.15) 80%, transparent 100%)'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      type: '1:04 • IELTS SPEAKING',
      title: 'IELTS Speaking: Band 6.0 → Band 8.0',
      glow: 'radial-gradient(circle at 40% 40%, rgba(0, 112, 138, 0.4) 0%, rgba(255, 107, 107, 0.25) 50%, rgba(34, 211, 238, 0.2) 80%, transparent 100%)'
    }
  ];

  function updatePlayTriggerState(isPlaying) {
    if (!cinemaPlayerBox) return;
    const playIcon = cinemaPlayTrigger ? cinemaPlayTrigger.querySelector('.play-icon') : null;
    const pauseIcon = cinemaPlayTrigger ? cinemaPlayTrigger.querySelector('.pause-icon') : null;
    if (isPlaying) {
      cinemaPlayerBox.classList.add('is-playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    } else {
      cinemaPlayerBox.classList.remove('is-playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    }
  }

  function toggleCinemaPlay() {
    if (!cinemaActiveVideo) return;
    if (cinemaActiveVideo.paused || cinemaActiveVideo.ended) {
      cinemaActiveVideo.play().then(() => {
        updatePlayTriggerState(true);
      }).catch(err => {
        console.warn('Cinema video playback err:', err);
      });
    } else {
      cinemaActiveVideo.pause();
      updatePlayTriggerState(false);
    }
  }

  if (cinemaPlayTrigger) {
    cinemaPlayTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCinemaPlay();
    });
  }

  if (cinemaPlayerBox) {
    cinemaPlayerBox.addEventListener('click', (e) => {
      if (e.target !== cinemaActiveVideo) {
        toggleCinemaPlay();
      }
    });
  }

  if (cinemaActiveVideo) {
    cinemaActiveVideo.addEventListener('play', () => updatePlayTriggerState(true));
    cinemaActiveVideo.addEventListener('pause', () => updatePlayTriggerState(false));
    cinemaActiveVideo.addEventListener('ended', () => updatePlayTriggerState(false));
  }

  function switchCinemaVideo(index) {
    if (!cinemaActiveVideo || !videoReelsData[index]) return;
    const data = videoReelsData[index];

    // Update active tab styling
    cinemaTabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // Update overlay text
    if (cinemaVideoType) cinemaVideoType.textContent = data.type;
    if (cinemaVideoTitle) cinemaVideoTitle.textContent = data.title;
    if (cinemaAmbientGlow) cinemaAmbientGlow.style.background = data.glow;

    // Transition video source
    cinemaActiveVideo.pause();
    updatePlayTriggerState(false);
    cinemaActiveVideo.poster = data.poster;
    if (cinemaVideoSource) {
      cinemaVideoSource.src = data.src;
      cinemaActiveVideo.load();
    }
  }

  cinemaTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => switchCinemaVideo(idx));
  });

  // B. Holographic Review Deck Engine (2-Second Step)
  const reviewCards = document.querySelectorAll('.holographic-review-card');
  const deckPrevBtn = document.getElementById('deckPrevBtn');
  const deckNextBtn = document.getElementById('deckNextBtn');
  const deckCounter = document.getElementById('deckCounter');
  let currentReviewIdx = 0;
  let deckAutoTimer = null;

  function showReviewCard(index) {
    if (reviewCards.length === 0) return;
    
    // Bounds wrapping
    if (index >= reviewCards.length) currentReviewIdx = 0;
    else if (index < 0) currentReviewIdx = reviewCards.length - 1;
    else currentReviewIdx = index;

    reviewCards.forEach((card, i) => {
      if (i === currentReviewIdx) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if (deckCounter) {
      deckCounter.textContent = `0${currentReviewIdx + 1} / 0${reviewCards.length}`;
    }
  }

  if (deckPrevBtn) {
    deckPrevBtn.addEventListener('click', () => {
      showReviewCard(currentReviewIdx - 1);
      resetDeckAutoTimer();
    });
  }

  if (deckNextBtn) {
    deckNextBtn.addEventListener('click', () => {
      showReviewCard(currentReviewIdx + 1);
      resetDeckAutoTimer();
    });
  }

  function startDeckAutoTimer() {
    if (deckAutoTimer) clearInterval(deckAutoTimer);
    deckAutoTimer = setInterval(() => {
      // Don't auto-rotate review if video is actively playing
      if (cinemaPlayerBox && cinemaPlayerBox.classList.contains('is-playing')) {
        return;
      }
      showReviewCard(currentReviewIdx + 1);
    }, 2000); // 2 Seconds Auto Advance
  }

  function resetDeckAutoTimer() {
    if (deckAutoTimer) clearInterval(deckAutoTimer);
    startDeckAutoTimer();
  }

  const reviewsDeckCarousel = document.getElementById('reviewsDeckCarousel');
  if (reviewsDeckCarousel) {
    reviewsDeckCarousel.addEventListener('mouseenter', () => {
      if (deckAutoTimer) clearInterval(deckAutoTimer);
    });
    reviewsDeckCarousel.addEventListener('mouseleave', () => {
      startDeckAutoTimer();
    });
  }

  startDeckAutoTimer();

  // C. Interactive Voice Note Snippet Simulation
  const voiceCapsuleBtns = document.querySelectorAll('.voice-capsule-btn');
  voiceCapsuleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const capsule = btn.closest('.coral-voice-capsule');
      if (!capsule) return;

      const isPlaying = capsule.classList.contains('is-playing');
      const playSvg = btn.querySelector('.v-play-svg');
      const pauseSvg = btn.querySelector('.v-pause-svg');

      // Stop all others
      document.querySelectorAll('.coral-voice-capsule').forEach((c) => {
        c.classList.remove('is-playing');
        const b = c.querySelector('.voice-capsule-btn');
        if (b) {
          const pSvg = b.querySelector('.v-play-svg');
          const psSvg = b.querySelector('.v-pause-svg');
          if (pSvg) pSvg.style.display = 'block';
          if (psSvg) psSvg.style.display = 'none';
        }
      });

      if (!isPlaying) {
        capsule.classList.add('is-playing');
        if (playSvg) playSvg.style.display = 'none';
        if (pauseSvg) pauseSvg.style.display = 'block';

        setTimeout(() => {
          capsule.classList.remove('is-playing');
          if (playSvg) playSvg.style.display = 'block';
          if (pauseSvg) pauseSvg.style.display = 'none';
        }, 5500);
      }
    });
  });

  // D. Deck Schedule CTA Button -> Triggers Diagnostic Dialog
  const deckScheduleBtn = document.getElementById('deckScheduleBtn');
  if (deckScheduleBtn) {
    deckScheduleBtn.addEventListener('click', () => {
      const diagModal = document.getElementById('diagnosticDialog');
      if (diagModal) {
        if (typeof diagModal.showModal === 'function') diagModal.showModal();
        else diagModal.setAttribute('open', '');
      }
    });
  }

  // E. About Us & About Trainer Slide Switch Controller (Manual Button Driven)
  const aboutSlide1 = document.getElementById('aboutSlide1');
  const aboutSlide2 = document.getElementById('aboutSlide2');
  const aboutBackdrop1 = document.getElementById('aboutBackdrop1');
  const aboutBackdrop2 = document.getElementById('aboutBackdrop2');
  const btnSlideAboutUs = document.getElementById('btnSlideAboutUs');
  const btnSlideAboutTrainer = document.getElementById('btnSlideAboutTrainer');

  function switchToAboutSlide(slideIndex) {
    if (slideIndex === 1) {
      if (aboutBackdrop1) aboutBackdrop1.classList.add('active');
      if (aboutBackdrop2) aboutBackdrop2.classList.remove('active');
      if (aboutSlide1) aboutSlide1.classList.add('active');
      if (aboutSlide2) aboutSlide2.classList.remove('active');
      if (btnSlideAboutUs) btnSlideAboutUs.classList.add('active');
      if (btnSlideAboutTrainer) btnSlideAboutTrainer.classList.remove('active');
    } else {
      if (aboutBackdrop1) aboutBackdrop1.classList.remove('active');
      if (aboutBackdrop2) aboutBackdrop2.classList.add('active');
      if (aboutSlide1) aboutSlide1.classList.remove('active');
      if (aboutSlide2) aboutSlide2.classList.add('active');
      if (btnSlideAboutUs) btnSlideAboutUs.classList.remove('active');
      if (btnSlideAboutTrainer) btnSlideAboutTrainer.classList.add('active');
    }
  }

  if (btnSlideAboutUs) {
    btnSlideAboutUs.addEventListener('click', (e) => {
      e.preventDefault();
      switchToAboutSlide(1);
    });
  }
  if (btnSlideAboutTrainer) {
    btnSlideAboutTrainer.addEventListener('click', (e) => {
      e.preventDefault();
      switchToAboutSlide(2);
    });
  }

  // ==========================================================================
  // F. SEA 1-MINUTE ENGLISH LEVEL TEST (HUD COCKPIT CONTROLLER)
  // ==========================================================================
  const hudCockpitDrawer = document.getElementById('hudCockpitDrawer');
  const levelTestHeroBtn = document.getElementById('levelTestHeroBtn');
  const hudDismissBtn = document.getElementById('hudDismissBtn');
  const hudStageQuiz = document.getElementById('hudStageQuiz');
  const hudStageResult = document.getElementById('hudStageResult');
  
  // Timer & Clock elements
  const hudClockCluster = document.getElementById('hudClockCluster');
  const clockDigitsDisplay = document.getElementById('clockDigitsDisplay');
  const clockProgressCircle = document.getElementById('clockProgressCircle');
  const hudSetText = document.getElementById('hudSetText');
  
  // Quiz controls
  const qCurrentNum = document.getElementById('qCurrentNum');
  const quizTrackFill = document.getElementById('quizTrackFill');
  const quizPhaseTag = document.getElementById('quizPhaseTag');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsGrid = document.getElementById('quizOptionsGrid');
  const quizPrevBtn = document.getElementById('quizPrevBtn');
  const quizNextBtn = document.getElementById('quizNextBtn');
  
  // Results elements
  const resultTierTitle = document.getElementById('resultTierTitle');
  const resultMantraTitle = document.getElementById('resultMantraTitle');
  const resultMantraDesc = document.getElementById('resultMantraDesc');
  const resultRetakeBtn = document.getElementById('resultRetakeBtn');
  const resultCohortBtn = document.getElementById('resultCohortBtn');

  const levelTestQuestions = [
    // Set 1: Fast Basics (1 pt each)
    {
      set: 1,
      setName: "Set 1: Fast Basics",
      phase: "Fast Basics (1 pt)",
      pts: 1,
      q: "Hi! ______ name is Arjun.",
      options: ["He", "My", "Me", "I"],
      ansIndex: 1 // B
    },
    {
      set: 1,
      setName: "Set 1: Fast Basics",
      phase: "Fast Basics (1 pt)",
      pts: 1,
      q: "We ______ two dogs and a cat.",
      options: ["has", "having", "have", "is"],
      ansIndex: 2 // C
    },
    {
      set: 1,
      setName: "Set 1: Fast Basics",
      phase: "Fast Basics (1 pt)",
      pts: 1,
      q: '"______ is your English class?" "At 5:00 PM."',
      options: ["Where", "What", "Who", "When"],
      ansIndex: 3 // D
    },
    {
      set: 1,
      setName: "Set 1: Fast Basics",
      phase: "Fast Basics (1 pt)",
      pts: 1,
      q: "She ______ coffee every morning.",
      options: ["drink", "drinks", "drinking", "drunk"],
      ansIndex: 1 // B
    },
    {
      set: 1,
      setName: "Set 1: Fast Basics",
      phase: "Fast Basics (1 pt)",
      pts: 1,
      q: "There ______ many people in the park today.",
      options: ["is", "was", "are", "be"],
      ansIndex: 2 // C
    },

    // Set 2: Everyday Flow (2 pts each)
    {
      set: 2,
      setName: "Set 2: Everyday Flow",
      phase: "Everyday Flow (2 pts)",
      pts: 2,
      q: "Last week, we ______ to the beach.",
      options: ["go", "goes", "went", "going"],
      ansIndex: 2 // C
    },
    {
      set: 2,
      setName: "Set 2: Everyday Flow",
      phase: "Everyday Flow (2 pts)",
      pts: 2,
      q: "This movie is ______ than the book.",
      options: ["exciting", "more exciting", "most exciting", "much exciting"],
      ansIndex: 1 // B
    },
    {
      set: 2,
      setName: "Set 2: Everyday Flow",
      phase: "Everyday Flow (2 pts)",
      pts: 2,
      q: "Please call me when you ______ home.",
      options: ["reach", "will reach", "reached", "reaching"],
      ansIndex: 0 // A
    },
    {
      set: 2,
      setName: "Set 2: Everyday Flow",
      phase: "Everyday Flow (2 pts)",
      pts: 2,
      q: "They have lived here ______ 2022.",
      options: ["for", "since", "in", "at"],
      ansIndex: 1 // B
    },
    {
      set: 2,
      setName: "Set 2: Everyday Flow",
      phase: "Everyday Flow (2 pts)",
      pts: 2,
      q: "I ______ dinner right now, so can I call you back?",
      options: ["cook", "cooked", "am cooking", "have cooked"],
      ansIndex: 2 // C
    },

    // Set 3: Sharp & Natural (3 pts each)
    {
      set: 3,
      setName: "Set 3: Sharp & Natural",
      phase: "Sharp & Natural (3 pts)",
      pts: 3,
      q: "He didn't come to the meeting, ______ surprised everyone.",
      options: ["what", "which", "who", "that"],
      ansIndex: 1 // B
    },
    {
      set: 3,
      setName: "Set 3: Sharp & Natural",
      phase: "Sharp & Natural (3 pts)",
      pts: 3,
      q: "If I ______ more time yesterday, I would have finished the report.",
      options: ["have", "had", "would have", "was having"],
      ansIndex: 1 // B
    },
    {
      set: 3,
      setName: "Set 3: Sharp & Natural",
      phase: "Sharp & Natural (3 pts)",
      pts: 3,
      q: "Hardly ______ the room when the phone rang.",
      options: ["she entered", "did she enter", "had she entered", "she had entered"],
      ansIndex: 2 // C
    },
    {
      set: 3,
      setName: "Set 3: Sharp & Natural",
      phase: "Sharp & Natural (3 pts)",
      pts: 3,
      q: 'Someone who is "diplomatic" usually ______.',
      options: [
        "travels abroad every month",
        "handles sensitive situations with tact and calm",
        "speaks only formal written English",
        "avoids talking to people altogether"
      ],
      ansIndex: 1 // B
    },
    {
      set: 3,
      setName: "Set 3: Sharp & Natural",
      phase: "Sharp & Natural (3 pts)",
      pts: 3,
      q: "It is high time we ______ a clear plan for next month.",
      options: ["make", "made", "making", "will make"],
      ansIndex: 1 // B
    }
  ];

  const levelTiers = {
    basics: {
      code: "A1-A2",
      badgeText: "Basics Focus (A1–A2)",
      mantra: "Build core words, simple lines, day-one confidence with SEA.",
      desc: "A solid baseline to eliminate hesitation. In our 1:6 studio cohort, you will command fundamental speech patterns, daily conversation structures, and authentic spoken confidence from day one.",
      symbol: "🌱",
      ladderId: "resStepA",
      headerPillId: "ladderPillA"
    },
    fluency: {
      code: "B1",
      badgeText: "Fluency Focus (B1)",
      mantra: "Build smooth flow, tense ease, natural sparks with SEA.",
      desc: "You have strong foundation lines and are ready for effortless momentum. Our signature microphone drills help you master automatic tenses, reduce translation lag, and speak with spontaneous ease.",
      symbol: "🌊",
      ladderId: "resStepB1",
      headerPillId: "ladderPillB1"
    },
    vocabulary: {
      code: "B2",
      badgeText: "Vocabulary Focus (B2)",
      mantra: "Build bold words, snappy idioms, standout style with SEA.",
      desc: "Your speech is clear and fluid; now it's time to refine your vocal color and executive diction. Master high-impact idioms, persuasive rhetoric, and distinct boardroom presence.",
      symbol: "✨",
      ladderId: "resStepB2",
      headerPillId: "ladderPillB2"
    },
    mastery: {
      code: "C1-C2",
      badgeText: "Mastery Focus (C1–C2)",
      mantra: "Build crisp nuance, rich tone, effortless command with SEA.",
      desc: "Exceptional command of language. We refine subtle phonetic inflection, debate nuance, diplomatic composure, and high-stakes presentation leadership.",
      symbol: "👑",
      ladderId: "resStepC",
      headerPillId: "ladderPillC"
    }
  };

  let currentQIdx = 0;
  let userAnswers = new Array(levelTestQuestions.length).fill(null);
  let timerInterval = null;
  let timeRemaining = 60; // 60 seconds
  const totalDuration = 60;
  const circumference = 2 * Math.PI * 16; // r=16 -> ~100.53

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function startQuestionTimer() {
    stopTimer();
    timeRemaining = 60;
    updateClockVisual();
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateClockVisual();
      if (timeRemaining <= 0) {
        stopTimer();
        // 60 seconds finished on this question -> auto-advance to next question!
        if (currentQIdx < levelTestQuestions.length - 1) {
          renderQuestion(currentQIdx + 1);
        } else {
          calculateAndShowResult();
        }
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateClockVisual() {
    if (clockDigitsDisplay) {
      clockDigitsDisplay.textContent = formatTime(Math.max(0, timeRemaining));
    }
    if (clockProgressCircle) {
      const fraction = (totalDuration - timeRemaining) / totalDuration;
      const offset = circumference * fraction;
      clockProgressCircle.style.strokeDashoffset = offset;
    }
    if (hudClockCluster) {
      if (timeRemaining <= 12) {
        hudClockCluster.classList.add('time-warning');
      } else {
        hudClockCluster.classList.remove('time-warning');
      }
    }
  }

  function renderQuestion(idx) {
    if (idx < 0 || idx >= levelTestQuestions.length) return;
    currentQIdx = idx;
    const item = levelTestQuestions[idx];

    // Reset and start 60s clock for this question
    startQuestionTimer();

    // Counter & progress line
    if (qCurrentNum) qCurrentNum.textContent = idx + 1;
    if (quizTrackFill) {
      const pct = ((idx + 1) / levelTestQuestions.length) * 100;
      quizTrackFill.style.width = `${pct}%`;
    }
    if (quizPhaseTag) quizPhaseTag.textContent = item.phase;
    if (hudSetText) hudSetText.textContent = item.setName;

    // Highlight CEFR ladder pill in header bar
    document.querySelectorAll('.ladder-pill').forEach(pill => pill.classList.remove('active-ladder'));
    if (item.set === 1) {
      document.getElementById('ladderPillA')?.classList.add('active-ladder');
    } else if (item.set === 2) {
      document.getElementById('ladderPillB1')?.classList.add('active-ladder');
    } else {
      document.getElementById('ladderPillB2')?.classList.add('active-ladder');
    }

    // Question text
    if (quizQuestionText) quizQuestionText.textContent = item.q;

    // Options grid
    if (quizOptionsGrid) {
      quizOptionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      item.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        if (userAnswers[idx] === optIdx) {
          btn.classList.add('is-selected');
        }

        btn.innerHTML = `
          <span class="quiz-option-badge">${letters[optIdx]}</span>
          <span class="quiz-option-label">${optText}</span>
        `;

        btn.addEventListener('click', () => {
          selectOption(idx, optIdx);
        });

        quizOptionsGrid.appendChild(btn);
      });
    }

    // Navigation buttons state
    if (quizPrevBtn) quizPrevBtn.disabled = idx === 0;
    if (quizNextBtn) {
      if (idx === levelTestQuestions.length - 1) {
        quizNextBtn.innerHTML = `<span>See Level</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      } else {
        quizNextBtn.innerHTML = `<span>Next</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      }
    }
  }

  function selectOption(qIdx, optIdx) {
    userAnswers[qIdx] = optIdx;

    // Highlight selected button
    if (quizOptionsGrid) {
      const allBtns = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
      allBtns.forEach((b, i) => {
        b.classList.toggle('is-selected', i === optIdx);
      });
    }

    // Auto-advance after 180ms
    setTimeout(() => {
      if (qIdx < levelTestQuestions.length - 1) {
        renderQuestion(qIdx + 1);
      } else {
        calculateAndShowResult();
      }
    }, 180);
  }

  // Developer Note: INTERNAL SCORING ONLY
  // Never display points, marks, or negative language!
  function calculateAndShowResult() {
    stopTimer();

    let internalScore = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans !== null && ans === levelTestQuestions[idx].ansIndex) {
        internalScore += levelTestQuestions[idx].pts;
      }
    });

    let assignedTierKey = 'basics';
    if (internalScore >= 25) {
      assignedTierKey = 'mastery';
    } else if (internalScore >= 17) {
      assignedTierKey = 'vocabulary';
    } else if (internalScore >= 9) {
      assignedTierKey = 'fluency';
    } else {
      assignedTierKey = 'basics';
    }

    const tier = levelTiers[assignedTierKey];

    // Populate result elements
    if (resultTierTitle) resultTierTitle.textContent = tier.badgeText;
    if (resultMantraTitle) resultMantraTitle.textContent = tier.mantra;
    if (resultMantraDesc) resultMantraDesc.textContent = tier.desc;

    // Highlight the ladder in result card
    document.querySelectorAll('.res-ladder-step').forEach(step => step.classList.remove('tier-earned'));
    const earnedStepEl = document.getElementById(tier.ladderId);
    if (earnedStepEl) earnedStepEl.classList.add('tier-earned');

    // Switch stage views
    if (hudStageQuiz) hudStageQuiz.style.display = 'none';
    if (hudStageResult) hudStageResult.style.display = 'block';

    // Update set badge
    if (hudSetText) hudSetText.textContent = `Completed • ${tier.badgeText}`;
  }

  function openLevelTestHUD() {
    if (!hudCockpitDrawer) return;
    hudCockpitDrawer.classList.add('hud-open');
    hudCockpitDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('hud-active');

    // Reset to Q1
    currentQIdx = 0;
    userAnswers = new Array(levelTestQuestions.length).fill(null);
    if (hudStageQuiz) hudStageQuiz.style.display = 'block';
    if (hudStageResult) hudStageResult.style.display = 'none';

    renderQuestion(0);
  }

  function closeLevelTestHUD() {
    if (!hudCockpitDrawer) return;
    hudCockpitDrawer.classList.remove('hud-open');
    hudCockpitDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('hud-active');
    stopTimer();
  }

  // Event Listeners
  if (levelTestHeroBtn) {
    levelTestHeroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLevelTestHUD();
    });
  }

  if (hudDismissBtn) {
    hudDismissBtn.addEventListener('click', () => {
      closeLevelTestHUD();
    });
  }

  if (quizPrevBtn) {
    quizPrevBtn.addEventListener('click', () => {
      if (currentQIdx > 0) renderQuestion(currentQIdx - 1);
    });
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (currentQIdx < levelTestQuestions.length - 1) {
        renderQuestion(currentQIdx + 1);
      } else {
        calculateAndShowResult();
      }
    });
  }

  if (resultRetakeBtn) {
    resultRetakeBtn.addEventListener('click', () => {
      openLevelTestHUD();
    });
  }

  if (resultCohortBtn) {
    resultCohortBtn.addEventListener('click', () => {
      closeLevelTestHUD();
    });
  }

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hudCockpitDrawer && hudCockpitDrawer.classList.contains('hud-open')) {
      closeLevelTestHUD();
    }
  });

});
