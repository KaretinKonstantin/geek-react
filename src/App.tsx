import './App.css'
import { MessageList } from './schema'
import { Message } from './components/Message'
import { useState } from 'react'

function App() {
    const [messageList, setMessageList] = useState<MessageList[]>([
        {
            author: 'Первый автор',
            text: 'Текст первого сообщения'
        },
        {
            author: 'Второй автор',
            text: 'Текст второго сообщения'
        },
        {
            author: 'Третий автор',
            text: 'Текст третьего сообщения'
        },
        {
            author: 'Четвертый автор',
            text: 'Текст четвертого сообщения'
        }
    ]);

    function addMessage(author: string, message: string) {
        setMessageList(prevList => [...prevList, {
            text: message,
            author: author.trim() ? author : 'Anonymous'
        }]);
    }

    return (
        <div className="App">
            <Message messages={messageList} addMessage={addMessage}/>
        </div>
    )
}

export default App