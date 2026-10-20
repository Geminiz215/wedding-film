// Nama tamu dari URL, contoh: /?to=Nadya+%26+Raka  (atau ?guest=...)
export function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('to') || params.get('guest');
}
