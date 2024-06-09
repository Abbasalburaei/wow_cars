import { MessageBox } from "react-chat-elements"
export default function CustomMessageBox({
    key,
    date = null,
    position = 'left' || 'right',
    title,
    spacer = true,
    text}){
    return (
        <>
        <MessageBox
         id={key}
         date={date ?? Date.now()}
         position={position}
         type={"text"}
         title={title}
         text={text}
         />
        {spacer && <div className="mb-4"/>}
        </>
    )
}