"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ISignInForm {
    email: string;
    password: string;
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const initialValues = {
    email: "",
    password: "",
};

export default function SignIn() {
    const router = useRouter();

    const onSubmit = async (values: ISignInForm) => {
        try {

            const response = await axios.post("http://localhost:3001/api/v1/auth/login", values);


            if (response.status === 200) {
                toast.success('SignIn successful!');
                localStorage.setItem("user", JSON.stringify(response?.data?.data));
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
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Please Sign In</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
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

                            <div className="mb-8 text-black">
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
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a href="/sign-up" className="text-blue-600 hover:text-blue-500 font-semibold transition-all">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};