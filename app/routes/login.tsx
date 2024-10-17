import {redirect} from "@remix-run/node";
import {Form, useActionData} from "@remix-run/react";
import {redirectIfLoggedInLoader, setAuthOnResponse} from "~/lib/auth";
import {loginUser} from "~/models/user.server";

export const loader = redirectIfLoggedInLoader;

interface ActionData {
    error?: string;
}

export const action = async ({request}: {request: any}) => {
    try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        const user = await loginUser(email, password);
        return setAuthOnResponse(redirect("/home"), user.id.toString());
    } catch (error: any) {
        return {error: error.message};
    }
};

export default function Login() {
    const actionData = useActionData<ActionData>();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foreground to-primary dark:bg-gradient-to-br dark:from-background dark:to-accent p-8 text-text">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
                <Form method="post" className="space-y-6">
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
                        />
                    </div>
                    {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Log In
                    </button>
                </Form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <a href="/register" className="text-accent hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
