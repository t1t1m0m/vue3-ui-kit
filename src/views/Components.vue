<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  PrismButton,
  PrismBadge,
  PrismCard,
  PrismInput,
  PrismToggle,
  PrismTabs,
  PrismAvatar,
  PrismAlert,
  PrismTooltip,
  PrismModal,
  type ButtonVariant,
  type ButtonSize,
  type TabItem,
} from '@/components/prism'
import DocSection from '@/components/docs/DocSection.vue'
import CodeBlock from '@/components/docs/CodeBlock.vue'

/* ----------------------------- Playground ----------------------------- */
const play = reactive({
  variant: 'primary' as ButtonVariant,
  size: 'md' as ButtonSize,
  loading: false,
  disabled: false,
  label: 'Deploy to production',
})

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']

const playgroundCode = computed(() => {
  const attrs: string[] = []
  attrs.push(`variant="${play.variant}"`)
  if (play.size !== 'md') attrs.push(`size="${play.size}"`)
  if (play.loading) attrs.push(':loading="true"')
  if (play.disabled) attrs.push(':disabled="true"')

  const attrString = attrs.map((a) => `\n  ${a}`).join('')
  return `<PrismButton${attrString}\n>\n  ${play.label}\n</PrismButton>`
})

/* ----------------------------- Demos ----------------------------- */
const email = ref('')
const emailError = computed(() =>
  email.value && !email.value.includes('@') ? 'Enter a valid email address.' : '',
)

const notifications = ref(true)

const tabItems: TabItem[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'usage', label: 'Usage' },
  { value: 'billing', label: 'Billing' },
  { value: 'archived', label: 'Archived', disabled: true },
]
const activeTab = ref('overview')

const modalOpen = ref(false)

/* ----------------------------- Snippets ----------------------------- */
const buttonCode = `<PrismButton variant="primary">Save changes</PrismButton>
<PrismButton variant="secondary">Preview</PrismButton>
<PrismButton variant="ghost">Cancel</PrismButton>
<PrismButton variant="danger">Delete project</PrismButton>`

const badgeCode = `<PrismBadge tone="primary" dot>Beta</PrismBadge>
<PrismBadge tone="success">Paid</PrismBadge>
<PrismBadge tone="warning">Pending</PrismBadge>
<PrismBadge tone="danger">Overdue</PrismBadge>`

const cardCode = `<PrismCard>
  <template #header>Weekly report</template>
  <p>Your team shipped 42 commits across 6 pull requests.</p>
  <template #footer>
    <PrismButton size="sm">Open report</PrismButton>
  </template>
</PrismCard>`

const inputCode = `<PrismInput
  v-model="email"
  label="Work email"
  type="email"
  placeholder="you@company.com"
  helper="We'll only use this for billing receipts."
  :error="emailError"
/>`

const toggleCode = `<PrismToggle
  v-model="notifications"
  label="Email me about product updates"
/>`

const tabsCode = `<PrismTabs v-model="active" :items="tabItems">
  <template #default="{ active }">
    <p>Currently viewing: {{ active }}</p>
  </template>
</PrismTabs>`

const avatarCode = `<PrismAvatar name="Mira Castellanos" status="online" />
<PrismAvatar name="Jonas Weber" />
<PrismAvatar name="Priya Raman" src="/broken.png" />`

const alertCode = `<PrismAlert tone="success" title="Payment received">
  Your invoice for June has been settled.
</PrismAlert>`

const tooltipCode = `<PrismTooltip content="Copied to your clipboard">
  <PrismButton variant="secondary" size="sm">Hover me</PrismButton>
</PrismTooltip>`

const modalCode = `<PrismButton @click="open = true">Delete project</PrismButton>

<PrismModal
  v-model="open"
  title="Delete project?"
  description="This permanently removes the project and all of its data."
>
  <p>Type the project name to confirm this action.</p>
  <template #footer>
    <PrismButton variant="ghost" @click="open = false">Cancel</PrismButton>
    <PrismButton variant="danger" @click="open = false">Delete</PrismButton>
  </template>
</PrismModal>`
</script>

