import {Link} from "react-router-dom";
import {Fragment} from "react";

export const Home = () => {
    return (
        <Fragment>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/chats">Chats</Link>
                </li>
            </ul>
            <h1>Home</h1>
        </Fragment>
    )
}
