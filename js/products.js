const products = [
  { id: 1, name: "Camisa de Lino", category: "apparel", price: 89.00, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80", badge: "Nuevo" },
  { id: 2, name: "Reloj Minimalista", category: "accessories", price: 145.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80", badge: null },
  { id: 3, name: "Set de Jarrones de Cerámica", category: "home", price: 55.00, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80", badge: "Oferta" },
  { id: 4, name: "Bufanda de Seda", category: "accessories", price: 65.00, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80", badge: null },
  { id: 5, name: "Suéter de Algodón", category: "apparel", price: 110.00, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80", badge: "Nuevo" },
  { id: 6, name: "Trío de Velas Aromáticas", category: "beauty", price: 42.00, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80", badge: null },
  { id: 7, name: "Bolso de Cuero", category: "accessories", price: 195.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", badge: "Más Vendido" },
  { id: 8, name: "Camiseta de Algodón Orgánico", category: "apparel", price: 38.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", badge: null },
  { id: 9, name: "Set de Vajilla de Gres", category: "home", price: 120.00, image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&q=80", badge: "Oferta" },
  { id: 10, name: "Serum Facial", category: "beauty", price: 48.00, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80", badge: null },
  { id: 11, name: "Blazer de Lana", category: "apparel", price: 175.00, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", badge: null },
  { id: 12, name: "Difusor de Bambú", category: "beauty", price: 36.00, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80", badge: "Nuevo" },
];

function getFeaturedProducts() {
  return products.filter(p => p.badge === "Nuevo" || p.badge === "Más Vendido" || p.badge === "Oferta").slice(0, 4);
}