<template>
  <div class="page">
    <header class="page__head">
      <PrismBadge tone="primary">Components</PrismBadge>
      <h1 class="page__title">The Prism UI library</h1>
      <p class="page__lead">
        Ten production-minded components, each documented with a live preview and a copy-paste
        snippet. Flip the theme in the top bar — everything re-themes from a single set of tokens.
      </p>
    </header>

    <!-- ===================== SIGNATURE: PLAYGROUND ===================== -->
    <section id="playground" class="playground" tabindex="-1">
      <div class="playground__head">
        <div>
          <h2 class="playground__title">Button playground</h2>
          <p class="playground__sub">
            Change the props on the right and watch both the preview and the generated code update
            live.
          </p>
        </div>
        <PrismBadge tone="primary" dot>Interactive</PrismBadge>
      </div>

      <div class="playground__body">
        <div class="playground__stage">
          <div class="playground__canvas">
            <PrismButton
              :variant="play.variant"
              :size="play.size"
              :loading="play.loading"
              :disabled="play.disabled"
            >
              {{ play.label }}
            </PrismButton>
          </div>
          <CodeBlock :code="playgroundCode" />
        </div>

        <div class="playground__controls">
          <div class="control">
            <span class="control__label">Variant</span>
            <div class="segmented">
              <button
                v-for="v in variants"
                :key="v"
                type="button"
                class="segmented__btn"
                :class="{ 'is-active': play.variant === v }"
                :aria-pressed="play.variant === v"
                @click="play.variant = v"
              >
                {{ v }}
              </button>
            </div>
          </div>

          <div class="control">
            <span class="control__label">Size</span>
            <div class="segmented">
              <button
                v-for="s in sizes"
                :key="s"
                type="button"
                class="segmented__btn"
                :class="{ 'is-active': play.size === s }"
                :aria-pressed="play.size === s"
                @click="play.size = s"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <PrismInput v-model="play.label" label="Label" />

          <div class="control control--row">
            <PrismToggle v-model="play.loading" label="Loading" />
            <PrismToggle v-model="play.disabled" label="Disabled" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== COMPONENT DOCS ===================== -->
    <DocSection
      id="button"
      title="Button"
      description="Four variants and three sizes, with built-in loading and disabled states."
      :code="buttonCode"
    >
      <PrismButton variant="primary">Save changes</PrismButton>
      <PrismButton variant="secondary">Preview</PrismButton>
      <PrismButton variant="ghost">Cancel</PrismButton>
      <PrismButton variant="danger">Delete project</PrismButton>
      <PrismButton variant="primary" loading>Saving</PrismButton>
    </DocSection>

    <DocSection
      id="badge"
      title="Badge"
      description="Compact status labels in five tones, with an optional leading dot."
      :code="badgeCode"
    >
      <PrismBadge tone="primary" dot>Beta</PrismBadge>
      <PrismBadge tone="success">Paid</PrismBadge>
      <PrismBadge tone="warning">Pending</PrismBadge>
      <PrismBadge tone="danger">Overdue</PrismBadge>
      <PrismBadge tone="neutral">Draft</PrismBadge>
    </DocSection>

    <DocSection
      id="card"
      title="Card"
      description="A flexible surface with optional header, footer and media slots."
      :code="cardCode"
    >
      <PrismCard style="max-width: 320px">
        <template #header>Weekly report</template>
        <p style="color: var(--color-muted)">
          Your team shipped 42 commits across 6 pull requests this week.
        </p>
        <template #footer>
          <div style="display: flex; justify-content: flex-end">
            <PrismButton size="sm">Open report</PrismButton>
          </div>
        </template>
      </PrismCard>
    </DocSection>

    <DocSection
      id="avatar"
      title="Avatar"
      description="Image avatars with a deterministic colored initials fallback and presence dot."
      :code="avatarCode"
    >
      <PrismAvatar name="Mira Castellanos" status="online" size="lg" />
      <PrismAvatar name="Jonas Weber" />
      <PrismAvatar name="Priya Raman" src="/intentionally-broken.png" />
      <PrismAvatar name="Ada Lovelace" size="sm" status="offline" />
    </DocSection>

    <DocSection
      id="input"
      title="Input"
      description="A labelled text field with helper text and inline validation. Try removing the @ sign."
      :code="inputCode"
      stack
    >
      <div style="max-width: 380px; width: 100%">
        <PrismInput
          v-model="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          helper="We'll only use this for billing receipts."
          :error="emailError"
        />
      </div>
    </DocSection>

    <DocSection
      id="toggle"
      title="Toggle"
      description="An accessible switch built on role=switch, operable with mouse and keyboard."
      :code="toggleCode"
      stack
    >
      <PrismToggle v-model="notifications" label="Email me about product updates" />
      <p style="font-size: var(--text-sm); color: var(--color-muted); margin-top: 12px">
        Notifications are currently <strong>{{ notifications ? 'on' : 'off' }}</strong>.
      </p>
    </DocSection>

    <DocSection
      id="tabs"
      title="Tabs"
      description="Roving-tabindex tabs. Focus a tab and use the arrow keys, Home and End."
      :code="tabsCode"
      stack
    >
      <PrismTabs v-model="activeTab" :items="tabItems">
        <template #default="{ active }">
          <p style="color: var(--color-muted)">
            You're viewing the <strong style="color: var(--color-ink)">{{ active }}</strong> panel.
          </p>
        </template>
      </PrismTabs>
    </DocSection>

    <DocSection
      id="alert"
      title="Alert"
      description="Inline messaging in four tones, each with a matching icon and optional dismiss."
      :code="alertCode"
      stack
    >
      <div style="display: grid; gap: 12px; width: 100%">
        <PrismAlert tone="info" title="Scheduled maintenance">
          We'll be applying updates on Sunday at 02:00 UTC.
        </PrismAlert>
        <PrismAlert tone="success" title="Payment received">
          Your invoice for June has been settled.
        </PrismAlert>
        <PrismAlert tone="warning" title="Storage almost full">
          You've used 92% of your plan's storage.
        </PrismAlert>
        <PrismAlert tone="danger" title="Build failed" dismissible>
          Step "unit tests" exited with code 1.
        </PrismAlert>
      </div>
    </DocSection>

    <DocSection
      id="tooltip"
      title="Tooltip"
      description="A hover- and focus-triggered tooltip that fades in around its trigger."
      :code="tooltipCode"
    >
      <PrismTooltip content="Copied to your clipboard" placement="top">
        <PrismButton variant="secondary" size="sm">Hover: top</PrismButton>
      </PrismTooltip>
      <PrismTooltip content="Opens in a new tab" placement="bottom">
        <PrismButton variant="secondary" size="sm">Hover: bottom</PrismButton>
      </PrismTooltip>
      <PrismTooltip content="This action can't be undone" placement="right">
        <PrismButton variant="secondary" size="sm">Hover: right</PrismButton>
      </PrismTooltip>
    </DocSection>

    <DocSection
      id="modal"
      title="Modal"
      description="Teleported dialog with a focus trap, Esc-to-close and focus restore on exit."
      :code="modalCode"
    >
      <PrismButton variant="danger" @click="modalOpen = true">Delete project</PrismButton>
      <PrismModal
        v-model="modalOpen"
        title="Delete project?"
        description="This permanently removes the project and all of its data. This action cannot be undone."
      >
        <p style="color: var(--color-muted)">
          To confirm, you would normally type the project name here. For this demo, just choose an
          option below.
        </p>
        <template #footer>
          <PrismButton variant="ghost" @click="modalOpen = false">Cancel</PrismButton>
          <PrismButton variant="danger" @click="modalOpen = false">Delete project</PrismButton>
        </template>
      </PrismModal>
    </DocSection>

    <footer class="page__foot">
      <p>Built with Vue 3, TypeScript and hand-written CSS — no UI framework.</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-max);
  margin-inline: auto;
  padding: var(--space-6) var(--space-5) var(--space-8);
}

