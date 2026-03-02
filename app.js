/* ============================================================
   LTE Band Optimizer — Research Portfolio JavaScript
   ============================================================ */

// ── Navbar Scroll Effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile Menu ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll Reveal ─────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initReveal() {
  const revealTargets = [
    '.problem-card',
    '.obj-item',
    '.rq-item',
    '.method-step',
    '.feature-card',
    '.coverage-card',
    '.team-card',
    '.result-stat-card',
    '.chart-card',
    '.arch-layer',
    '.data-source',
    '.stack-row',
    '.abstract-text',
    '.signal-paradox-card',
    '.main-objective',
    '.slot-item',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.dataset.delay = i * 80;
      observer.observe(el);
    });
  });
}

// ── Charts Setup ─────────────────────────────────────────────
const CHART_DEFAULTS = {
  plugins: {
    legend: {
      labels: {
        color: '#94A3B8',
        font: { family: 'Inter', size: 11, weight: '500' },
        boxWidth: 12,
        padding: 16,
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15,23,42,0.95)',
      titleColor: '#F8FAFC',
      bodyColor: '#94A3B8',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    }
  },
  scales: {
    x: {
      ticks: { color: '#64748B', font: { family: 'Inter', size: 11 } },
      grid: { color: 'rgba(255,255,255,0.05)' },
    },
    y: {
      ticks: { color: '#64748B', font: { family: 'Inter', size: 11 } },
      grid: { color: 'rgba(255,255,255,0.05)' },
    }
  },
  animation: {
    duration: 1200,
    easing: 'easeInOutQuart',
  }
};

