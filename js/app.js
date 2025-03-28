const API_URL = "https://api.hyperteknoloji.com.tr/products/list";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpblR5cGUiOiIxIiwiQ3VzdG9tZXJJRCI6IjU1NzI0IiwiRmlyc3ROYW1lIjoiRGVtbyIsIkxhc3ROYW1lIjoiSHlwZXIiLCJFbWFpbCI6ImRlbW9AaHlwZXIuY29tIiwiQ3VzdG9tZXJUeXBlSUQiOiIzMiIsIklzUmVzZWxsZXIiOiIwIiwiSXNBUEkiOiIxIiwiUmVmZXJhbmNlSUQiOiIiLCJSZWdpc3RlckRhdGUiOiIzLzI1LzIwMjUgMTowMDo0OCBQTSIsImV4cCI6MjA1NDIyNzA1MiwiaXNzIjoiaHR0cHM6Ly9oeXBlcnRla25vbG9qaS5jb20iLCJhdWQiOiJodHRwczovL2h5cGVydGVrbm9sb2ppLmNvbSJ9.e_-ZGGQ6yOwKkFvsQuJLwRnWA4IIM4lFMK2w9N6Vz4k"; // ← BURAYA token'ı yapıştır

const productList = document.getElementById("product-list");
const noProductsMessage = document.getElementById("none-products");

async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
        method:'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.data)

    if (!data.data || data.data.length === 0) {
        //eğer gelen data boş ise ilgili elementteki hidden stillendirmesi kalkacak
      noProductsMessage.classList.remove("hidden");
      return;
    }

    // Ürünleri oluştur
    data.data.slice(0, 9).forEach(product => {
      const card = createProductCard(product);
      productList.appendChild(card);
    });

  } catch (error) {
    console.error("Ürünler alınırken hata oluştu:", error);
    noProductsMessage.textContent = "Ürünler yüklenirken bir hata oluştu.";
    noProductsMessage.classList.remove("hidden");
  }
}

function createProductCard(product) {
    //div elementi oluşturma
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg overflow-hidden";
  
    const imageUrl = product.productData?.productMainImage || "https://via.placeholder.com/300x200?text=No+Image";
    const name = product.productName || "Ürün adı yok";
    const price = product.salePrice || "Fiyat yok";
  
    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-800">${name}</h2>
        <p class="text-red-500 font-bold mt-2">${price} TL</p>
        <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Detay</button>
      </div>
    `;
  
    return card;
  }
fetchProducts();
