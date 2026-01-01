// Cart
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("change", async function () {
      const newQuantity = parseInt(this.value);
      const productid = this.getAttribute("data-productid");

      if (newQuantity < 1) {
        alert("Quantity must be at least 1.");
        this.value = 1;
        return;
      }

      try {
        const response = await fetch("/cart/update-quantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", // ✅ Sends session cookie
          body: JSON.stringify({
            productid: productid, // Replace with real product ID
            quantity: newQuantity
          })
        });

        console.log("Sending update for product:", productid, "with quantity:", newQuantity);

        const result = await response.json();
        if (result.success) {
          location.reload(); // Optional: Reload to update subtotal/total
        } else {
          alert("Failed to update quantity.");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    });
  });
});