function initCharts() {
  // 1. Throughput Comparison Chart
  new Chart(document.getElementById('throughputChart'), {
    type: 'bar',
    data: {
      labels: ['Avg Download', 'Avg Upload', 'Max Download'],
      datasets: [
        {
          label: 'Auto Selection',
          data: [13.37, 6.90, 35.64],
          backgroundColor: 'rgba(239,68,68,0.75)',
          borderColor: 'rgba(239,68,68,1)',
          borderWidth: 1.5,
          borderRadius: 6,
        },
        {
          label: 'Manual Selection',
          data: [21.37, 8.51, 57.59],
          backgroundColor: 'rgba(37,99,235,0.75)',
          borderColor: 'rgba(37,99,235,1)',
          borderWidth: 1.5,
          borderRadius: 6,
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      responsive: true,
      scales: {
        ...CHART_DEFAULTS.scales,
        y: {
          ...CHART_DEFAULTS.scales.y,
          title: {
            display: true,
            text: 'Speed (Mbps)',
            color: '#64748B',
            font: { size: 11 }
          },
          beginAtZero: true
        }
      }
    }
  });

  // 2. Time Slot Performance
  new Chart(document.getElementById('timeSlotChart'), {
    type: 'line',
    data: {
      labels: ['Slot 0\nLate Night', 'Slot 6\nLunch Peak', 'Slot 9\nEvening Peak'],
      datasets: [
        {
          label: 'Auto Selection',
          data: [31.18, 5.48, 3.11],
          borderColor: 'rgba(239,68,68,0.9)',
          backgroundColor: 'rgba(239,68,68,0.1)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: 'rgba(239,68,68,1)',
          pointRadius: 6,
        },
        {
          label: 'Manual Selection',
          data: [47.30, 12.23, 5.20],
          borderColor: 'rgba(37,99,235,0.9)',
          backgroundColor: 'rgba(37,99,235,0.1)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: 'rgba(37,99,235,1)',
          pointRadius: 6,
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      responsive: true,
      scales: {
        ...CHART_DEFAULTS.scales,
        y: {
          ...CHART_DEFAULTS.scales.y,
          title: {
            display: true,
            text: 'Download Speed (Mbps)',
            color: '#64748B',
            font: { size: 11 }
          },
          beginAtZero: true
        }
      }
    }
  });

  // 3. Accuracy Comparison (Doughnut)
  new Chart(document.getElementById('accuracyChart'), {
    type: 'doughnut',
    data: {
      labels: ['Manual Accuracy', 'Manual Error', 'Auto Accuracy', 'Auto Error'],
      datasets: [{
        data: [95.32, 4.68, 75.37, 24.63],
        backgroundColor: [
          'rgba(37,99,235,0.85)',
          'rgba(37,99,235,0.2)',
          'rgba(239,68,68,0.75)',
          'rgba(239,68,68,0.15)',
        ],
        borderColor: [
          'rgba(37,99,235,1)',
          'rgba(37,99,235,0.4)',
          'rgba(239,68,68,1)',
          'rgba(239,68,68,0.3)',
        ],
        borderWidth: 2,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      cutout: '60%',
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
          }
        }
      },
      animation: CHART_DEFAULTS.animation,
    }
  });

  // 4. Signal Paradox Scatter/Bar Chart
  new Chart(document.getElementById('paradoxChart'), {
    type: 'bar',
    data: {
      labels: ['Auto (RSRP: −92.6 dBm)', 'Manual (RSRP: −94.5 dBm)'],
      datasets: [
        {
          label: 'Average Speed (Mbps)',
          data: [13.37, 21.37],
          backgroundColor: [
            'rgba(239,68,68,0.7)',
            'rgba(37,99,235,0.7)',
          ],
          borderColor: [
            'rgba(239,68,68,1)',
            'rgba(37,99,235,1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      responsive: true,
      scales: {
        ...CHART_DEFAULTS.scales,
        y: {
          ...CHART_DEFAULTS.scales.y,
          title: {
            display: true,
            text: 'Speed (Mbps)',
            color: '#64748B',
            font: { size: 11 }
          },
          beginAtZero: true,
          max: 30,
        }
      }
    }
  });
}

// ── Animate Stat Counters ─────────────────────────────────────
function animateCounter(el, target, suffix, decimals = 0, duration = 1800) {
  let start = 0;
  const step = (target / duration) * 16;
  const interval = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(interval);
    }
    el.textContent = (decimals > 0 ? start.toFixed(decimals) : Math.floor(start)) + suffix;
  }, 16);
}

function initCounters() {
  const stats = [
    { selector: '.stat-value', targets: ['+59.8%', '5,000+', '95.3%', '+123%'] }
  ];

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statCards = document.querySelectorAll('.stat-card .stat-value');
        const values = [
          { num: 59.8, suffix: '%', prefix: '+', decimals: 1 },
          { num: 5000, suffix: '+', prefix: '', decimals: 0 },
          { num: 95.3, suffix: '%', prefix: '', decimals: 1 },
          { num: 123, suffix: '%', prefix: '+', decimals: 0 },
        ];
        statCards.forEach((el, i) => {
          if (values[i]) {
            const { num, suffix, prefix, decimals } = values[i];
            let current = 0;
            const duration = 1800;
            const step = (num / duration) * 16;
            const interval = setInterval(() => {
              current += step;
              if (current >= num) {
                current = num;
                clearInterval(interval);
              }
              el.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
            }, 16);
          }
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);
}

// ── Animate Progress Bars ─────────────────────────────────────
function initProgressBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[style*="width"]').forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = targetWidth; }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.signal-paradox-card').forEach(el => barObserver.observe(el));
  document.querySelectorAll('.coverage-card').forEach(el => barObserver.observe(el));
}

// ── Charts Lazy Init ──────────────────────────────────────────
function initChartsLazy() {
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initCharts();
        chartObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  const resultsSection = document.getElementById('results');
  if (resultsSection) chartObserver.observe(resultsSection);
}

// ── Active Nav Highlight ──────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = '';
          link.style.background = '';
        });
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.style.color = '#FFFFFF';
          activeLink.style.background = 'rgba(37,99,235,0.2)';
        }
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => navObserver.observe(s));
}

// ── Smooth Anchor Scroll with Offset ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Parallax on Hero Orbs ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.15;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
}, { passive: true });

// ── Init Everything ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initProgressBars();
  initChartsLazy();
  initActiveNav();

  // Stagger hero elements
  const heroElements = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-subtitle, .hero-tags, .hero-cta, .hero-stats'
  );
  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.12}s`;
  });
});
