import {Link} from "@remix-run/react";

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center min-h-screen bg-gradient-to-br from-foreground to-primary dark:bg-gradient-to-br dark:from-background dark:to-accent p-8 text-text">
            <div className="flex flex-col items-center gap-8">
                <header className="flex flex-col items-center gap-5">
                    <h1 className="text-4xl font-bold">Bienvenido a tu Gestor de Tareas</h1>
                    <p className="text-lg opacity-70">Organiza tus proyectos de manera efectiva</p>
                </header>
                <nav className="flex flex-col items-center gap-4">
                    <ul className="flex flex-wrap gap-4">
                        <li>
                            <Link
                                to="/login"
                                className="block p-4 rounded-lg border bg-background no-underline hover:scale-105 border-gray-200 text-text dark:border-gray-700"
                            >
                                Iniciar Sesión
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="block p-4 rounded-lg border bg-background text-text hover:scale-105 border-gray-200 dark:border-gray-700"
                            >
                                Registrarse
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
