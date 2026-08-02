import re

LIGHT_BG = ("#fcfaf7", "#fff", "#ffffff", "#e6b56a", "#e4ceb2", "#c8842b",
            "#f0e2d2", "#f3e7d6", "#fff8f1", "#fff9ec", "white",
            "rgba(252, 250, 247", "rgba(255, 255, 255", "rgba(240, 200, 122")
# selectors that are buttons/pills keeping a light bg + dark text (readable)
BUTTON_SEL = (".btn", ".trade", ".email-link", ".shad-button", ".hero-primary",
              ".recipe-start-link", ".contact-hero-phone", ".shad-button-outline",
              ".faq-hero-actions a", ".recipe-builder-actions a", ".mobile-menu-btn",
              ".cart-status", ".header-phone", ".theme-toggle", ".moment-tab-trigger",
              ".builder-reset", ".info-primary-link", ".info-secondary-link",
              ".contact-detail-card", ".contact-hero-actions .btn-primary")

problem_colors = ("#a70310", "var(--red)", "var(--date)")
green_colors = ("var(--green)", "var(--deep-green)", "var(--olive)")

def parse_rules(css):
    rules = []
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
        sel = m.group(1).strip()
        if sel.startswith('@'):
            continue
        body = m.group(2)
        decls = {}
        for d in re.findall(r'([a-z-]+)\s*:\s*([^;]+);', body):
            decls[d[0].strip()] = d[1].strip()
        rules.append((sel, decls))
    return rules

def is_button(sel):
    s = sel.lower()
    return any(b in s for b in BUTTON_SEL)

dark_surface = "var(--bg-2)"
text_overrides = []
bg_overrides = []
for path in ["app/legacy-globals.css", "app/legacy-content-pages.css"]:
    css = open(path, encoding="utf-8").read()
    for sel, decls in parse_rules(css):
        color = decls.get("color")
        if color:
            cl = color.lower().replace(" ", "")
            if cl in problem_colors or cl in green_colors:
                target = "var(--date-light)" if cl in problem_colors else "var(--green-light)"
                text_overrides.append(f'[data-theme="dark"] {sel} {{ color: {target}; }}')
        # surface backgrounds that should go dark (skip buttons)
        bg = decls.get("background") or decls.get("background-color") or ""
        bgl = bg.lower().replace(" ", "")
        if any(t in bgl for t in LIGHT_BG) and not is_button(sel):
            bg_overrides.append(f'[data-theme="dark"] {sel} {{ background: {dark_surface}; background-color: {dark_surface}; }}')

# borders same treatment
for path in ["app/legacy-globals.css", "app/legacy-content-pages.css"]:
    css = open(path, encoding="utf-8").read()
    for sel, decls in parse_rules(css):
        bc = decls.get("border-color") or ""
        bcl = bc.lower().replace(" ", "")
        if ("#a70310" in bcl or "var(--red)" in bcl or "var(--date)" in bcl) and not is_button(sel):
            bg_overrides.append(f'[data-theme="dark"] {sel} {{ border-color: var(--date-light); }}')

def dedupe(seq):
    seen = set(); out = []
    for x in seq:
        if x not in seen:
            seen.add(x); out.append(x)
    return out

text_overrides = dedupe(text_overrides)
bg_overrides = dedupe(bg_overrides)

header = ("/* AUTO-GENERATED dark-mode overrides (regenerate: scripts/gen_dark_overrides.py)\n"
          "  - All dark red/green TEXT -> light tint so it stays visible on dark surfaces.\n"
          "  - All light BACKGROUNDS (cards/sections/inputs) -> dark surface, except\n"
          "    pill buttons that intentionally keep a light bg + dark text.\n"
          "  - Dark red BORDERS -> light tint. */\n\n")
content = header + "\n".join(text_overrides) + "\n\n/* ---- surfaces to dark ---- */\n" + "\n".join(bg_overrides) + "\n"
open("app/theme-dark-text.css", "w", encoding="utf-8").write(content)
print("text overrides:", len(text_overrides), "| bg/border overrides:", len(bg_overrides))
