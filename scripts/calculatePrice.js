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

// coupon part

document.getElementById("applyCouponBtn").addEventListener("click", applyCoupon);

function applyCoupon() {
    const couponCode = document.getElementById("applyCoupon").value;
    const totalAmount = parseFloat(document.getElementById("totalamount").innerText);

    let isValidCoupon = false;

    for (let i = 0; i < 2; i++) {
        const couponCodes = ["NEW15", "Couple 20"];
        const discountPercentages = [15, 20];

        if (couponCode === couponCodes[i]) {
            applyDiscount(discountPercentages[i], totalAmount);
            isValidCoupon = true;
            break;
        }
    }

    if (!isValidCoupon) {
        alert("Invalid coupon code. Please try again.");
    }
}

function applyDiscount(discountPercentage, totalAmount) {

    const discountAmount = (discountPercentage / 100) * totalAmount;
    const discountedTotal = totalAmount - discountAmount;

    document.getElementById("grandtotal").innerText = discountedTotal.toFixed(2);
}




