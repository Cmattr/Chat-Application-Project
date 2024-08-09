import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap'; 

type MessageInputProps = {
    socket: any;
};

const MessageInput: React.FC<MessageInputProps> = ({ socket }) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        const userId = sessionStorage.getItem("userName");
        if (userId) {
            socket.emit("message", { userId, text: messageText });
            setMessageText(""); 
        }
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Container>
            <Form>
                <Form.Label style={{ fontFamily: "Arial", color: "lightgray" }}>
                    Type your message
                </Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleEnterKey}
                    autoComplete='off'
                />
            </Form>
        </Container>
    );
};

export default MessageInput;
