"use client";
import { useState } from "react";
import AddDeposit from "./AddDeposit";

export default function ViewDeposit() {
    const [isDepositClicked, setIsDepositClicked] = useState(false);


    return (
        <div className="text-black relative bg-slate-50 p-6 min-h-[400px] rounded-lg shadow-sm border border-slate-200">
            <h1 className="text-xl">Deposit / TopUp Balance</h1>

            {
                !isDepositClicked ? (<div>
                    <h1 className="text-xl font-bold mt-10 bg-slate-100 rounded-full px-4 py-2 ">${100}</h1>
                </div>) : (
                    <AddDeposit />
                )
            }

            <div className="absolute bottom-6 left-6">
                <button
                    onClick={() => setIsDepositClicked(!isDepositClicked)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    {isDepositClicked ? "View Balance" : "Deposit"}
                </button>
            </div>
        </div>
    )
}
