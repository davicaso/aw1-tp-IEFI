// Tests unitarios con el test runner nativo de Node (node:test).
// Se ejecutan con: npm test
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { filtrarProductos, ordenarProductos } from "../assets/js/filtros.js";

const productos = [
  { nombre: "Pan integral", precio: 3000, categoria: "Panificados", badges: ["Vegano", "Integral"], stock: { estado: "disponible" } },
  { nombre: "Semillas de chía", precio: 1500, categoria: "Semillas", badges: ["Sin TACC"], stock: { estado: "sin-stock" } },
  { nombre: "Almendras", precio: 5200, categoria: "Frutos secos", badges: ["Sin TACC", "Vegano"], stock: { estado: "ultimas" } },
];

const sinFiltros = { atributos: [], categorias: [], soloConStock: false, busqueda: "" };

describe("filtrarProductos", () => {
  test("sin filtros devuelve todos los productos", () => {
    assert.equal(filtrarProductos(productos, sinFiltros).length, 3);
  });

  test("busca por nombre sin importar mayúsculas", () => {
    const resultado = filtrarProductos(productos, { ...sinFiltros, busqueda: "PAN" });
    assert.deepEqual(resultado.map((p) => p.nombre), ["Pan integral"]);
  });

  test("excluye los productos sin stock", () => {
    const resultado = filtrarProductos(productos, { ...sinFiltros, soloConStock: true });
    assert.deepEqual(resultado.map((p) => p.nombre), ["Pan integral", "Almendras"]);
  });

  test("exige que el producto tenga todos los atributos elegidos", () => {
    const resultado = filtrarProductos(productos, { ...sinFiltros, atributos: ["Sin TACC", "Vegano"] });
    assert.deepEqual(resultado.map((p) => p.nombre), ["Almendras"]);
  });

  test("filtra por categoría", () => {
    const resultado = filtrarProductos(productos, { ...sinFiltros, categorias: ["Semillas"] });
    assert.deepEqual(resultado.map((p) => p.nombre), ["Semillas de chía"]);
  });
});

describe("ordenarProductos", () => {
  test("ordena por menor precio", () => {
    const resultado = ordenarProductos(productos, "Menor precio");
    assert.deepEqual(resultado.map((p) => p.precio), [1500, 3000, 5200]);
  });

  test("ordena por mayor precio", () => {
    const resultado = ordenarProductos(productos, "Mayor precio");
    assert.deepEqual(resultado.map((p) => p.precio), [5200, 3000, 1500]);
  });

  test("ordena por nombre A-Z", () => {
    const resultado = ordenarProductos(productos, "Nombre A-Z");
    assert.equal(resultado[0].nombre, "Almendras");
  });

  test("no modifica el array original", () => {
    ordenarProductos(productos, "Menor precio");
    assert.equal(productos[0].nombre, "Pan integral");
  });
});
