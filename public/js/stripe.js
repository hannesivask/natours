/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';

export const bookTour = async (tourID) => {
  try {
    const stripe = Stripe(
      'pk_test_51OwOgR01ARg8RM0plvYaFgCaMGqYqznF3H0AQ49TupD3x1FbZW5DrTWCIm0NKqLkIqs4gRLdEtgfPQthzdVSCNbq00D37GPDcS',
    );

    // 1. get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`,
    );

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
