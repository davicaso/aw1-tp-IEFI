import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { crearLinkWhatsapp, armarMensajePedido } from "../assets/js/whatsapp.js";

describe("crearLinkWhatsapp", () => {
  test("arma el enlace wa.me con el texto codificado", () => {
    const link = crearLinkWhatsapp("Hola Nutrite!", "5493511234567");
    assert.equal(link, "https://wa.me/5493511234567?text=Hola%20Nutrite!");
  });
});

describe("armarMensajePedido", () => {
  test("incluye pedido, productos, total y datos del cliente", () => {
    const mensaje = armarMensajePedido({
      numeroPedido: "NUT-123456",
      items: [{ nombre: "Almendras", cantidad: 2 }],
      total: "$10.400",
      cliente: { nombre: "Matías", telefono: "3511234567", email: "m@mail.com" },
      entrega: "Moto",
      pago: "Transferencia",
    });
    assert.match(mensaje, /NUT-123456/);
    assert.match(mensaje, /- Almendras x2/);
    assert.match(mensaje, /Total: \$10\.400/);
    assert.match(mensaje, /Matías - Tel: 3511234567/);
  });
});
