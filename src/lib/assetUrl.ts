// Turn a content.json image path (e.g. "/personas/Marketing.png") into a URL
// that works both locally (BASE_URL = "/") and on GitHub Pages (BASE_URL = "/pmm-x-eran/").
// Also URL-encodes spaces and special characters in filenames.
export function assetUrl(path: string | undefined | null): string {
  if (!path) return "";
  // Full URLs (http://, https://) pass through unchanged.
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const cleaned = path.replace(/^\//, "");
  const [file, ...rest] = cleaned.split("?");
  const query = rest.length ? "?" + rest.join("?") : "";
  const encoded = file.split("/").map(encodeURIComponent).join("/");
  return `${base}${encoded}${query}`;
}
