import {Links, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration} from "@remix-run/react";
import type {LinksFunction} from "@remix-run/node";
import {Analytics} from "@vercel/analytics/react";
import "./styles/tailwind.css";

export const links: LinksFunction = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
    },
];
export const meta: MetaFunction = () => [{title: "Gestor de Tareas"}, {name: "description", content: "Gestión de tareas estilo Trello"}];

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Analytics />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
