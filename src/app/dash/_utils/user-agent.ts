export function getBrowserName(userAgent: string | null): string {
  if (!userAgent) return "Desconhecido";

  const ua = userAgent.toLowerCase();

  if (ua.includes("edg/")) return "Microsoft Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("firefox/")) return "Firefox";
  if (ua.includes("chrome/") && !ua.includes("edg/") && !ua.includes("opr/"))
    return "Chrome";
  if (ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("chromium/"))
    return "Safari";

  return "Outro";
}

export function getDeviceInfo(userAgent: string | null): {
  deviceType: string;
  os: string;
} {
  if (!userAgent) {
    return { deviceType: "Desconhecido", os: "Desconhecido" };
  }

  const ua = userAgent.toLowerCase();

  const isMobile =
    ua.includes("mobi") ||
    ua.includes("iphone") ||
    ua.includes("android") ||
    ua.includes("ipad");

  const deviceType = isMobile ? "Mobile / Tablet" : "Desktop";

  let os = "Desconhecido";
  if (ua.includes("windows nt")) os = "Windows";
  else if (ua.includes("mac os x")) os = "macOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios"))
    os = "iOS";
  else if (ua.includes("linux")) os = "Linux";

  return { deviceType, os };
}

