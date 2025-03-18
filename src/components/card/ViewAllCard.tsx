"use client";

import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import AddCardForm from "./AddCardFrom"; // Ensure the correct file path
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51Ps4QrIpcZgg2ccjzbz1tm3QoBxDKCtdXBBWzj8m01zQ8qUCd7PRm74fG2gmXAbRQC6WpS8Y1TJmIlsrjPp41aRb00sSaXGkR0");






export function ViewAllCard() {
    const [isAddCard, setIsAddCard] = useState(false);
    const [allCards, setAllCards] = useState([]);
    console.log(allCards);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/v1/card", { withCredentials: true });
                setAllCards(res?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="text-black relative bg-slate-50 p-6 min-h-[500px] rounded-lg shadow-sm border border-slate-200">

            <div className="max-h-[400px] overflow-y-auto space-y-6">
                {!isAddCard ? (
                    // Render saved cards list
                    allCards?.map((card) => (
                        <div key={card.id} className="rounded-lg border border-slate-200 bg-white">
                            <div className="p-0">
                                <div className="flex items-center p-4 md:p-6">
                                    <div className="flex items-center space-x-4 flex-grow">
                                        {/* Generic card icon */}
                                        <div className="bg-muted rounded-md p-2">
                                            <CreditCard className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <span className="font-medium">
                                                    {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• {card.last4}
                                                </span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Expires {card.expMonth}/{card.expYear}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Elements stripe={stripePromise}>
                        <AddCardForm />
                    </Elements>
                )}

            </div>
            <div className="absolute bottom-6 left-6">
                <button
                    onClick={() => setIsAddCard(!isAddCard)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    {isAddCard ? "View Saved Cards" : "Add New Card"}
                </button>
            </div>
        </div>
    );
}