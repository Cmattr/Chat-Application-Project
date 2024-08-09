import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";


type Message = {
    text: string;
    userId: string;
};

type SimpleChatBodyProps = {
    socket: any; 
};

const ChatProvider: React.FC<SimpleChatBodyProps> = ({ socket }) => {
    const [messages, setMessages] = useState([] as any);
    const userID = sessionStorage.getItem("userName");

    useEffect(() => {
        socket.on("message", (message: Message) => {
            setMessages([...messages, message]);
        });
    }, [socket, messages, userID]);

    return (
        <Container
            style={{
                marginTop: '40px',
                background: 'lightblue',
                padding: '20px',
                borderRadius: '10px'
            }}
        >
            {messages.map((message: Message, index: any) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Text style={({color:message.userId === userID? 'blue' : 'green', float: message.userId === userID ? 'right' : 'left'})}>
                            {message.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default ChatProvider;
