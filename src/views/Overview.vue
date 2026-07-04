<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PrismButton, PrismBadge, PrismCard, PrismAvatar } from '@/components/prism'

const router = useRouter()

const features = [
  {
    title: '10 typed components',
    body: 'Buttons, inputs, tabs, modal and more — each with fully typed props and sensible slots.',
    icon: 'M4 6h16M4 12h16M4 18h10',
  },
  {
    title: 'Themeable by tokens',
    body: 'Every color, radius and shadow is a CSS variable. Light and dark ship out of the box.',
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-9z',
  },
  {
    title: 'Accessible by default',
    body: 'Focus-visible rings, an Esc-closing focus-trapped modal, arrow-key tabs and role=switch toggles.',
    icon: 'M9 12l2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  },
  {
    title: 'Zero dependencies',
    body: 'No Tailwind, no component library. Just Vue 3, TypeScript and hand-written CSS.',
    icon: 'M13 2 3 14h7l-1 8 10-12h-7z',
  },
]

const stats = [
  { value: '10', label: 'Components' },
  { value: '2', label: 'Themes' },
  { value: '0', label: 'Runtime deps' },
  { value: '100%', label: 'TypeScript' },
]
</script>

<template>
  <div class="page">
    <!-- The single reserved gradient hero moment -->
    <section class="hero">
      <div class="hero__glow" aria-hidden="true" />
      <div class="hero__content">
        <PrismBadge tone="primary" dot>Vue 3 · TypeScript · Vite</PrismBadge>
        <h1 class="hero__title">
          A tiny design system<br />that feels <span class="hero__accent">hand-built</span>.
        </h1>
        <p class="hero__lead">
          Prism UI is a compact, fully typed component library for Vue 3 — plus the living
          documentation site you are reading right now. Every example below is interactive, and
          every snippet is copy-paste ready.
        </p>
        <div class="hero__actions">
          <PrismButton size="lg" @click="router.push('/components')">Explore components</PrismButton>
          <PrismButton size="lg" variant="secondary" @click="router.push({ path: '/components', hash: '#playground' })">
            Try the playground
          </PrismButton>
        </div>

        <dl class="hero__stats">
          <div v-for="s in stats" :key="s.label" class="hero__stat">
            <dt class="hero__stat-value">{{ s.value }}</dt>
            <dd class="hero__stat-label">{{ s.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="features">
      <div v-for="f in features" :key="f.title" class="feature">
        <span class="feature__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path :d="f.icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <h3 class="feature__title">{{ f.title }}</h3>
        <p class="feature__body">{{ f.body }}</p>
      </div>
    </section>

    <section class="showcase">
      <div class="showcase__head">
        <h2 class="showcase__title">Everything fits together</h2>
        <p class="showcase__sub">
          The same tokens drive every component, so mixed layouts stay consistent automatically.
        </p>
      </div>

      <div class="showcase__grid">
        <PrismCard padding="lg">
          <template #header>Team invite</template>
          <p class="showcase__muted">
            Nadia just requested access to the <strong>Billing</strong> workspace.
          </p>
          <div class="showcase__people">
            <PrismAvatar name="Nadia Okonkwo" status="online" />
            <div>
              <p class="showcase__name">Nadia Okonkwo</p>
              <p class="showcase__role">Product designer</p>
            </div>
            <PrismBadge tone="warning" style="margin-left: auto">Pending</PrismBadge>
          </div>
          <template #footer>
            <div style="display: flex; gap: 12px; justify-content: flex-end">
              <PrismButton variant="ghost" size="sm">Deny</PrismButton>
              <PrismButton size="sm">Approve</PrismButton>
            </div>
          </template>
        </PrismCard>

        <PrismCard padding="lg">
          <template #header>Deployment</template>
          <p class="showcase__muted">Build <code>#4821</code> finished and shipped to production.</p>
          <div class="showcase__row">
            <PrismBadge tone="success" dot>Live</PrismBadge>
            <span class="showcase__meta">2m 14s · main</span>
          </div>
          <div class="showcase__row">
            <PrismBadge tone="neutral">v1.0.0</PrismBadge>
            <span class="showcase__meta">europe-west1</span>
          </div>
          <template #footer>
            <PrismButton variant="secondary" size="sm" block>View release notes</PrismButton>
          </template>
        </PrismCard>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-max);
  margin-inline: auto;
  padding: var(--space-6) var(--space-5) var(--space-8);
}

/* ---- Hero (the one gradient moment) ---- */
.hero {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  padding: clamp(2rem, 6vw, 4rem);
  color: #fff;
  background: var(--gradient-hero);
  box-shadow: var(--shadow-lg);
}
.hero__glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 60% at 85% 15%, rgba(255, 255, 255, 0.35), transparent 60%),
    radial-gradient(40% 50% at 10% 100%, rgba(255, 158, 125, 0.6), transparent 70%);
  mix-blend-mode: screen;
  pointer-events: none;
}
.hero__content {
  position: relative;
}
.hero :deep(.p-badge--primary) {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.hero__title {
  margin-top: var(--space-4);
  font-size: clamp(2rem, 5vw, var(--text-4xl));
  font-weight: 700;
  color: #fff;
  line-height: 1.08;
}
.hero__accent {
  color: #ffe3d6;
}
.hero__lead {
  margin-top: var(--space-4);
  max-width: 58ch;
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.9);
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}
.hero__actions :deep(.p-btn--primary) {
  background: #fff;
  color: var(--color-primary);
}
.hero__actions :deep(.p-btn--primary:hover) {
  background: #f4f1ff;
}
.hero__actions :deep(.p-btn--secondary) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}
.hero__actions :deep(.p-btn--secondary:hover) {
  color: #fff;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
}
.hero__stat-value {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
}
.hero__stat-label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);
}

/* ---- Features ---- */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-6);
}
.feature {
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
  transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.feature:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
}
.feature__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}
.feature__title {
  font-size: var(--text-md);
  margin-bottom: var(--space-2);
}
.feature__body {
  font-size: var(--text-base);
  color: var(--color-muted);
}

/* ---- Showcase ---- */
.showcase {
  margin-top: var(--space-8);
}
.showcase__title {
  font-size: var(--text-2xl);
}
.showcase__sub {
  margin-top: var(--space-2);
  color: var(--color-muted);
}
.showcase__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-5);
}
.showcase__muted {
  color: var(--color-muted);
  margin-bottom: var(--space-4);
}
.showcase__people {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.showcase__name {
  font-weight: 600;
}
.showcase__role,
.showcase__meta {
  font-size: var(--text-sm);
  color: var(--color-muted);
}
.showcase__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
}
.showcase__row + .showcase__row {
  border-top: 1px solid var(--color-border);
}
code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--color-surface);
}

@media (max-width: 640px) {
  .hero__stats {
    gap: var(--space-4);
  }
}
</style>
