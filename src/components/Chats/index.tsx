import './style.scss';
import {Link, useParams} from "react-router-dom";
import {Fragment, useCallback, useEffect, useState} from "react";
import {ChatList} from "../ChatList";
import {NoChat} from "../NoChat";
import {ChatsL} from '../../schema'
import { Message } from '../MessageList/Message'


const initChats: ChatsL = {
    chat1: [
        {
            id: 1,
            author: 'Human',
            message: 'Message1'
        },
        {
            id: 2,
            author: 'Human',
            message: 'Message2'
        },
        {
            id: 3,
            author: 'Human',
            message: 'Message3'
        }
    ],
    chat2: [
        {
            id: 1,
            author: 'Human',
            message: 'Message2'
        }
    ]
}

export const Chats = () => {
    const [chats, setChats] = useState(initChats);
    let {chatId} = useParams<{chatId: string}>();

    const addMessage = useCallback((author: string, message: string, id: string) => {
        if (!id) id = chatId;
        setChats(prevState => ({
            ...prevState,
            [id]: [
                ...prevState[id],
                {
                    id: prevState[id].length + 1,
                    author,
                    message
                }
            ]
        }))
    }, [chatId]);

    const botMessage = useCallback(() => {
        const messages = chats[chatId];
        if (!messages) return ;

        if (messages.length > 0
            && messages[messages.length - 1].author !== 'Bot') {
            const timerId = setTimeout(() => {
                console.log('Сообщение от бота');
                addMessage('Bot', 'Сообщение отправлено', chatId);
            }, 1500)
            return () => {
                clearTimeout(timerId);
            }
        }
    }, [chats, chatId, addMessage]);

    useEffect(() => {
        botMessage();
    }, [botMessage, chats]);

    return (
        <Fragment>
            <Link to="/">Home</Link>
            <h1>Chats</h1>
            <div className="chats-container">
                <ChatList chats={chats}/>
                {chats[chatId] && <Message messages={chats[chatId]} addMessage={addMessage}/>}
                {!chats[chatId] && <NoChat/>}
            </div>
        </Fragment>
    )
}
