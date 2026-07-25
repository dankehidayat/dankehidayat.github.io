# Writing blog posts (MDX + math + code)

Posts live under `src/content/blog/` as **MDX** (preferred). Plain `.md` still works.

## Create / update / delete

| Action | What to do |
|--------|------------|
| Create | Add `src/content/blog/YYYY-MM-DD-slug.mdx` |
| Update | Edit the file |
| Delete | Remove the file |
| Preview | `pnpm dev` |
| Ship | `pnpm build` (then deploy) |

## Frontmatter

```yaml
---
title: "Your title"
excerpt: "One or two sentences for cards and SEO."
publishDate: "Mar 20 2026"
updatedDate: "Mar 21 2026"   # optional
isFeatured: true             # optional, home "field notes"
tags:
  - IoT
  - Notes
---
```

## Math (LaTeX → KaTeX)

Inline: `$E = mc^2$`

Display:

```mdx
$$
\hat{y} = ax + b
$$
```

Aligned:

```mdx
$$
\begin{aligned}
MAE &= \frac{1}{n}\sum_{i=1}^{n}|e_i| \\
R^2 &= 1 - \frac{SS_{res}}{SS_{tot}}
\end{aligned}
$$
```

## Code blocks

Fenced blocks are syntax-highlighted (Shiki `night-owl`), get a language label, and a **Copy** button.

```mdx
```python
def hello(name: str) -> str:
    return f"hi, {name}"
```
```

Highlight / diff notations (Shiki transformers):

```mdx
```ts
const a = 1
const b = 2 // [!code highlight]
const old = 1 // [!code --]
const neu = 2 // [!code ++]
```
```

## Images

Put assets under `src/assets/images/blog/...` and reference them from the post:

```mdx
![Alt text](../../assets/images/blog/your-image.png)
```

## MDX note

You can later import components into MDX if you add islands. For most posts, Markdown inside MDX is enough.
