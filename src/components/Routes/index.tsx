import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Home} from "../Home";
import {Profiles} from "../Profiles";
import {Chats} from "../Chats";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/profile">
                    <Profiles/>
                </Route>
                <Route path="/chats/:chatId?">
                    <Chats/>
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route>
                    <Link to="/">Home</Link>
                    <h2>Page not found</h2>
                </Route>
            </Switch>
        </BrowserRouter>)
}
