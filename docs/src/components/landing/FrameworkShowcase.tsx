import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import { CButton, CBadge, CCard, CCardHeader, CCardTitle, CCardDescription, CCardContent, CCardFooter, CAvatar } from '@componentry-ui/react';

type FrameworkTab = 'react' | 'vue' | 'angular' | 'html';

const FRAMEWORK_CODE: Record<FrameworkTab, { lang: string; title: string; filename: string; code: string }> = {
  react: {
    lang: 'tsx',
    title: 'React',
    filename: 'DeployCard.tsx',
    code: `import { CCard, CCardHeader, CCardTitle, CCardDescription, CCardContent, CCardFooter, CButton, CBadge } from '@componentry-ui/react';

export function DeployCard({ onDeploy }: { onDeploy: () => void }) {
  return (
    <CCard>
      <CCardHeader>
        <div slot="title" className="card-top-row">
          <CCardTitle>Production Cluster</CCardTitle>
          <CBadge variant="success" pill pulse>Active</CBadge>
        </div>
        <CCardDescription slot="description">
          Hosted on edge nodes with 99.99% uptime.
        </CCardDescription>
      </CCardHeader>

      <CCardContent>
        <p className="card-meta">Region: us-east-1 • Node v22.12</p>
      </CCardContent>

      <CCardFooter>
        <CButton variant="primary" onClick={onDeploy}>
          Deploy Changes
        </CButton>
        <CButton variant="neutral" outline>
          View Logs
        </CButton>
      </CCardFooter>
    </CCard>
  );
}`
  },
  vue: {
    lang: 'html',
    title: 'Vue 3',
    filename: 'DeployCard.vue',
    code: `<script setup lang="ts">
import { CCard, CCardHeader, CCardTitle, CCardDescription, CCardContent, CCardFooter, CButton, CBadge } from '@componentry-ui/vue';

const emit = defineEmits(['deploy']);
</script>

<template>
  <CCard>
    <CCardHeader>
      <div slot="title" class="card-top-row">
        <CCardTitle>Production Cluster</CCardTitle>
        <CBadge variant="success" pill pulse>Active</CBadge>
      </div>
      <CCardDescription slot="description">
        Hosted on edge nodes with 99.99% uptime.
      </CCardDescription>
    </CCardHeader>

    <CCardContent>
      <p class="card-meta">Region: us-east-1 • Node v22.12</p>
    </CCardContent>

    <CCardFooter>
      <CButton variant="primary" @cClick="emit('deploy')">
        Deploy Changes
      </CButton>
      <CButton variant="neutral" outline>
        View Logs
      </CButton>
    </CCardFooter>
  </CCard>
</template>`
  },
  angular: {
    lang: 'ts',
    title: 'Angular',
    filename: 'deploy-card.component.ts',
    code: `import { Component, Output, EventEmitter } from '@angular/core';
import { CCard, CCardHeader, CCardTitle, CCardDescription, CCardContent, CCardFooter, CButton, CBadge } from '@componentry-ui/angular';

@Component({
  selector: 'app-deploy-card',
  standalone: true,
  imports: [CCard, CCardHeader, CCardTitle, CCardDescription, CCardContent, CCardFooter, CButton, CBadge],
  template: \`
    <c-card>
      <c-card-header>
        <div slot="title" class="card-top-row">
          <c-card-title>Production Cluster</c-card-title>
          <c-badge variant="success" pill pulse>Active</c-badge>
        </div>
        <c-card-description slot="description">
          Hosted on edge nodes with 99.99% uptime.
        </c-card-description>
      </c-card-header>

      <c-card-content>
        <p class="card-meta">Region: us-east-1 • Node v22.12</p>
      </c-card-content>

      <c-card-footer>
        <c-button variant="primary" (cClick)="deploy.emit()">
          Deploy Changes
        </c-button>
        <c-button variant="neutral" outline>
          View Logs
        </c-button>
      </c-card-footer>
    </c-card>
  \`
})
export class DeployCardComponent {
  @Output() deploy = new EventEmitter<void>();
}`
  },
  html: {
    lang: 'html',
    title: 'Vanilla HTML',
    filename: 'index.html',
    code: `<!-- Load once from CDN or your bundle -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@componentry-ui/stencil/dist/componentry/componentry.esm.js"></script>

<c-card>
  <c-card-header>
    <div slot="title" class="card-top-row">
      <c-card-title>Production Cluster</c-card-title>
      <c-badge variant="success" pill pulse>Active</c-badge>
    </div>
    <c-card-description slot="description">
      Hosted on edge nodes with 99.99% uptime.
    </c-card-description>
  </c-card-header>

  <c-card-content>
    <p class="card-meta">Region: us-east-1 • Node v22.12</p>
  </c-card-content>

  <c-card-footer>
    <c-button variant="primary" id="deployBtn">
      Deploy Changes
    </c-button>
    <c-button variant="neutral" outline>
      View Logs
    </c-button>
  </c-card-footer>
</c-card>`
  }
};

