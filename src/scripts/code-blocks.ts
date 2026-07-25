/**
 * Wrap Shiki <pre> blocks with a header (lang/file) + copy button.
 * Safe to run on every page-load; skips already-enhanced blocks.
 */
function enhanceCodeBlocks() {
    const blocks = document.querySelectorAll<HTMLElement>('pre.astro-code, .prose pre:not(.code-block pre)');

    blocks.forEach((pre) => {
        if (pre.closest('.code-block')) return;
        if (pre.parentElement?.classList.contains('code-block')) return;

        const parent = pre.parentElement;
        if (!parent) return;

        const lang =
            pre.getAttribute('data-language') ||
            pre.dataset.language ||
            Array.from(pre.classList)
                .find((c) => c.startsWith('language-'))
                ?.replace('language-', '') ||
            'code';

        // Shiki may put title in data-title or from meta - optional
        const file =
            pre.getAttribute('data-file') ||
            pre.getAttribute('title') ||
            pre.dataset.file ||
            '';

        const wrap = document.createElement('div');
        wrap.className = 'code-block';

        const header = document.createElement('div');
        header.className = 'code-block-header';

        const meta = document.createElement('div');
        meta.className = 'code-block-meta';
        meta.innerHTML = `<span class="lang">${escapeHtml(lang)}</span>${
            file ? `<span class="file">${escapeHtml(file)}</span>` : ''
        }`;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-copy';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code');

        btn.addEventListener('click', async () => {
            const text = pre.textContent ?? '';
            try {
                await navigator.clipboard.writeText(text);
                btn.textContent = 'Copied';
                btn.dataset.copied = '1';
                window.setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.dataset.copied = '0';
                }, 1800);
            } catch {
                btn.textContent = 'Failed';
                window.setTimeout(() => {
                    btn.textContent = 'Copy';
                }, 1800);
            }
        });

        header.append(meta, btn);
        parent.insertBefore(wrap, pre);
        wrap.append(header, pre);
    });
}

function escapeHtml(s: string) {
    return s
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function boot() {
    enhanceCodeBlocks();
}

boot();
document.addEventListener('astro:page-load', boot);
