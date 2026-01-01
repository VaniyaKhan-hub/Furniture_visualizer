document.addEventListener('DOMContentLoaded', function () {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const productId = button.dataset.product;

            fetch(`/cart/addcart/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async res => {
                    if (res.status === 401) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Please Login First',
                            confirmButtonText: 'Go to Login'
                        }).then(result => {
                            if (result.isConfirmed) {
                                window.location.href = '/login';
                            }
                        });
                        return;
                    }

                    // Ensure content is JSON
                    const contentType = res.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("Server did not return JSON");
                    }

                    const data = await res.json();

                    if (data.status === "added") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Added to Cart',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-small-popup'
                            }
                        });
                    } else if (data.status === "updated") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Already in cart (Quantity Increased)',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-small-popup'
                            }
                        });
                    }
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: err.message
                    });
                });
        });
    });
});