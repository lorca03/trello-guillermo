import {redirectWithClearedCookie} from "~/lib/auth";

export function action() {
    return redirectWithClearedCookie();
}
