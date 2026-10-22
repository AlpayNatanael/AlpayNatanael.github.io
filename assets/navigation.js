/* Edit menus here once. Every page loads this file; no build tool is needed. */
(() => {
  const script = document.currentScript;
  if (!script) return;
  const root = new URL("../", script.src);
  const menus = {
    "site-nav": [
      ["Home", "index.html"],
      ["About Me", "pages/Me.html"],
      ["LinkedIn", "https://www.linkedin.com/in/natanael-alpay-99802a19a/"],
      ["GitHub", "https://github.com/AlpayNatanael"],
      ["Resume", "misc/resume.pdf"],
      ["CV", "misc/cv.pdf"],
      ["Teaching", "pages/teaching.html"]
    ],
    "research-nav": [
      ["Mathematics", "index.html"],
      ["Computer and Data Science", "pages/cs.html"]
    ]
  };
  const normalize = url => url.origin + (url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname);
  const current = normalize(new URL(location.href));
  for (const [id, items] of Object.entries(menus)) {
    const nav = document.getElementById(id);
    if (!nav) continue;
    nav.replaceChildren(...items.map(([label, destination]) => {
      const link = document.createElement("a");
      const url = new URL(destination, root);
      link.href = url.href;
      link.textContent = label;
      if (normalize(url) === current) link.setAttribute("aria-current", "page");
      if (/\.pdf$/i.test(url.pathname)) link.setAttribute("aria-label", label + " (PDF)");
      return link;
    }));
  }
})();
