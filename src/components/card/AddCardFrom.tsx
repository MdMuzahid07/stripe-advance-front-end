"use client";
import { Button } from '@headlessui/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddCardForm() {
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe not loaded yet");
            setLoading(false);
            return;
        }

        try {
            const card = elements.getElement(CardElement);

            if (card == null) {
                toast.error("Card element not found!");
                setLoading(false);
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card,
            });

            if (error) {
                setLoading(false);
                toast.error(error?.message || "Something went wrong!");
                console.log('[error]', error);
                return;
            }

            const res = await axios.post("http://localhost:3001/api/v1/card/save-card", {
                paymentMethodId: paymentMethod?.id,
            }, { withCredentials: true });

            if (res.data.success) {
                toast.success("Card saved successfully!");
            } else {
                toast.error("Failed to save card!");
            }

        } catch (error) {
            console.log(error);
            toast.error("An error occurred while saving the card.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full border border-slate-200  min-h-[200px] relative rounded-lg text-black bg-white p-6 backdrop-blur-2xl">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="absolute bottom-6 right-6">
                    <Button
                        type="submit"
                        disabled={!stripe || loading}
                        className="mt-4 flex items-center justify-center w-full max-w-96 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? "Saving..." : "Save Card"}
                    </Button>
                </div>
            </form>
        </div>
    );
}