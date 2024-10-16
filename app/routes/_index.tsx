import {MetaFunction, Link} from "@remix-run/react";

export const meta: MetaFunction = () => [{title: "Gestor de Tareas"}, {name: "description", content: "Gestión de tareas estilo Trello"}];

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
                            <Link to="/auth/login" className="block p-4 rounded-lg border border-gray-200 text-accent hover:underline dark:border-gray-700">
                                Iniciar Sesión
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/register" className="block p-4 rounded-lg border border-gray-200 text-accent hover:underline dark:border-gray-700">
                                Registrarse
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
