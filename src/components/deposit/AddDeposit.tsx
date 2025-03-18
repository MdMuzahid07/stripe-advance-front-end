import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";

interface ISignInForm {
    saveCardId: string;
    amount: string;
};

const validationSchema = Yup.object({
    saveCardId: Yup.string().required("Saved card id is required"),
    amount: Yup.string().required("Amount must be added"),
});

const initialValues = {
    saveCardId: "",
    amount: "",
};


export default function AddDeposit() {

    const onSubmit = async (values: ISignInForm) => {
        try {
            console.log(values)
            const response = await axios.post("http://localhost:3001/api/v1/deposit/add-deposit", {
                saveCardId: values?.saveCardId,
                amount: values?.amount
            }, { withCredentials: true });


            if (response.status === 200) {
                toast.success("Deposit Successfully!");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(`Error: ${error.response?.data.message || "An error occurred"}`);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-6 text-black mt-6">
                            <label htmlFor="saveCardId" className="block text-sm font-medium text-gray-700 mb-2">
                                Saved Card Id
                            </label>
                            <Field
                                type="test"
                                id="saveCardId"
                                name="saveCardId"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-2"
                            />
                        </div>

                        <div className="mb-8 text-black">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                Amount
                            </label>
                            <Field
                                type="text"
                                id="amount"
                                name="amount"
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <ErrorMessage
                                name="amount"
                                component="div"
                                className="text-red-500 text-sm mt-2"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className=" bg-blue-500 w-32 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            >
                                Add
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
