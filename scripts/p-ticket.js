const seatLimit = 4;
const seatNumbers = "A1A2A3A4B1B2B3B4C1C2C3C4D1D2D3D4E1E2E3E4F1F2F3F4G1G2G3G4H1H2H3H4I1I2I3I4J1J2J3J4";
const seatIds = [];

for (let i = 0; i < seatNumbers.length; i += 2) {
    const row = seatNumbers[i];
    const seatNumber = seatNumbers.slice(i + 1, i + 2);
    const seatId = row + seatNumber;

    seatIds.push(seatId);
}

console.log(seatIds);


let clickCount = 0;

const ticketPrice = 550;

document.addEventListener('click', handleSeatSelection);

function handleSeatSelection(event) {
    const clickedSeatId = event.target.textContent;
    const clickedSeatElement = event.target;

    const isSeatSelected = clickedSeatElement.classList.contains('bg-green');

    if (seatIds.includes(clickedSeatId)) {
        if (isSeatSelected && clickCount > 0) {
            deselectSeat(clickedSeatElement);
        }
        else if (!isSeatSelected && clickCount < seatLimit) {
            selectSeat(clickedSeatElement, clickedSeatId);
        }
    }
    else {
        handleInvalidSeatSelection();
    }
}

function selectSeat(seatElement, seatId) {
    seatElement.classList.remove('bg-light-gray');
    seatElement.classList.add('bg-green');

    const seatDetails = document.createElement('div');
    seatDetails.innerHTML = `<h3 class="flex text-base font-medium justify-between"><span>${seatId}</span><span>Economy</span><span>${ticketPrice}</span></h3>`;

    document.getElementById('ticketdetails').appendChild(seatDetails);
    clickCount++;
    document.dispatchEvent(new Event('seatSelected'));

    document.getElementById('ticketcount').textContent = clickCount;

    document.dispatchEvent(new Event('seatSelected'));
}

function deselectSeat(seatElement) {
    seatElement.classList.remove('bg-green');
    seatElement.classList.add('bg-light-gray');

    const seatDetailsToRemove = Array.from(document.querySelectorAll('#ticketdetails h3 span:first-child'))
        .find(span => span.textContent === seatElement.textContent).parentNode.parentNode;
    seatDetailsToRemove.parentNode.removeChild(seatDetailsToRemove);

    clickCount--;

    document.dispatchEvent(new Event('seatDeselected'));

    document.getElementById('ticketcount').textContent = clickCount;

    document.dispatchEvent(new Event('seatDeselected'));
}

function handleInvalidSeatSelection() {
    if (clickCount >= seatLimit) {
        document.getElementById('warning').classList.remove('hidden');
    }
}

// calculate total price of the ticket

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

    const couponCode = document.getElementById("applyCoupon").value;
    const totalAmount = parseFloat(document.getElementById("totalamount").innerText);

    let isValidCoupon = false;

    // check coupon
    for (let i = 0; i < 2; i++) {
        const couponCodes = ["NEW15", "Couple 20"];
        const discountPercentages = [15, 20];

        if (couponCode === couponCodes[i]) {
            applyDiscount(discountPercentages[i], totalAmount);
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

// apply the coupon price in grand total

function applyDiscount(discountPercentage, totalAmount) {

    const discountAmount = (discountPercentage / 100) * totalAmount;
    const discountedTotal = totalAmount - discountAmount;

    document.getElementById("grandtotal").innerText = discountedTotal.toFixed(2);
}

