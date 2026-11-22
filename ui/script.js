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
    // 30% Coverage: Sea water starts at 70% height from top (covers bottom 30% of viewport)
    const baseY = height * 0.70;
    const step = 8 * dpr;

    if (layer === 'back') {
      // 1. Back Swell (Distant Soft Ocean Layer)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width + step; x += step) {
        const y = baseY - 28 * dpr + getSeaWaveHeight(x, time, 'back') * dpr;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const backGrad = ctx.createLinearGradient(0, baseY - 60 * dpr, 0, height);
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
        const y = baseY - 14 * dpr + getSeaWaveHeight(x, time, 'mid') * dpr;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const midGrad = ctx.createLinearGradient(0, baseY - 40 * dpr, 0, height);
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
        const y = baseY + getSeaWaveHeight(x, time, 'front') * dpr;
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

      // Ocean Water Surface Collision & Archimedes Buoyancy (30% Bottom Coverage)
      const baseY = height * 0.70;
      const waterY = baseY + getSeaWaveHeight(this.x, now, 'front') * this.dpr;
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

      // Water reflection / shadow (30% Bottom Coverage)
      const baseY = height * 0.70;
      const waterY = baseY + getSeaWaveHeight(this.x, performance.now(), 'front') * this.dpr;
      const distFromWater = Math.max(0, waterY - this.y);
      const shadowFactor = Math.max(0, 1 - distFromWater / (250 * this.dpr));

      if (shadowFactor > 0.05) {
        const shadowRx = (this.radius * 0.8) * this.scaleX;
        const shadowRy = shadowRx * 0.28;
        ctx.beginPath();
        ctx.ellipse(this.x, waterY, shadowRx, shadowRy, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 110, 140, ${shadowFactor * 0.25 * this.fadeAlpha})`;
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
      const minX = (stageRect.left - canvasRect.left + stageRect.width * 0.15) * dpr;
      const maxX = (stageRect.left - canvasRect.left + stageRect.width * 0.85) * dpr;
      x = minX + Math.random() * (maxX - minX);
      y = (stageRect.top - canvasRect.top + (Math.random() - 0.5) * 40) * dpr;
    } else {
      x = (width * 0.25) + (Math.random() - 0.5) * (width * 0.2);
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
        const laneOffsets = [0.25, 0.5, 0.75];
        x = (stageRect.left - canvasRect.left + stageRect.width * laneOffsets[i]) * dpr;
        y = (stageRect.top - canvasRect.top - (i * 90) + 30) * dpr;
      } else {
        x = (0.2 + i * 0.12) * width;
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
  const navLinkLearn = document.getElementById('navLinkLearn') || navLinkBlogs;
  const navLinkTestimonials = document.getElementById('navLinkTestimonials');
  const navLinkImpacts = document.getElementById('navLinkImpacts');
  const navLinkAbout = document.getElementById('navLinkAbout');
  const coursesSection = document.getElementById('coursesSection');
  const impactSection = document.getElementById('impactSection');
  const learnSection = document.getElementById('learnSection');
  const testimonialsSection = document.getElementById('testimonialsSection');
  const aboutSection = document.getElementById('aboutSection');
  const coursesHeaderBlock = document.getElementById('coursesHeaderBlock');
  const coursesGrid = document.querySelector('.courses-grid');
  const coursesGridDuo = document.querySelector('.courses-grid-duo');
  const learnCardsTrack = document.getElementById('learnCardsTrack');
  const orbLeft = document.getElementById('orbLeft');
  const orbRight = document.getElementById('orbRight');

  const navLinksArray = [navLinkHome, navLinkCourses, navLinkBlogs, navLinkLearn, navLinkTestimonials, navLinkImpacts, navLinkAbout].filter(Boolean);

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

    // C. Active Section Indicator Spy
    const aboutTop = aboutSection ? aboutSection.offsetTop - 280 : Infinity;
    const testTop = testimonialsSection ? testimonialsSection.offsetTop - 280 : Infinity;
    const impactsTop = impactSection ? impactSection.offsetTop - 280 : Infinity;
    const blogsTop = learnSection ? learnSection.offsetTop - 280 : Infinity;
    const coursesTop = coursesSection ? coursesSection.offsetTop - 280 : 800;

    if (scrollY >= aboutTop) {
      setActiveNavLink(navLinkAbout);
    } else if (scrollY >= testTop) {
      setActiveNavLink(navLinkTestimonials);
    } else if (scrollY >= impactsTop) {
      setActiveNavLink(navLinkImpacts);
    } else if (scrollY >= blogsTop) {
      setActiveNavLink(navLinkBlogs || navLinkLearn);
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

  // --- 8. 12-Card Fast Continuous Non-Stop Interactive Gallery Carousel ---
  const galleryViewport = document.getElementById('galleryViewport');
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');

  if (galleryViewport && galleryTrack) {
    let isPaused = false;
    let autoScrollRaf = null;
    const scrollSpeed = 5.0; // Fast and dynamic continuous speed
    let resumeTimeout = null;

    // Clone cards once to create an infinite wrap loop
    const originalCards = Array.from(galleryTrack.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      galleryTrack.appendChild(clone);
    });

    // A. Fast Continuous Auto-Move Engine (Non-Stop, never pauses on hover)
    function autoScrollLoop() {
      if (!isPaused && galleryViewport) {
        galleryViewport.scrollLeft += scrollSpeed;
        const halfWidth = galleryTrack.scrollWidth / 2;
        if (galleryViewport.scrollLeft >= halfWidth) {
          galleryViewport.scrollLeft -= halfWidth;
        }
      }
      autoScrollRaf = requestAnimationFrame(autoScrollLoop);
    }
    autoScrollRaf = requestAnimationFrame(autoScrollLoop);

    function tempPause(duration = 800) {
      isPaused = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isPaused = false;
      }, duration);
    }

    // B. Interactive Arrow Navigation Buttons (Below images, right-aligned)
    const STEP_AMOUNT = 350;
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', () => {
        tempPause(600);
        galleryViewport.scrollBy({ left: -STEP_AMOUNT, behavior: 'smooth' });
      });
    }

    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', () => {
        tempPause(600);
        galleryViewport.scrollBy({ left: STEP_AMOUNT, behavior: 'smooth' });
      });
    }

    // C. Double Tap / Double Click Gesture (Forward or Backward)
    galleryViewport.addEventListener('dblclick', (e) => {
      tempPause(700);
      const rect = galleryViewport.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width / 2) {
        galleryViewport.scrollBy({ left: STEP_AMOUNT, behavior: 'smooth' });
      } else {
        galleryViewport.scrollBy({ left: -STEP_AMOUNT, behavior: 'smooth' });
      }
    });

    // Mobile double-tap detection
    let lastTapTime = 0;
    galleryViewport.addEventListener('touchend', (e) => {
      const currentTime = performance.now();
      const tapInterval = currentTime - lastTapTime;
      if (tapInterval < 320 && tapInterval > 0) {
        tempPause(700);
        const touch = e.changedTouches[0];
        const rect = galleryViewport.getBoundingClientRect();
        const tapX = touch.clientX - rect.left;
        if (tapX > rect.width / 2) {
          galleryViewport.scrollBy({ left: STEP_AMOUNT, behavior: 'smooth' });
        } else {
          galleryViewport.scrollBy({ left: -STEP_AMOUNT, behavior: 'smooth' });
        }
      }
      lastTapTime = currentTime;
    }, { passive: true });

    // D. Drag-to-Scroll Support (Cursor hover NEVER stops or pauses movement)
    let isDown = false;
    let startX = 0;
    let initialScroll = 0;

    galleryViewport.addEventListener('mousedown', (e) => {
      isDown = true;
      galleryViewport.classList.add('is-dragging');
      startX = e.pageX - galleryViewport.offsetLeft;
      initialScroll = galleryViewport.scrollLeft;
      isPaused = true;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        galleryViewport.classList.remove('is-dragging');
        isPaused = false;
      }
    });

    galleryViewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryViewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryViewport.scrollLeft = initialScroll - walk;
    });
  }

        // ==========================================================================
  // SECTION 4: ATELIER VOICES — APPLE STUDIO HORIZONTAL HORIZON
  // position:sticky + 400vh + translate3d driven by window scroll
  // ==========================================================================

  const stickyViewport = document.getElementById('testimonialsStickyViewport');
  const runwayViewport = document.getElementById('testimonialsRunwayViewport');
  const runwayTrack = document.getElementById('testimonialsRunwayTrack');
  const runwayCards = Array.from(document.querySelectorAll('.runway-card-unit'));
  const runwayCounterCurrent = document.getElementById('runwayCounterCurrent');
  const runwayScrubFill = document.getElementById('runwayScrubFill');
  const runwayPillTabs = document.querySelectorAll('.runway-pill-tab');
  const runwayPrevBtn = document.getElementById('runwayPrevBtn');
  const runwayNextBtn = document.getElementById('runwayNextBtn');
  const testimonialsHeaderBlock = document.getElementById('testimonialsHeaderBlock');
  
  // Note: testimonialsSection already declared at line ~1095 for scroll spy

  let activeRunwayIdx = 0;
  let isSectionVisible = false;
  const TOTAL_CARDS = runwayCards.length;
  
  // --- Check if we're in mobile/tablet mode (no sticky scroll) ---
  function isMobileMode() {
    return window.innerWidth <= 1120;
  }

  // --- Format Timecode TC HH:MM:SS:FF ---
  function formatTC(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const f = Math.floor((seconds % 1) * 24);
    const pad = (n) => String(n).padStart(2, '0');
    return `TC ${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)} // PALLAVARAM`;
  }

  // --- Update Active Card & Play Active Video ---
  function updateActiveCard(newIdx) {
    if (newIdx < 0 || newIdx >= TOTAL_CARDS) return;
    if (newIdx === activeRunwayIdx && runwayCards[newIdx]?.classList.contains('active')) return;
    activeRunwayIdx = newIdx;

    // Update Counter
    if (runwayCounterCurrent) {
      runwayCounterCurrent.textContent = String(newIdx + 1).padStart(2, '0');
    }

    // Update Scrub Fill
    if (runwayScrubFill) {
      const pct = ((newIdx + 1) / TOTAL_CARDS) * 100;
      runwayScrubFill.style.width = pct + '%';
    }

    // Update Pill Tabs
    runwayPillTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === newIdx);
    });

    // Update Card Active State & Video Conductor
    runwayCards.forEach((card, idx) => {
      const isActive = idx === newIdx;
      card.classList.toggle('active', isActive);

      const video = card.querySelector('.runway-video-elem');
      if (video) {
        if (isActive && isSectionVisible) {
          video.play().catch(() => {});
        } else if (!isActive) {
          if (!video.paused) video.pause();
        }
      }
    });
  }

  // ==========================================================================
  // CORE: Scroll-to-Horizontal Mapping (window.scroll -> translate3d on rail)
  // ==========================================================================
  let rafId = null;
  
  function handleScrollToHorizontal() {
    if (!testimonialsSection || !runwayTrack || !runwayViewport || isMobileMode()) return;

    const sectionTop = testimonialsSection.offsetTop;
    const sectionHeight = testimonialsSection.offsetHeight; // 400vh
    const viewportHeight = window.innerHeight; // 100vh
    const maxScroll = sectionHeight - viewportHeight; // 300vh of usable scroll
    const scrollInside = window.scrollY - sectionTop;
    
    // Clamp progress 0 to 1
    const progress = Math.max(0, Math.min(1, scrollInside / maxScroll));

    // Calculate how far the rail needs to translate
    const railWidth = runwayTrack.scrollWidth;
    const viewportWidth = runwayViewport.clientWidth;
    const maxTranslate = railWidth - viewportWidth;
    
    if (maxTranslate <= 0) return;
    
    const translateX = -(progress * maxTranslate);
    
    // Apply transform — GPU-accelerated, single property, 120fps butter
    runwayTrack.style.transform = `translate3d(${translateX}px, 0, 0)`;

    // Determine which card is "centered" based on progress
    const cardProgress = progress * (TOTAL_CARDS - 1);
    const closestIdx = Math.round(cardProgress);
    
    if (closestIdx !== activeRunwayIdx) {
      updateActiveCard(closestIdx);
    }
  }

  // Throttle scroll with rAF for butter-smooth 120fps
  function onWindowScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      handleScrollToHorizontal();
      rafId = null;
    });
  }

  window.addEventListener('scroll', onWindowScroll, { passive: true });

  // --- Navigate to a card by scrolling the PAGE to the right vertical position ---
  function scrollToCard(index) {
    if (!testimonialsSection || isMobileMode()) return;
    const sectionTop = testimonialsSection.offsetTop;
    const sectionHeight = testimonialsSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = sectionHeight - viewportHeight;
    
    // Map card index to scroll progress
    const progress = index / (TOTAL_CARDS - 1);
    const targetScrollY = sectionTop + (progress * maxScroll);
    
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }

  // --- Pill Tab Click Handlers ---
  runwayPillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        if (isMobileMode()) {
          // Mobile: scroll the overflow container
          const targetCard = runwayCards[idx];
          if (targetCard && runwayViewport) {
            const targetScroll = targetCard.offsetLeft - (runwayViewport.clientWidth - targetCard.clientWidth) / 2;
            runwayViewport.scrollTo({ left: targetScroll, behavior: 'smooth' });
          }
        } else {
          scrollToCard(idx);
        }
      }
    });
  });

  // --- Prev / Next Arrow Actions ---
  if (runwayPrevBtn) {
    runwayPrevBtn.addEventListener('click', () => {
      const prevIdx = Math.max(0, activeRunwayIdx - 1);
      if (isMobileMode()) {
        const targetCard = runwayCards[prevIdx];
        if (targetCard && runwayViewport) {
          runwayViewport.scrollTo({ left: targetCard.offsetLeft - (runwayViewport.clientWidth - targetCard.clientWidth) / 2, behavior: 'smooth' });
        }
      } else {
        scrollToCard(prevIdx);
      }
    });
  }

  if (runwayNextBtn) {
    runwayNextBtn.addEventListener('click', () => {
      const nextIdx = Math.min(TOTAL_CARDS - 1, activeRunwayIdx + 1);
      if (isMobileMode()) {
        const targetCard = runwayCards[nextIdx];
        if (targetCard && runwayViewport) {
          runwayViewport.scrollTo({ left: targetCard.offsetLeft - (runwayViewport.clientWidth - targetCard.clientWidth) / 2, behavior: 'smooth' });
        }
      } else {
        scrollToCard(nextIdx);
      }
    });
  }

  // --- Setup Video Listeners for All Cards ---
  runwayCards.forEach((card) => {
    const video = card.querySelector('.runway-video-elem');
    const playHud = card.querySelector('.runway-play-hud');
    const hudIcon = card.querySelector('.hud-play-icon');
    const audioBtn = card.querySelector('.btn-runway-audio');
    const progressFill = card.querySelector('.cinema-progress-fill');
    const timecodeElem = card.querySelector('.timecode-badge');
    const equalizer = card.querySelector('.studio-equalizer');
    const videoCard = card.querySelector('.runway-video-card');

    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    // Click Play HUD
    if (playHud) {
      playHud.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }

    // Click video card toggles play/pause
    if (videoCard) {
      videoCard.addEventListener('click', (e) => {
        if (e.target.closest('.btn-runway-audio')) return;
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }

    // Audio Toggle
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          audioBtn.classList.remove('unmuted');
          audioBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            <span class="audio-label">Tap for Sound</span>
          `;
        } else {
          audioBtn.classList.add('unmuted');
          audioBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span class="audio-label">Live Audio</span>
          `;
          if (video.paused) video.play().catch(() => {});
        }
      });
    }

    // Timeupdate
    video.addEventListener('timeupdate', () => {
      if (video.duration && isFinite(video.duration)) {
        const pct = (video.currentTime / video.duration) * 100;
        if (progressFill) progressFill.style.width = pct + '%';
        if (timecodeElem) timecodeElem.textContent = formatTC(video.currentTime);
      }
    });

    // Play event
    video.addEventListener('play', () => {
      if (hudIcon) hudIcon.textContent = '⏸';
      if (equalizer) equalizer.classList.add('playing');
    });

    // Pause event
    video.addEventListener('pause', () => {
      if (hudIcon) hudIcon.textContent = '▶';
      if (equalizer) equalizer.classList.remove('playing');
    });
  });

  // --- IntersectionObserver for Section 4 ---
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
      }, { threshold: 0.15 });
      headerObs.observe(testimonialsHeaderBlock);
    }

    if (testimonialsSection) {
      const sectionObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isSectionVisible = entry.isIntersecting;
          if (entry.isIntersecting) {
            testimonialsSection.classList.add('revealed');
            const activeCard = runwayCards[activeRunwayIdx];
            if (activeCard) {
              const video = activeCard.querySelector('.runway-video-elem');
              if (video) video.play().catch(() => {});
            }
          } else {
            // Pause all videos when scrolled away
            runwayCards.forEach((card) => {
              const video = card.querySelector('.runway-video-elem');
              if (video && !video.paused) video.pause();
            });
          }
        });
      }, { threshold: 0.05 });
      sectionObs.observe(testimonialsSection);
    }
  }

  // --- Initial state ---
  handleScrollToHorizontal();

});
