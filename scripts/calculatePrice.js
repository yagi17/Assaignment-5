document.addEventListener('seatSelected', updateTotalAmount);
document.addEventListener('seatDeselected', updateTotalAmount);

function updateTotalAmount() {
    const selectedSeats = document.querySelectorAll('#ticketdetails h3 span:first-child');
    const totalAmountElement = document.getElementById('totalamount');


    const totalAmount = Array.from(selectedSeats).reduce((total, seat) => {
        const seatPrice = ticketPrice;
        return total + parseInt(seatPrice);
    }, 0);

    totalAmountElement.textContent = totalAmount;

    if (selectedSeats.length === 4) {
        applyCouponBtn.removeAttribute('disabled');
    } else {
        applyCouponBtn.setAttribute('disabled', true);
    }

};

// apply coupon

function applyCoupon() {
    const totalAmountElement = document.getElementById('totalamount');
    const grandTotalElement = document.getElementById('grandtotal');
    const couponInput = document.getElementById('couponInput');
    const errorElement = document.getElementById('invalidcoupon');

    let totalAmount = parseInt(totalAmountElement.textContent);
    let discount = 0;

    // Check if the NEW15 coupon is applied
    if (couponInput.value.toLowerCase() === 'new15') {
        discount = 0.15; // 15% discount
    }
    // Check if the Couple20 coupon is applied
    else if (couponInput.value.toLowerCase() === 'couple20') {
        discount = 0.20; // 20% discount
    }

    const discountedAmount = totalAmount * discount;
    const grandTotal = totalAmount - discountedAmount;

    grandTotalElement.innerText = grandTotal.toFixed(2);
}
