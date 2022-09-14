import './App.css'
import { Message } from './components/MessageList/Message'
import ChatList from './components/ChatList/index'

function App() {

    return (
        <div className="App">
            <ChatList/>
            <Message/>
        </div>
    )
}

export default App