import {Link} from "react-router-dom";
import './style.scss';
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import React from 'react'
import { ChatsL } from '../../schema'

interface IProps{
    chats: ChatsL
}

export const ChatList: React.FC<IProps> = ({chats}) => {
    const chatList = Object.keys(chats);
    return (
        <div className="chat-container">
            <List>
                {chatList.map((item, index) => {
                    return (
                        <ListItem key={index}>
                            <Link to={`/chats/${item}`}>{item}</Link>
                        </ListItem>
                    )}
                )}
            </List>
        </div>
    )
}