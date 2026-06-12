const products = [
  { id: 1, name: "Camisa de Lino", category: "apparel", price: 89.00, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80", badge: "Nuevo" },
  { id: 2, name: "Reloj Minimalista", category: "accessories", price: 145.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80", badge: null },
  { id: 3, name: "Set de Jarrones de Cerámica", category: "home", price: 55.00, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80", badge: "Oferta" },
  { id: 4, name: "Bufanda de Seda", category: "accessories", price: 65.00, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80", badge: null },
  { id: 5, name: "Suéter de Algodón", category: "apparel", price: 110.00, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a80?w=600&q=80", badge: "Nuevo" },
  { id: 6, name: "Trío de Velas Aromáticas", category: "beauty", price: 42.00, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1602523961355-8b5e7bd85ed1?w=600&q=80", badge: null },
  { id: 7, name: "Bolso de Cuero", category: "accessories", price: 195.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80", badge: "Más Vendido" },
  { id: 8, name: "Camiseta de Algodón Orgánico", category: "apparel", price: 38.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80", badge: null },
  { id: 9, name: "Set de Vajilla de Gres", category: "home", price: 120.00, image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80", badge: "Oferta" },
  { id: 10, name: "Serum Facial", category: "beauty", price: 48.00, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1570194065650-d99fb4b38c34?w=600&q=80", badge: null },
  { id: 11, name: "Blazer de Lana", category: "apparel", price: 175.00, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", badge: null },
  { id: 12, name: "Difusor de Bambú", category: "beauty", price: 36.00, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600&q=80", badge: "Nuevo" },
  { id: 13, name: "Mochila de Cuero", category: "accessories", price: 158.00, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", badge: "Nuevo" },
  { id: 14, name: "Lámpara de Mesa", category: "home", price: 72.00, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80", badge: "Nuevo" },
  { id: 15, name: "Set de Mascarillas", category: "beauty", price: 28.00, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80", badge: "Nuevo" },
  { id: 16, name: "Pantalón de Lino", category: "apparel", price: 98.00, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80", badge: "Nuevo" },
];

function getFeaturedProducts() {
  return products.filter(p => p.badge === "Nuevo" || p.badge === "Más Vendido" || p.badge === "Oferta").slice(0, 8);
}
