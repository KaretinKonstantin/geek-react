import { Chat } from '../../schema'
import './style.scss'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import { Button, TextField } from '@mui/material'
// import { makeStyles } from '@mui/material'


interface lProps {
    messages: Chat[],
    addMessage: (message: string, author: string, id: string) => void;
}


// const useStyles = makeStyles({
//     root: {
//         display: "flex",
//         flexDirection: "column",
//         maxWidth: "350px",
//         margin: "10px"
//     },
//     edit: {
//         marginBottom: "10px"
//     }
// })

export const Message: React.FC<lProps> = ({messages, addMessage}) => {
    const inputRef = useRef(null);
    // const classes = useStyles();
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('Guest');

    useEffect(() => {
        // @ts-ignore
        inputRef.current.focus();
    }, []);

    const handleMessage = (event: React.BaseSyntheticEvent) => {
        setMessage(event.target.value);
    }

    const handleAuthor = (event: React.BaseSyntheticEvent) => {
        setAuthor(event.target.value);
    }

    const formSubmit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        // addMessage(message, author, id);
    }

    return (
        <>
            <div className="message-window">
                {messages.map(item =>
                    <Fragment key={item.id}>
                        <div>Автор: {item.author}</div>
                        <pre>Сообщение: {item.message}</pre>
                    </Fragment>
                )}
            </div>
            <form onSubmit={formSubmit}>
                <TextField required
                           id="author"
                           label="Author"
                           value={author}
                           onChange={handleAuthor}/>
                <TextField id="message"
                           label="Сообщение"
                           multiline
                           rows={1}
                           variant="outlined"
                           value={message}
                           onChange={handleMessage}
                           inputRef={inputRef}/>
                <Button type="submit"
                        variant="contained">Отправить</Button>
            </form>
        </>
    )
}