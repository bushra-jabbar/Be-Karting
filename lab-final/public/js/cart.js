document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  // public/js/cart.js
async function addToCart(productId) {
    try {
        const response = await fetch(`/products/add-to-cart/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        
        if (response.ok) {
            alert("✅ " + data.message); // Success Message
            location.reload(); // Cart count update karne ke liye refresh karein
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;

      try {
        const res = await fetch(`/products/add-to-cart/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();

        alert("Product added to cart!");
        console.log("Cart:", data.cart);
      } catch (err) {
        console.error("Add to cart failed", err);
      }
    });
  });
});
