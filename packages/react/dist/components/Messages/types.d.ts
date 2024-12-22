import { MessageRequestDto } from "../../types";
import { ReactNode } from "react";
export interface MessagesProps {
    className?: string;
    containerClassName?: string;
    messageClassName?: string;
    renderMessage?: (message: MessageRequestDto) => ReactNode;
}
