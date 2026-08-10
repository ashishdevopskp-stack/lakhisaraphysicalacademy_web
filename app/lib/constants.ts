export const PHONE_NUMBER = "917739776471";
export const PHONE_NUMBER_ALT = "917903594008";
export const PHONE_NUMBER_MAHESH = "917903594008";
export const EMAIL = "ganeshkumar90067@gmail.com";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy";
export const WHATSAPP_DEFAULT_MESSAGE = encodeURIComponent(
  "Hi, I'd like to know more about admission at Lakhisarai Physical Academy."
);
export const WHATSAPP_MAHESH_MESSAGE = encodeURIComponent(
  "Hi Coach Mahesh Sir, I would like to ask a question regarding physical training and running."
);
export const ADDRESS =
  "K.R.K Field, Near Lakhisarai Railway Station, Nawada Sikandara Road, Lakhisarai, Bihar – 811311";


export function whatsappHref(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE_NUMBER}?text=${message}`;
}
export function maheshWhatsappHref(message = WHATSAPP_MAHESH_MESSAGE) {
  return `https://wa.me/${PHONE_NUMBER_MAHESH}?text=${message}`;
}
export function telHref(number = PHONE_NUMBER) {
  return `tel:+${number}`;
}
