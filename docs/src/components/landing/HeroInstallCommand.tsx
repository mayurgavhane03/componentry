import React, { useState } from 'react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';
type Framework = 'react' | 'vue' | 'angular' | 'stencil';

const FRAMEWORK_PACKAGES: Record<Framework, { name: string; label: string; tag: string }> = {
  react: { name: '@componentry-ui/react', label: 'React', tag: 'React 18 & 19' },
  vue: { name: '@componentry-ui/vue', label: 'Vue', tag: 'Vue 3' },
  angular: { name: '@componentry-ui/angular', label: 'Angular', tag: 'Angular 17-22' },
  stencil: { name: '@componentry-ui/stencil', label: 'Web Components', tag: 'Any Stack / HTML' },
};

export default function HeroInstallCommand() {
  const [framework, setFramework] = useState<Framework>('react');
  const [pm, setPm] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);

  const pkgName = FRAMEWORK_PACKAGES[framework].name;

  const getCommand = () => {
    switch (pm) {
      case 'pnpm':
        return `pnpm add ${pkgName}`;
      case 'npm':
        return `npm install ${pkgName}`;
      case 'yarn':
        return `yarn add ${pkgName}`;
      case 'bun':
        return `bun add ${pkgName}`;
    }
  };

  const command = getCommand();

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(command);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = command;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="hero-install-box" aria-label="Install Componentry">
      <div className="install-topbar">
        <div className="install-framework-tabs" role="tablist" aria-label="Select Framework">
          {(Object.keys(FRAMEWORK_PACKAGES) as Framework[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={framework === f}
              className={`framework-tab-btn ${framework === f ? 'is-active' : ''}`}
              onClick={() => setFramework(f)}
            >
              {FRAMEWORK_PACKAGES[f].label}
            </button>
          ))}
        </div>
        <div className="install-pm-switch" aria-label="Package Manager">
          {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((p) => (
            <button
              key={p}
              type="button"
              className={`pm-switch-btn ${pm === p ? 'is-active' : ''}`}
              onClick={() => setPm(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="install-command-row">
        <div className="command-text-wrap">
          <span className="command-prompt" aria-hidden="true">$</span>
          <code className="command-code">{command}</code>
        </div>
        <button
          type="button"
          className={`copy-command-btn ${copied ? 'is-copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Command copied' : 'Copy install command'}
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="5" y="5" width="9" height="9" rx="1.5" />
                <path d="M11 5V3a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 2 3v6A1.5 1.5 0 0 0 3.5 10.5H5" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="install-foot-note">
        <span>Support: {FRAMEWORK_PACKAGES[framework].tag}</span>
        <span className="dot-divider">•</span>
        <span>Zero runtime framework overhead</span>
      </div>
    </div>
  );
}
