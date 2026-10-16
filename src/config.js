// Número internacional, solo dígitos (ejemplo de formato: código de país + número).
// Dejar vacío hasta disponer del número real de atención.
export const contactConfig = { whatsappNumber: '' };
export function whatsappUrl(message='Hola, quiero recibir orientación de Cupido Negro.') {
  const number=contactConfig.whatsappNumber;
  return /^\d{8,15}$/.test(number)?`https://wa.me/${number}?text=${encodeURIComponent(message)}`:null;
}
