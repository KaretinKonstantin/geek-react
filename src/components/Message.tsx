import { MessageList } from '../schema'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import React from 'react'

interface lProps {
    messages: MessageList[],
    addMessage: (message: string, author: string) => void;
}

export const Message: React.FC<lProps> = ({messages, addMessage, ...props}) => {

    const botTimers = useRef([]);
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('Guest');

    useEffect(() => {
        if (messages.length > 0
            && messages[messages.length - 1].author !== 'Bot') {
            const timerId = setTimeout(() => {
                botTimers.current.shift();
                addMessage('Bot', `Сообщение отправлено!`);
            }, 1500);
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [messages])

    const handleMessage = (event: React.BaseSyntheticEvent) => {
        setMessage(event.target.value);
    }

    const handleAuthor = (event: React.BaseSyntheticEvent) => {
        setAuthor(event.target.value);
    }

    const formSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        addMessage(author, message);
    }

    return (
        <div>
            {
                <>
                    <form action="#" onSubmit={formSubmit} className="chat-form">
                        <label htmlFor="author" className="label">Автор:</label>
                        <input type="text" id="author" className="edit" value={author} onChange={handleAuthor}/>
                        <br/>
                        <label htmlFor="message">Сообщение:</label>
                        <textarea id="message" className="edit edit--area" value={message} onChange={handleMessage}/>
                        <br/>
                        <input type="submit" className="chat-form__button" value="Отправить"/>
                    </form>
                    {
                        messages.map((item: MessageList) =>
                            <>
                                <span>{item.text}</span>
                                <span>{' ' + item.author}</span>
                                <br/>
                            </>
                        )
                    }
                </>
            }
        </div>
    )
}