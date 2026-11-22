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
      startCarouselTimer();
    });
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      setSlide(idx);
      startCarouselTimer();
    });
  });

  startCarouselTimer();

  // --- 2.2 Boutique Courses Syllabus Dossier Modal Controller ---
  const coursesData = {
    junior: {
      age: 'AGES 6 – 10',
      title: 'Junior Articulators Studio',
      tagline: 'Foundational Spoken Cadence, Storytelling & Phonics',
      duration: '12 Weeks • 24 Studio Hours',
      focusKey: 'pronunciation',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 3',
          title: 'Acoustic Phonetics & Vocal Projection',
          desc: 'Breaking hesitation barriers, correcting vowel articulation, and training diaphragmatic breath support through playful sound drills.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 4 – 6',
          title: 'Thought-to-Speech Sentence Architecture',
          desc: 'Eliminating mental mother-tongue translation. Students learn to frame full spontaneous English sentences through rapid picture prompts.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 7 – 9',
          title: 'Expressive Storytelling & Conversational Poise',
          desc: 'Mastering voice modulation, natural pacing, and small-group interactive dialogue in a supportive, zero-judgment studio setting.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 10 – 12',
          title: 'Live Studio Showcase & Audio Portfolio',
          desc: 'Solo storytelling presentation in the atelier and graduation speech review. Audio progress dossier shared directly with parents.'
        }
      ],
      outcomes: [
        'Zero Hesitation in Peer Dialogue',
        'Natural Phonetic Articulation',
        'Self-Correcting Grammar Reflex',
        'Stage Poise & Vocal Presence'
      ]
    },
    scholar: {
      age: 'AGES 11 – 17',
      title: 'Scholar Fluency & Debate Lab',
      tagline: 'Applied Grammar, Public Speaking & Academic Poise',
      duration: '12 Weeks • 24 Studio Hours',
      focusKey: 'fluency',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 3',
          title: 'MTI Neutralization & Acoustic Cadence',
          desc: 'Neutralizing regional accent and mother-tongue phonetic influence. Mastering natural English rhythm, syllable stress, and thought-chunking.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 4 – 6',
          title: 'Applied Grammar & Rhetorical Syntax',
          desc: 'Internalizing sophisticated sentence transitions, complex clauses, and precise academic vocabulary through active verbal discourse.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 7 – 9',
          title: 'Extempore Drills & Parliamentary Debate',
          desc: 'Impromptu 2-minute speeches, cross-examination drills, defending arguments, and handling audience counter-questions with composure.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 10 – 12',
          title: 'Formal Elocution & Audio Graduation Audit',
          desc: 'Comprehensive persuasive speech performance, recorded acoustic evaluation, and personalized lifelong fluency blueprint.'
        }
      ],
      outcomes: [
        'Commanding Impromptu Speaking',
        'Neutralized Regional Diction',
        'Structured Academic Debate Poise',
        'Advanced Lexical Precision'
      ]
    },
    executive: {
      age: 'AGES 18+ / ADULTS',
      title: 'Executive Diction & Rhetoric',
      tagline: 'Professional Boardroom Poise & Spoken Nuance',
      duration: '8 Weeks • 16 Intensive Studio Hours',
      focusKey: 'all',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 2',
          title: 'Executive Speech Audit & Pitch Calibration',
          desc: 'Diagnostic voice recording analysis, eliminating filler words, vocal fry, and stabilizing pitch for authoritative delivery.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 3 – 4',
          title: 'Strategic Boardroom Dialogue & Diplomatic Nuance',
          desc: 'Mastering assertive yet graceful phrasing, diplomatic pushback, and cross-cultural corporate communication subtleties.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 5 – 6',
          title: 'High-Stakes Interview & Pitch Articulation',
          desc: 'Live simulation of senior leadership interviews, investor pitches, and spontaneous crisis communication under observation.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 7 – 8',
          title: 'Keynote Delivery & Audio Dossier Sign-Off',
          desc: 'Delivering an executive keynote in the atelier, final acoustic speech audit, and tailored executive articulation roadmap.'
        }
      ],
      outcomes: [
        'Boardroom Verbal Authority',
        'Interview & Negotiation Mastery',
        'Polished International Cadence',
        'Strategic Linguistic Diplomatic Nuance'
      ]
    },
    ielts: {
      age: 'ACADEMIC • AGES 16+',
      title: 'IELTS & Academic Fluency Studio',
      tagline: 'Band 8.0+ Speaking & Structured Cognitive Argumentation',
      duration: '10 Weeks • 20 Studio Hours',
      focusKey: 'all',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 2',
          title: 'Lexical Resource & Fluency Descriptors',
          desc: 'Internalizing advanced idiomatic vocabulary, collocations, and spontaneous topic transition without hesitation markers.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 3 – 5',
          title: 'Grammatical Range & Acoustic Accuracy',
          desc: 'Mastering mixed conditionals, inversions, and complex subordinate structures under strict 2-minute speaking clock.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 6 – 8',
          title: 'Part 3 Deep Discourse & Abstract Rhetoric',
          desc: 'Handling philosophical, sociological, and abstract examiner counter-questions with poise, depth, and coherence.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 9 – 10',
          title: 'Live Examiner Simulation & Mock Score Sign-Off',
          desc: 'Full diagnostic audio interview with certified examiner breakdown across all 4 CEFR band criteria.'
        }
      ],
      outcomes: [
        'Target Band 8.0+ Speaking Cadence',
        'Zero Pause Fluency Reflex',
        'Sophisticated Academic Discourse',
        'Error-Free Complex Syntax'
      ]
    },
    oratory: {
      age: 'WEEKEND • PROFESSIONALS',
      title: 'Corporate Oratory & Stage Poise Lab',
      tagline: 'TEDx-Style Keynotes, Spoken Grace & Voice Resonance',
      duration: '8 Weeks • 16 Intensive Studio Hours',
      focusKey: 'pronunciation',
      phases: [
        {
          num: 'PHASE 01',
          weeks: 'Weeks 1 – 2',
          title: 'Diaphragmatic Breath & Acoustic Resonance',
          desc: 'Eliminating vocal strain, stabilizing pitch modulation, and building warm acoustic room presence without a microphone.'
        },
        {
          num: 'PHASE 02',
          weeks: 'Weeks 3 – 4',
          title: 'Rhetorical Storytelling & Cognitive Hooks',
          desc: 'Structuring speeches using the hero arc, sensory metaphors, and persuasive pauses to hold room attention effortlessly.'
        },
        {
          num: 'PHASE 03',
          weeks: 'Weeks 5 – 6',
          title: 'Stage Mechanics, Gaze & Nonverbal Cadence',
          desc: 'Mastering open stage movement, expressive hand choreography, and micro-expressions that project undeniable credibility.'
        },
        {
          num: 'PHASE 04',
          weeks: 'Weeks 7 – 8',
          title: 'Atelier Keynote Showcase & Audio Portfolio',
          desc: 'Delivering a live 8-minute keynote to studio cohort with high-definition audio critique and personal speaking signature.'
        }
      ],
      outcomes: [
        'Commanding Keynote & Stage Presence',
        'Warm Resonant Vocal Projection',
        'Compelling Narrative Persuasion',
        'Fearless Spontaneous Stage Poise'
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

  // --- 3. A-Z BIG Alphabet Rain Engine ---
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();
    width = canvas.width = rect.width * (window.devicePixelRatio || 1);
    height = canvas.height = rect.height * (window.devicePixelRatio || 1);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // 4 Colors matching reference image — Purple, Blue, Cyan, Lavender
  const oceanPalette = [
    { front: '#8B5CF6', depth: '#6D28D9', highlight: '#DDD6FE' }, // Vibrant Purple (like 'A' in ref)
    { front: '#3B82F6', depth: '#1D4ED8', highlight: '#BFDBFE' }, // Royal Blue (like 'B' in ref)
    { front: '#22D3EE', depth: '#0891B2', highlight: '#CFFAFE' }, // Cyan/Teal (like 'C' in ref)
    { front: '#A78BFA', depth: '#7C3AED', highlight: '#EDE9FE' }, // Soft Lavender (like 'D/E' in ref)
  ];

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Settings — 6 letters max, graceful drops, fast 1.8s rest fade so floor is NEVER crowded
  const MAX_ON_SCREEN = 6;
  const SPAWN_INTERVAL_MS = 1350;
  const FADE_AFTER_REST_MS = 1800;
  const FADE_DURATION = 650;

  // Splash Particle
  class SplashDroplet {
    constructor(x, y, color) {
      const dpr = window.devicePixelRatio || 1;
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 10 * dpr;
      this.vy = -(Math.random() * 7 + 3) * dpr;
      this.gravity = 0.3 * dpr;
      this.radius = (Math.random() * 3.5 + 2) * dpr;
      this.alpha = 1;
      this.color = color || 'rgba(0, 157, 196, 0.6)';
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.028;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = 'rgba(0, 157, 196, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  // Ripple Ring
  class LiquidRipple {
    constructor(x, y) {
      const dpr = window.devicePixelRatio || 1;
      this.x = x;
      this.y = y;
      this.rX = 10 * dpr;
      this.rY = 4 * dpr;
      this.alpha = 0.7;
      this.speed = (Math.random() * 1.5 + 2.5) * dpr;
    }

    update() {
      this.rX += this.speed;
      this.rY += this.speed * 0.3;
      this.alpha -= 0.018;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.rX, this.rY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 157, 196, 0.4)';
      ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
      ctx.stroke();
      ctx.restore();
    }
  }

  const splashes = [];
  const ripples = [];

  function triggerSplash(x, y, intensity, color) {
    const dpr = window.devicePixelRatio || 1;
    const count = Math.min(16, Math.floor(10 * intensity));
    for (let i = 0; i < count; i++) {
      splashes.push(new SplashDroplet(
        x + (Math.random() - 0.5) * 40 * dpr, y, color
      ));
    }
    ripples.push(new LiquidRipple(x, y));
  }

  // --- Ambient Floating Ocean Micro-Bubbles ---
  // Fills the stage with gentle atmospheric light particles so it's never empty
  class AmbientBubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const dpr = window.devicePixelRatio || 1;
      this.x = Math.random() * (width || 600);
      this.y = initial ? Math.random() * (height || 520) : (height || 520) + 15 * dpr;
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
  for (let b = 0; b < 26; b++) {
    ambientBubbles.push(new AmbientBubble());
  }

  // BIG 3D Clay Alphabet with full lifecycle
  class ClayAlphabet {
    constructor(charData, x, y) {
      this.dpr = window.devicePixelRatio || 1;
      this.char = charData.char;
      this.frontColor = charData.front;
      this.depthColor = charData.depth;
      this.highlightColor = charData.highlight;

      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 3 * this.dpr;
      this.vy = (Math.random() * 1 + 0.5) * this.dpr;

      this.gravity = 0.22 * this.dpr;
      this.bounce = 0.55;
      this.friction = 0.986;

      // Good visible size — 68px to 88px
      this.fontSize = (Math.random() * 20 + 68) * this.dpr;
      this.extrusion = 14 * this.dpr;
      this.radius = this.fontSize * 0.42;

      this.rotation = (Math.random() - 0.5) * 0.35;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;

      this.scaleX = 1;
      this.scaleY = 1;
      this.isDragging = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
      this.idlePhase = Math.random() * Math.PI * 2;

      // Lifecycle: falling → resting → fading → dead
      this.state = 'falling';
      this.restStartTime = 0;
      this.fadeAlpha = 1;
      this.dead = false;
      this.hasLanded = false;

      // Entry animation — start slightly scaled up then settle
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
        return;
      }

      // Physics
      this.vy += this.gravity;
      this.vx *= this.friction;
      this.vy *= 0.993;

      this.x += this.vx;
      this.y += this.vy;

      this.rotation += this.rotSpeed;
      this.rotSpeed *= 0.992;

      // Anti-Clumping Repulsion between letters on the ground
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

      // Floor Collision
      const floor = height - 60 * this.dpr;
      if (this.y > floor) {
        const impactSpeed = Math.abs(this.vy);
        this.y = floor;
        this.vy = -this.vy * this.bounce;
        this.vx *= 0.82;
        this.rotSpeed *= 0.75;

        if (impactSpeed > 2 * this.dpr) {
          triggerSplash(
            this.x, floor + 10 * this.dpr,
            impactSpeed / (4.5 * this.dpr),
            this.frontColor + '70'
          );
          this.scaleX = 1 + impactSpeed * 0.018;
          this.scaleY = Math.max(0.8, 1 - impactSpeed * 0.018);
        }

        if (!this.hasLanded && impactSpeed < 1.4 * this.dpr) {
          this.hasLanded = true;
          this.state = 'resting';
          this.restStartTime = now;
        }

        if (this.hasLanded) {
          this.y = floor + Math.sin(this.idlePhase) * 1.2 * this.dpr;
        }
      }

      // Wall Collision
      const halfW = this.radius;
      if (this.x < halfW) {
        this.x = halfW;
        this.vx = -this.vx * 0.6;
      } else if (this.x > width - halfW) {
        this.x = width - halfW;
        this.vx = -this.vx * 0.6;
      }

      // Ceiling
      if (this.y < -this.radius * 2) {
        // Allow letters to be above canvas when spawning
      }

      // Lifecycle transitions
      if (this.state === 'resting' && (now - this.restStartTime) > FADE_AFTER_REST_MS) {
        this.state = 'fading';
      }

      if (this.state === 'fading') {
        this.fadeAlpha -= (16.67 / FADE_DURATION);
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

      // Floor drop-shadow
      const floor = height - 55 * this.dpr;
      const distFromFloor = Math.max(0, floor - this.y);
      const shadowFactor = Math.max(0, 1 - distFromFloor / (300 * this.dpr));

      if (shadowFactor > 0.02) {
        const shadowRx = (this.radius * (0.75 + (1 - shadowFactor) * 0.5)) * this.scaleX;
        const shadowRy = shadowRx * 0.25;
        ctx.beginPath();
        ctx.ellipse(this.x, floor + 15 * this.dpr, shadowRx, shadowRy, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 70, 95, ${shadowFactor * 0.2 * this.fadeAlpha})`;
        ctx.fill();
      }

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
  let spawnLane = 0;

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
    // 4 distinct lanes across width so letters drop across the entire stage
    const lanes = [0.18, 0.38, 0.58, 0.78];
    const laneX = lanes[spawnLane % lanes.length] * width;
    spawnLane++;

    const x = Math.max(width * 0.12, Math.min(width * 0.88, laneX + (Math.random() - 0.5) * (width * 0.1)));
    const y = -(Math.random() * 70 + 50) * dpr;

    lettersPool.push(new ClayAlphabet(charData, x, y));
  }

  // Initial batch — 3 letters staggered cleanly across lanes
  function spawnInitialBatch() {
    const dpr = window.devicePixelRatio || 1;
    const lanes = [0.25, 0.50, 0.75];
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

      const x = lanes[i] * width + (Math.random() - 0.5) * (width * 0.05);
      const y = -(Math.random() * 50 + 30) * dpr - (i * 80 * dpr);

      lettersPool.push(new ClayAlphabet(charData, x, y));
    }
  }

  spawnInitialBatch();

  // --- Drag & Toss ---
  let draggedLetter = null;
  let lastX = 0;
  let lastY = 0;
  let tossVx = 0;
  let tossVy = 0;

  stage.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
    const clickY = (e.clientY - rect.top) * (window.devicePixelRatio || 1);

    for (let i = lettersPool.length - 1; i >= 0; i--) {
      const letter = lettersPool[i];
      if (letter.dead) continue;
      const dist = Math.hypot(clickX - letter.x, clickY - letter.y);

      if (dist < letter.radius * 1.3) {
        draggedLetter = letter;
        draggedLetter.isDragging = true;
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
    if (!draggedLetter) return;

    const rect = canvas.getBoundingClientRect();
    const curX = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
    const curY = (e.clientY - rect.top) * (window.devicePixelRatio || 1);

    tossVx = (curX - lastX) * 0.9;
    tossVy = (curY - lastY) * 0.9;

    draggedLetter.x = curX + draggedLetter.dragOffsetX;
    draggedLetter.y = curY + draggedLetter.dragOffsetY;

    lastX = curX;
    lastY = curY;
  });

  window.addEventListener('mouseup', () => {
    if (draggedLetter) {
      draggedLetter.isDragging = false;
      draggedLetter.vx = tossVx * 1.25;
      draggedLetter.vy = tossVy * 1.25;
      draggedLetter.rotSpeed = tossVx * 0.015;
      draggedLetter = null;
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

    // 0. Update & Draw Ambient Ocean Micro-Bubbles (Background Atmosphere)
    for (let b = 0; b < ambientBubbles.length; b++) {
      ambientBubbles[b].update();
      ambientBubbles[b].draw();
    }

    // Spawn new letters
    if (timestamp - lastSpawnTime > SPAWN_INTERVAL_MS) {
      spawnLetter(timestamp);
      lastSpawnTime = timestamp;
    }

    // Ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.update();
      r.draw();
      if (r.alpha <= 0) ripples.splice(i, 1);
    }

    // Letters
    for (let i = lettersPool.length - 1; i >= 0; i--) {
      const letter = lettersPool[i];
      letter.update(timestamp, lettersPool);
      letter.draw();
      if (letter.dead && !letter.isDragging) {
        lettersPool.splice(i, 1);
      }
    }

    // Splashes
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      s.update();
      s.draw();
      if (s.alpha <= 0) splashes.splice(i, 1);
    }

    canvasFrameId = requestAnimationFrame(animate);
  }

  // Canvas Intersection Observer — pause physics canvas when user scrolls down
  if ('IntersectionObserver' in window && stage) {
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isCanvasActive = entry.isIntersecting;
        if (isCanvasActive && !canvasFrameId) {
          canvasFrameId = requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.05 });
    canvasObserver.observe(stage);
  }

  canvasFrameId = requestAnimationFrame(animate);

  // --- 4. Sticky Frosted Header & Scroll Controller (Zero Jank / 120 FPS Native) ---
  const studioNav = document.getElementById('studioNav');
  const navScrollProgress = document.getElementById('navScrollProgress');
  const navLinkHero = document.getElementById('navLinkHero');
  const navLinkCourses = document.getElementById('navLinkCourses');
  const navLinkLearn = document.getElementById('navLinkLearn');
  const navLinkTestimonials = document.getElementById('navLinkTestimonials');
  const coursesSection = document.getElementById('coursesSection');
  const learnSection = document.getElementById('learnSection');
  const testimonialsSection = document.getElementById('testimonialsSection');
  const coursesHeaderBlock = document.getElementById('coursesHeaderBlock');
  const coursesGrid = document.querySelector('.courses-grid');
  const coursesGridDuo = document.querySelector('.courses-grid-duo');
  const learnCardsTrack = document.getElementById('learnCardsTrack');
  const orbLeft = document.getElementById('orbLeft');
  const orbRight = document.getElementById('orbRight');

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

    // C. Active Section Indicator Spy
    if (navLinkHero && navLinkCourses) {
      const coursesTop = coursesSection ? coursesSection.offsetTop - 240 : 800;
      const learnTop = learnSection ? learnSection.offsetTop - 240 : 1800;
      const testTop = testimonialsSection ? testimonialsSection.offsetTop - 240 : 2700;

      if (testimonialsSection && scrollY >= testTop) {
        if (navLinkTestimonials) navLinkTestimonials.classList.add('active');
        if (navLinkLearn) navLinkLearn.classList.remove('active');
        if (navLinkCourses) navLinkCourses.classList.remove('active');
        if (navLinkHero) navLinkHero.classList.remove('active');
      } else if (learnSection && scrollY >= learnTop) {
        if (navLinkLearn) navLinkLearn.classList.add('active');
        if (navLinkTestimonials) navLinkTestimonials.classList.remove('active');
        if (navLinkCourses) navLinkCourses.classList.remove('active');
        if (navLinkHero) navLinkHero.classList.remove('active');
      } else if (coursesSection && scrollY >= coursesTop) {
        navLinkCourses.classList.add('active');
        if (navLinkTestimonials) navLinkTestimonials.classList.remove('active');
        if (navLinkLearn) navLinkLearn.classList.remove('active');
        if (navLinkHero) navLinkHero.classList.remove('active');
      } else {
        navLinkHero.classList.add('active');
        if (navLinkTestimonials) navLinkTestimonials.classList.remove('active');
        if (navLinkCourses) navLinkCourses.classList.remove('active');
        if (navLinkLearn) navLinkLearn.classList.remove('active');
      }
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

    // Courses Grid (Row 1 Fan-Out) Observer
    if (coursesGrid) {
      const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            coursesGrid.classList.add('fanned-out');
          } else if (entry.boundingClientRect.top > 0) {
            coursesGrid.classList.remove('fanned-out');
          }
        });
      }, { threshold: 0.15 });
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
      }, { threshold: 0.15 });
      duoObserver.observe(coursesGridDuo);
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
  } else {
    // Fallback if IntersectionObserver not supported
    if (coursesHeaderBlock) coursesHeaderBlock.classList.add('revealed');
    if (coursesGrid) coursesGrid.classList.add('fanned-out');
    if (coursesGridDuo) coursesGridDuo.classList.add('fanned-out');
    if (learnSection) learnSection.classList.add('revealed');
    if (learnCardsTrack) learnCardsTrack.classList.add('fanned-out');
  }

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

  // ==========================================================================
  // SECTION 4: ATELIER VOICES — OCEAN BLUE CINEMA RUNWAY CONTROLLER
  // ==========================================================================

  const cinemaRunwayWrapper = document.getElementById('cinemaRunwayWrapper');
  const cinemaRunwayTrack = document.getElementById('cinemaRunwayTrack');
  const runwayCards = Array.from(document.querySelectorAll('.runway-cinema-card'));
  const runwayPrevBtn = document.getElementById('runwayPrevBtn');
  const runwayNextBtn = document.getElementById('runwayNextBtn');
  const runwayActiveNum = document.getElementById('runwayActiveNum');
  const runwayProgressFill = document.getElementById('runwayProgressFill');
  const runwayStoryTabs = document.getElementById('runwayStoryTabs');
  const runwayTabs = Array.from(document.querySelectorAll('.runway-tab'));
  const testimonialsHeaderBlock = document.getElementById('testimonialsHeaderBlock');

  let activeCardIndex = 0;
  let isRunwaySectionVisible = false;

  // --- Update Runway Progress & Active Card on Scroll ---
  function updateRunwayState() {
    if (!cinemaRunwayWrapper || runwayCards.length === 0) return;

    const wrapperRect = cinemaRunwayWrapper.getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    runwayCards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(wrapperCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeCardIndex) {
      activeCardIndex = closestIdx;

      // Update Active Card Class
      runwayCards.forEach((c, i) => {
        const isActive = i === activeCardIndex;
        c.classList.toggle('active', isActive);

        const video = c.querySelector('.runway-video-player');
        if (video) {
          if (isActive && isRunwaySectionVisible) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      });

      // Update Active Number Badge
      if (runwayActiveNum) {
        runwayActiveNum.textContent = String(activeCardIndex + 1).padStart(2, '0');
      }

      // Update Story Tabs
      runwayTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === activeCardIndex);
      });
    }

    // Update Progress Bar
    const maxScroll = cinemaRunwayWrapper.scrollWidth - cinemaRunwayWrapper.clientWidth;
    if (maxScroll > 0 && runwayProgressFill) {
      const pct = (cinemaRunwayWrapper.scrollLeft / maxScroll) * 100;
      runwayProgressFill.style.width = `${Math.max(15, Math.min(100, pct))}%`;
    }
  }

  // Smooth scroll listener with RAF throttle
  let runwayScrollTicking = false;
  if (cinemaRunwayWrapper) {
    cinemaRunwayWrapper.addEventListener('scroll', () => {
      if (!runwayScrollTicking) {
        requestAnimationFrame(() => {
          updateRunwayState();
          runwayScrollTicking = false;
        });
        runwayScrollTicking = true;
      }
    }, { passive: true });
  }

  // --- Scroll to Card Index Helper ---
  function scrollToCard(index) {
    if (index < 0 || index >= runwayCards.length || !cinemaRunwayWrapper) return;
    const targetCard = runwayCards[index];
    const wrapperWidth = cinemaRunwayWrapper.clientWidth;
    const cardWidth = targetCard.offsetWidth;
    const targetLeft = targetCard.offsetLeft - (wrapperWidth - cardWidth) / 2;

    cinemaRunwayWrapper.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth'
    });
  }

  // --- Navigation Buttons (Prev / Next) ---
  if (runwayPrevBtn) {
    runwayPrevBtn.addEventListener('click', () => {
      const prevIdx = Math.max(0, activeCardIndex - 1);
      scrollToCard(prevIdx);
    });
  }

  if (runwayNextBtn) {
    runwayNextBtn.addEventListener('click', () => {
      const nextIdx = Math.min(runwayCards.length - 1, activeCardIndex + 1);
      scrollToCard(nextIdx);
    });
  }

  // --- Story Tab Clicks ---
  runwayTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        scrollToCard(idx);
      }
    });
  });

  // --- Click on Card Body to Center It ---
  runwayCards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // Don't override if clicking the play HUD specifically
      if (!e.target.closest('.video-action-hud')) {
        if (idx !== activeCardIndex) {
          scrollToCard(idx);
        }
      }
    });

    // Interactive Video & Audio HUD Click Handler
    const actionHud = card.querySelector('.video-action-hud');
    const video = card.querySelector('.runway-video-player');
    const hudText = card.querySelector('.hud-action-text');
    const hudGlyph = card.querySelector('.hud-play-glyph');

    if (actionHud && video) {
      actionHud.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play().then(() => {
            if (hudGlyph) hudGlyph.textContent = '⏸';
            if (hudText) hudText.textContent = 'Pause Audio';
          }).catch(() => {});
        } else if (video.muted) {
          // Unmute for crystal clear sound
          video.muted = false;
          if (hudGlyph) hudGlyph.textContent = '🔊';
          if (hudText) hudText.textContent = 'Mute Audio';
        } else {
          // Mute again
          video.muted = true;
          if (hudGlyph) hudGlyph.textContent = '▶';
          if (hudText) hudText.textContent = 'Preview Audio';
        }
      });
    }
  });

  // --- Mouse Wheel Horizontal Scrolling on Runway ---
  if (cinemaRunwayWrapper) {
    cinemaRunwayWrapper.addEventListener('wheel', (e) => {
      // If user scrolls vertically over the runway, translate to horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = cinemaRunwayWrapper.scrollLeft <= 0;
        const atEnd = cinemaRunwayWrapper.scrollLeft >= (cinemaRunwayWrapper.scrollWidth - cinemaRunwayWrapper.clientWidth - 2);

        // Only hijack if runway has room to scroll in that direction
        if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
          e.preventDefault();
          cinemaRunwayWrapper.scrollLeft += e.deltaY * 0.9;
        }
      }
    }, { passive: false });
  }

  // --- IntersectionObserver for Section 4 (Header Reveal + Auto-Play Muted) ---
  if ('IntersectionObserver' in window) {
    if (testimonialsHeaderBlock) {
      const headerObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonialsHeaderBlock.classList.add('revealed');
          } else if (entry.boundingClientRect.top > 0) {
            testimonialsHeaderBlock.classList.remove('revealed');
          }
        });
      }, { threshold: 0.2 });
      headerObs.observe(testimonialsHeaderBlock);
    }

    if (testimonialsSection) {
      const sectionObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isRunwaySectionVisible = entry.isIntersecting;
          if (entry.isIntersecting) {
            testimonialsSection.classList.add('revealed');
            // Play active card video
            const activeCard = runwayCards[activeCardIndex];
            if (activeCard) {
              const video = activeCard.querySelector('.runway-video-player');
              if (video) video.play().catch(() => {});
            }
          } else {
            // Pause all videos when scrolled out of view (saves battery & GPU)
            runwayCards.forEach((c) => {
              const video = c.querySelector('.runway-video-player');
              if (video && !video.paused) video.pause();
            });
          }
        });
      }, { threshold: 0.15 });
      sectionObs.observe(testimonialsSection);
    }
  }

  // Initial State Check
  updateRunwayState();

});