export default function FrameworkShowcase() {
  const [activeTab, setActiveTab] = useState<FrameworkTab>('react');
  const [deployState, setDeployState] = useState<'idle' | 'deploying' | 'deployed'>('idle');

  const handleDeploy = () => {
    if (deployState === 'deploying') return;
    setDeployState('deploying');
    setTimeout(() => {
      setDeployState('deployed');
      setTimeout(() => setDeployState('idle'), 3000);
    }, 1200);
  };

  const current = FRAMEWORK_CODE[activeTab];

  return (
    <section className="framework-showcase-section" aria-label="Cross-framework code comparison">
      <div className="section-header-compact">
        <div className="section-tag">NATIVE TO YOUR ECOSYSTEM</div>
        <h2>One Source of Truth. Any Framework.</h2>
        <p>
          Write once in Stencil. Every framework receives idiomatic bindings, full TypeScript completions, and native event bindings.
        </p>
      </div>

      <div className="framework-showcase-split">
        {/* Left: Code Pane */}
        <div className="showcase-code-pane">
          <div className="code-pane-header">
            <div className="framework-pills">
              {(Object.keys(FRAMEWORK_CODE) as FrameworkTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`pill-tab ${activeTab === tab ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className={`fw-dot fw-dot-${tab}`} />
                  {FRAMEWORK_CODE[tab].title}
                </button>
              ))}
            </div>
            <span className="code-filename">{current.filename}</span>
          </div>

          <div className="code-block-wrapper">
            <CodeBlock language={current.lang}>{current.code}</CodeBlock>
          </div>
        </div>

        {/* Right: Live Interactive Specimen */}
        <div className="showcase-specimen-pane">
          <div className="specimen-header">
            <span className="specimen-live-badge">
              <span className="live-dot" /> LIVE RUNTIME
            </span>
            <span className="specimen-tech-note">Web Component Shadow DOM</span>
          </div>

          <div className="specimen-canvas">
            <div className="specimen-card-container">
              <CCard className="specimen-demo-card">
                <CCardHeader>
                  <div slot="title" className="specimen-card-top">
                    <div>
                      <span className="specimen-cluster-type">CLUSTER #09</span>
                      <CCardTitle>Production Cluster</CCardTitle>
                    </div>
                    <CBadge variant="success" pill pulse>Active</CBadge>
                  </div>
                  <CCardDescription slot="description">
                    Hosted on edge nodes with 99.99% uptime. Automated scaling enabled.
                  </CCardDescription>
                </CCardHeader>

                <CCardContent>
                  <div className="specimen-stats-row">
                    <div className="stat-item">
                      <span className="stat-label">REGION</span>
                      <span className="stat-value">us-east-1</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">RUNTIME</span>
                      <span className="stat-value">Node v22.12</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">STATUS</span>
                      <span className="stat-value text-success">Healthy</span>
                    </div>
                  </div>

                  <div className="specimen-team-row">
                    <div className="avatar-group">
                      <CAvatar initials="AG" shape="circle" />
                      <CAvatar initials="MG" shape="circle" />
                      <CAvatar initials="TS" shape="circle" />
                    </div>
                    <span className="team-caption">3 team members deploying</span>
                  </div>
                </CCardContent>

                <CCardFooter>
                  <div className="specimen-actions-row">
                    <CButton
                      variant={deployState === 'deployed' ? 'success' : 'primary'}
                      loading={deployState === 'deploying'}
                      onClick={handleDeploy}
                    >
                      {deployState === 'deploying'
                        ? 'Deploying…'
                        : deployState === 'deployed'
                        ? 'Deployed ✓'
                        : 'Deploy Changes ↗'}
                    </CButton>
                    <CButton
                      variant="neutral"
                      outline
                      onClick={() => alert('View Logs: System operating nominally.')}
                    >
                      View Logs
                    </CButton>
                  </div>
                </CCardFooter>
              </CCard>
            </div>
          </div>

          <div className="specimen-caption-bar">
            <span>Interactivity: Click &ldquo;Deploy Changes&rdquo; to test real button loading states</span>
            <span className="badge-tag">Zero Drift</span>
          </div>
        </div>
      </div>
    </section>
  );
}
