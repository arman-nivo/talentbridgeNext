export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "tb-theme";
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs in <head> before the page paints, so the saved theme is applied
 * without a flash. Dark is the default when nothing has been saved.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t='${DEFAULT_THEME}';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;
