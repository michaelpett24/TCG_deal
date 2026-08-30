// Routes that render as their own site — no TCGFair nav or footer around them.
const STANDALONE_PREFIXES = ["/patriot-test"];

export function isStandaloneRoute(path: string): boolean {
  return STANDALONE_PREFIXES.some(p => path === p || path.startsWith(`${p}/`));
}
