
document.addEventListener('DOMContentLoaded', function () {
    const wishLinks = document.querySelectorAll('.wishlist-toggle');

    wishLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const icon = link.querySelector('i');
            const productId = link.dataset.product;
            const isAdding = icon.classList.contains('fa-regular');

            fetch(`/wishlist/${isAdding ? 'add' : 'remove'}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async res => {
                    // This catches 401 from controller
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

                    const data = await res.json();

                    if (isAdding) {
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');

                        Swal.fire({
                            icon: 'success',
                            title: data.message || 'Added to Wishlist',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: {
                                popup: 'swal2-small-popup'
                            }
                        });
                    } else {
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');

                        Swal.fire({
                            icon: 'info',
                            title: data.message || 'Removed from Wishlist',
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

