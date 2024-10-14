import type {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [{title: "Gestor de Tareas"}, {name: "description", content: "Gestión de tareas estilo Trello"}];
};

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <header className="flex flex-col items-center gap-5">
                    <h1 className="text-4xl font-bold">Bienvenido a tu Gestor de Tareas</h1>
                    <p className="text-lg opacity-70">Organiza tus proyectos de manera efectiva</p>
                </header>
                <nav className="flex flex-col items-center gap-4">
                    <ul className="flex flex-wrap gap-4">
                        <li>
                            <a className="block p-4 rounded-lg border border-gray-200 text-accent hover:underline dark:border-gray-700" href="/home">
                                Ir a los Tableros
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