.page__head {
  margin-bottom: var(--space-7);
}
.page__title {
  margin-top: var(--space-3);
  font-size: var(--text-3xl);
}
.page__lead {
  margin-top: var(--space-3);
  max-width: 62ch;
  font-size: var(--text-lg);
  color: var(--color-muted);
}

/* ---------- Playground ---------- */
.playground {
  scroll-margin-top: 88px;
  margin-bottom: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-raised);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.playground__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(180deg, var(--color-primary-soft), transparent);
}
.playground__title {
  font-size: var(--text-xl);
}
.playground__sub {
  margin-top: var(--space-2);
  color: var(--color-muted);
  font-size: var(--text-base);
  max-width: 52ch;
}

.playground__body {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}
.playground__stage {
  padding: var(--space-5);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.playground__canvas {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  background-image:
    linear-gradient(45deg, var(--checker) 25%, transparent 25%),
    linear-gradient(-45deg, var(--checker) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--checker) 75%),
    linear-gradient(-45deg, transparent 75%, var(--checker) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
}

.playground__controls {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.control {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.control--row {
  flex-direction: row;
  gap: var(--space-5);
  flex-wrap: wrap;
}
.control__label {
  font-size: var(--text-sm);
  font-weight: 600;
}

.segmented {
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.segmented__btn {
  flex: 1;
  padding: 6px 10px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: capitalize;
  color: var(--color-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease);
}
.segmented__btn:hover {
  color: var(--color-ink);
}
.segmented__btn.is-active {
  color: var(--color-primary);
  background: var(--color-surface-raised);
  box-shadow: var(--shadow-sm);
}

.page__foot {
  margin-top: var(--space-8);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-sm);
  color: var(--color-muted);
}

@media (max-width: 760px) {
  .playground__body {
    grid-template-columns: 1fr;
  }
  .playground__stage {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
