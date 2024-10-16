import {redirect} from "@remix-run/node";
import {Form, useActionData} from "@remix-run/react";
import {redirectIfLoggedInLoader, setAuthOnResponse} from "~/lib/auth";
import {registerUser} from "~/models/user.server";

export const loader = redirectIfLoggedInLoader;

interface ActionData {
    error?: string;
}

export const action = async ({request}: {request: any}) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await registerUser(email, name, password);
    return setAuthOnResponse(redirect("/home"), user.id.toString());
};

export default function Register() {
    const actionData = useActionData<ActionData>();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foreground to-primary dark:bg-gradient-to-br dark:from-background dark:to-accent p-8 text-text">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <Form method="post" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Register
                        </button>
                    </div>
                </Form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
