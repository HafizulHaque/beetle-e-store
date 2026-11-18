const BD_MOBILE = /^01[3-9]\d{8}$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export function isBdMobile(value: string): boolean {
  return BD_MOBILE.test(normalizePhone(value));
}
