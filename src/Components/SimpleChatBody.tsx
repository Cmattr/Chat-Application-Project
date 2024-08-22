import { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";

type Message = {
    id: string;
    text: string;
    userId: string;
    timestamp: string;
};

type SimpleChatBodyProps = {
    socket: any; 
};

const ChatProvider: React.FC<SimpleChatBodyProps> = ({ socket }) => {
    const [messages, setMessages] = useState([] as Message[]);
    const userID = sessionStorage.getItem("userName");

    useEffect(() => {
        const handleMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on("message", handleMessage);

        // Cleanup the socket connection when the component unmounts
        return () => {
            socket.off("message", handleMessage);
        };
    }, [socket]);

    const handleDelete = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    };

    return (
        <Container
            style={{
                marginTop: '40px',
                background: 'lightblue',
                padding: '20px',
                borderRadius: '10px'
            }}
        >
            {messages.map((message, index) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Text style={{
                            color: message.userId === userID ? 'blue' : 'green', 
                            float: message.userId === userID ? 'left' : 'right'
                        }}>
                            <strong>{message.userId}:</strong> {message.text}
                            <br />
                            <small style={{ color: 'gray', float: 'right' }}>{message.timestamp}</small>
                        </Card.Text>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(message.id)}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default ChatProvider;

