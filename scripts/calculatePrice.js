document.addEventListener('DOMContentLoaded', function () {
    const selectedSeats = [];
    const totalAmountElement = document.getElementById('totalamount');
    const applyCouponBtn = document.getElementById('applyCouponBtn');

    document.addEventListener('seatSelected', updateTotalAmount);
    document.addEventListener('seatDeselected', updateTotalAmount);

    function updateTotalAmount() {
        const selectedSeats = document.querySelectorAll('#ticketdetails h3 span:first-child');
        const totalAmountElement = document.getElementById('totalamount');

        // Calculate total amount
        const totalAmount = Array.from(selectedSeats).reduce((total, seat) => {
            const seatDetails = seat.parentNode.parentNode;
            const seatPrice = seatDetails.querySelector('span:last-child').textContent;
            return total + parseInt(seatPrice);
        }, 0);

        totalAmountElement.textContent = totalAmount;

        if (selectedSeats.length === 4) {
            applyCouponBtn.removeAttribute('disabled');
        }
        else {
            applyCouponBtn.setAttribute('disabled', true);
        }
    }
});

// Apply coupon and calculate grand total

document.getElementById("applyCouponBtn").addEventListener("click", applyCoupon);

function applyCoupon() {

    const couponCode = prompt("Enter coupon code:");
    const totalAmount = parseFloat(totalAmountElement.innerText);

    let isValidCoupon = false;

    // check coupon
    for (let i = 0; i < 2; i++) {

        const couponCodes = ["NEW15", "Couple20"];
        const discountPercentages = [15, 20];

        if (couponCode === couponCodes[i]) {

            const discountAmount = (discountPercentages[i] / 100) * totalAmount;
            const discountedTotal = totalAmount - discountAmount;
            document.getElementById("grandtotal").innerText = discountedTotal.toFixed(2);

            isValidCoupon = true;
            break;
        }
    }

    // if coupon is not matched
    if (!isValidCoupon) {
        alert("Invalid coupon code. Please try again.");
    }
}