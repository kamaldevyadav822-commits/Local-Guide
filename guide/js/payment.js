// =====================================
// Payment & Journey Simulator
// =====================================

window.renderJourneyActions =
function(booking){

    const activeBooking =
        document.getElementById(
            "activeBooking"
        );

    if(!activeBooking) return;

    activeBooking.innerHTML = `

    <div class="request-card">

        <h3>
            Journey Controls
        </h3>

        <p>
            Traveler:
            ${booking.travelerName}
        </p>

        <div class="request-actions">

            <button
                class="accept-btn"
                onclick="startTour()">
                Start Tour
            </button>

        </div>

        <div class="request-actions">

            <button
                class="accept-btn"
                onclick="completeTour()">
                Complete Tour
            </button>

        </div>

        <div class="request-actions">

            <input
                id="paymentAmount"
                type="number"
                placeholder="Amount Received"
                style="
                    width:100%;
                    padding:12px;
                    border-radius:12px;
                    border:none;
                    margin-bottom:10px;
                "
            />

        </div>

        <div class="request-actions">

            <button
                class="accept-btn"
                onclick="confirmPayment()">
                Confirm Payment
            </button>

        </div>

        <div class="request-actions">

            <button
                class="reject-btn"
                onclick="closeJourney()">
                Close Journey
            </button>

        </div>

    </div>

    `;
};

// ----------------------------------
// Action Triggers
// ----------------------------------

window.startTour = function(){

    if(window.updateJourneyState){

        window.updateJourneyState(
            "started"
        );
    }
};

window.completeTour = function(){

    if(window.updateJourneyState){

        window.updateJourneyState(
            "completed"
        );
    }
};

window.confirmPayment =
function(){

    const amountInput =
        document.getElementById(
            "paymentAmount"
        );

    const amount =
        Number(
            amountInput?.value || 0
        );

    if(amount <= 0){

        alert(
            "Enter payment amount"
        );

        return;
    }

    if(
        window.updatePaymentState
    ){

        window.updatePaymentState({
            confirmed:true,
            amount:amount,
            method:"cash"
        });
    }
};

window.closeJourney =
function(){

    if(window.updateJourneyState){

        window.updateJourneyState(
            "closed"
        );
    }
};
