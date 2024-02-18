const seatLimit = 4;
const seatNumbers = "A1A2A2A3A4B1B2B3B4C1C2C3C4D1D2D3D4E1E2E3E4F1F2F3F4G1G2G3G4H1H2H3H4I1I2I3I4J1J2J3J4";

const seatIds = seatNumbers.match(/[A-Z]\d+/g);

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
        } else if (!isSeatSelected && clickCount < seatLimit) {
            selectSeat(clickedSeatElement, clickedSeatId);
        }
    } else {
        handleInvalidSeatSelection();
    }
}

function selectSeat(seatElement, seatId) {
    seatElement.classList.remove('bg-light-gray');
    seatElement.classList.add('bg-green');

    const seatDetails = document.createElement('div');
    seatDetails.innerHTML = `<h3 class="flex text-base font-medium justify-between">
                                <span>${seatId}</span>
                                <span>Economy</span>
                                <span>${ticketPrice}</span>
                            </h3>`;
    document.getElementById('ticketdetails').appendChild(seatDetails);

    clickCount++;

    // Dispatch custom event indicating seat selection
    document.dispatchEvent(new Event('seatSelected'));
}

function deselectSeat(seatElement) {
    seatElement.classList.remove('bg-green');
    seatElement.classList.add('bg-light-gray');

    const seatDetailsToRemove = Array.from(document.querySelectorAll('#ticketdetails h3 span:first-child'))
        .find(span => span.textContent === seatElement.textContent).parentNode.parentNode;
    seatDetailsToRemove.parentNode.removeChild(seatDetailsToRemove);

    clickCount--;

    // Dispatch custom event indicating seat deselection
    document.dispatchEvent(new Event('seatDeselected'));
}

function handleInvalidSeatSelection() {
    if (clickCount >= seatLimit) {
        document.getElementById('warning').classList.remove('hidden');
    }
}
