const seatLimit = 4;
const seatNumbers = "A1A2A2A3A4B1B2B3B4C1C2C3C4D1D2D3D4E1E2E3E4F1F2F3F4G1G2G3G4H1H2H3H4I1I2I3I4J1J2J3J4";

const seatIds = seatNumbers.match(/[A-Z]\d+/g);

let clickCount = 0;

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

function deselectSeat(seatElement) {
    seatElement.classList.remove('bg-green');
    seatElement.classList.add('bg-light-gray');

    const seatDetailsToRemove = Array.from(document.querySelectorAll('#ticketdetails h3 span:first-child'))
        .find(span => span.textContent === seatElement.textContent).parentNode.parentNode;
    seatDetailsToRemove.parentNode.removeChild(seatDetailsToRemove);

    clickCount--;
}

function selectSeat(seatElement, seatId) {
    seatElement.classList.remove('bg-light-gray');
    seatElement.classList.add('bg-green');

    const seatDetails = document.createElement('div');
    seatDetails.innerHTML = `<h3 class="flex text-base font-medium justify-between">
                                <span>${seatId}</span>
                                <span>Economy</span>
                                <span>550</span>
                            </h3>`;
    document.getElementById('ticketdetails').appendChild(seatDetails);

    clickCount++;
}

function handleInvalidSeatSelection() {
    if (clickCount >= seatLimit) {
        document.getElementById('warning').classList.remove('hidden');
    }
    console.log("Invalid seat clicked");
}







// document.addEventListener('DOMContentLoaded', function () {
//     // Get the elements for seat selection
//     const seatContainer = document.getElementById('seat-container');
//     const warningMessage = document.getElementById('warning');

//     // Get the elements for ticket details
//     const seatNumberElement = document.getElementById('seatNumber');
//     const totalAmountElement = document.querySelector('.flex.justify-between.text-base.mt-4.font-medium span:last-child');
//     const passengerNameInput = document.querySelector('input[placeholder="Enter your name"]');
//     const phoneNumberInput = document.querySelector('input[placeholder="Enter your phone number"]');
//     const emailInput = document.querySelector('input[placeholder="Enter your email id"]');

//     // Initialize variables for seat selection
//     let selectedSeats = [];
//     const maxSeatsAllowed = 4;

//     // Function to update ticket details
//     function updateTicketDetails() {
//         // Display warning if more than 4 seats are selected
//         if (selectedSeats.length > maxSeatsAllowed) {
//             warningMessage.style.display = 'block';
//         } else {
//             warningMessage.style.display = 'none';
//         }

//         // Update seat number and total amount
//         seatNumberElement.textContent = selectedSeats.join(', ');
//         totalAmountElement.textContent = `BDT ${selectedSeats.length * 550}`; // Assuming price per seat is 550, adjust accordingly
//     }

//     // Function to handle seat selection
//     function handleSeatSelection(seatId) {
//         // Toggle seat selection
//         const seatIndex = selectedSeats.indexOf(seatId);
//         if (seatIndex === -1) {
//             // Seat not selected, add it
//             selectedSeats.push(seatId);
//         } else {
//             // Seat already selected, remove it
//             selectedSeats.splice(seatIndex, 1);
//         }

//         // Update ticket details
//         updateTicketDetails();
//     }

//     // Add event listener for seat selection
//     seatContainer.addEventListener('click', function (event) {
//         const target = event.target;
//         if (target.tagName === 'KBD' && target.id) {
//             // Clicked on a seat element
//             handleSeatSelection(target.id);
//         }
//     });

//     // Function to handle form submission
//     function handleFormSubmission(event) {
//         event.preventDefault();

//         // Validate form fields before proceeding
//         if (selectedSeats.length === 0 || selectedSeats.length > maxSeatsAllowed) {
//             // Display an alert or message indicating the issue
//             alert('Please select between 1 and 4 seats.');
//             return;
//         }

//         // Gather user details for further processing
//         const passengerName = passengerNameInput.value;
//         const phoneNumber = phoneNumberInput.value;
//         const email = emailInput.value;

//         // Perform further processing or submit the form data as needed

//         // For demonstration purposes, log the details to the console
//         console.log('Selected Seats:', selectedSeats);
//         console.log('Passenger Name:', passengerName);
//         console.log('Phone Number:', phoneNumber);
//         console.log('Email:', email);

//         // You can now proceed with additional logic, such as submitting the data to a server, etc.
//     }

//     // Add event listener for form submission
//     const form = document.querySelector('form');
//     form.addEventListener('submit', handleFormSubmission);
// });
