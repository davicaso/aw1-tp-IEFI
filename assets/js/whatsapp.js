// Módulo WhatsApp: arma los mensajes y el enlace wa.me.
// Son funciones puras (no tocan el DOM), por eso se pueden testear con Node.

import { NUMERO_WHATSAPP } from "./config.js";

export function crearLinkWhatsapp(texto, numero = NUMERO_WHATSAPP) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

// items: [{ nombre, cantidad }]
export function armarMensajePedido({ numeroPedido, items, total, cliente, entrega, pago }) {
  const lineas = items.map((item) => `- ${item.nombre} x${item.cantidad}`);
  return [
    `¡Hola Nutrite! Quiero confirmar mi pedido ${numeroPedido}:`,
    ...lineas,
    `Total: ${total}`,
    `Entrega: ${entrega}`,
    `Pago: ${pago}`,
    `Cliente: ${cliente.nombre} - Tel: ${cliente.telefono} - ${cliente.email}`,
  ].join("\n");
}

export function armarMensajeContacto({ nombre, email, motivo, mensaje }) {
  return `¡Hola Nutrite! Soy ${nombre} (${email}).\nMotivo: ${motivo}\n${mensaje}`;
}
