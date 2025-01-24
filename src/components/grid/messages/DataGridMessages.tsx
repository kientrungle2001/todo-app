import { Alert } from "react-bootstrap"
import { DataGridMessage } from "../DataGridColumnTypes"

interface DataGridMessagesProps {
    messages: DataGridMessage[];
    setMessages: (messages: DataGridMessage[]) => void;
}

export const DataGridMessages: React.FC<DataGridMessagesProps> = ({ messages, setMessages }) => {
    const handleCloseMessage = (message: DataGridMessage, index: number) => {
        let updatedMessages: DataGridMessage[] = [...messages];
        updatedMessages.splice(index, 1);
        setMessages(updatedMessages);
    };
    return <>
        {
            messages.map((message: DataGridMessage, index: number) => {
                return (
                    <Alert key={index} variant={message.variant} dismissible onClose={() => handleCloseMessage(message, index)}>{message.label}</Alert>
                )
            })
        }
    </>
}