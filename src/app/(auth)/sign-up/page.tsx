"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string(),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

export default function SignUp() {
    const router = useRouter();

    const onSubmit = async (values: IForm) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/auth/signup", values, { withCredentials: true });


            if (response.status === 200) {
                toast.success('Registration successful!');
                router.push("/");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(`Error: ${error.response?.data.message || 'An error occurred'}`);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md transform transition-all ">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create an Account</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-6 text-black ">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 text-sm mt-2"
                                />
                            </div>

                            <div className="mb-6 text-black">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name (Optional)
                                </label>
                                <Field
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-500 text-sm mt-2"
                                />
                            </div>

                            <div className="mb-6 text-black">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-2"
                                />
                            </div>

                            <div className="mb-6 text-black">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm mt-2"
                                />
                            </div>


                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/sign-in" className="text-blue-600 hover:text-blue-500 font-semibold transition-all">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};