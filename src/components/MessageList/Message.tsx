import { MessageList } from '../../schema'
import './style.scss'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "350px",
        margin: "10px"
    },
    edit: {
        marginBottom: "10px"
    }
})

export const Message: React.FC = ({ ...props}) => {

    const [messageCount, setMessageCount] = useState(0);
    const [messageList, setMessageList] = useState<MessageList[]>([]);
    const inputRef = useRef(null);
    const classes = useStyles();
    const botTimers = useRef([]);
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('Guest');

    useEffect(() => {
        if (messageList.length > 0
            && messageList[messageList.length - 1].author !== 'Bot') {
            const timerId = setTimeout(() => {
                botTimers.current.shift();
                addMessage('Bot', `Сообщение отправлено!`);
            }, 1500);
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [messageList])

    const addMessage = useCallback((author: string, message: string) => {
        setMessageList(prevList => [...prevList, {
            id: messageCount,
            message: message,
            author: author.trim() ? author : 'Anonymous'
        }]);
        setMessageCount(prev =>prev + 1);
        setMessage("");
        // @ts-ignore
        inputRef.current.focus();
    }, [messageCount]);

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
        <div className="">
            <div className='message-window'>
                {messageList.map((item) =>
                    <Fragment key={item.id}>
                        <div>Автор: {item.author}</div>
                        <pre>Сообщение: {item.message}</pre>
                    </Fragment>
                )}
            </div>
            <form action="#"
                  onSubmit={formSubmit}
                  className={classes.root}>
                <TextField required
                           id="author"
                           label="Author"
                           className={classes.edit}
                           value={author}
                           onChange={handleAuthor}/>
                <TextField id="message"
                           label="Сообщение"
                           className={classes.edit}
                           multiline
                           rows={1}
                           variant="outlined"
                           value={message}
                           onChange={handleMessage}
                           inputRef={inputRef}/>
                <Button type="submit"
                        variant="contained">Отправить</Button>
            </form>
        </div>
    )
}