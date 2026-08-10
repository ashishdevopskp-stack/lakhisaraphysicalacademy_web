export const PHONE_NUMBER = "917739776471";
export const PHONE_NUMBER_ALT = "917903594008";
export const EMAIL = "ganeshkumar90067@gmail.com";
export const WHATSAPP_DEFAULT_MESSAGE = encodeURIComponent(
  "Hi, I'd like to know more about admission at Lakhisarai Physical Academy."
);
export const ADDRESS =
  "K.R.K. Ground, Near Lakhisarai Railway Station, Nawada Sikandara Road, Lakhisarai, Bihar – 811311";

export function whatsappHref(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE_NUMBER}?text=${message}`;
}
export function telHref(number = PHONE_NUMBER) {
  return `tel:+${number}`;
}