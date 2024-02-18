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


