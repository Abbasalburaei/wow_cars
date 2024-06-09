import '../../lib/styles/chatBox.css';
import { faMessage, faPaperPlane, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import  CustomMessageBox  from '@/lib/components/customMessageBox';
export default function ChatBox({
    senderName,
    sallerName,
    sallerOnline = true
}:{
    senderName:string,
    sallerName:string,
    sallerOnline? : boolean
}) {

    const [showChatList, setShowChatList] = useState(false);
    const scaleValue = showChatList ? 'scale-100' : 'scale-0';
    const [messages,setMessages] = useState<string[]>([]);
    const sendMsgBoxRef = useRef<HTMLInputElement>(null);

    const handleMessage = ()=>{
        if(sendMsgBoxRef.current?.value){
            setMessages([...messages, sendMsgBoxRef.current.value ]);
            sendMsgBoxRef.current.value = "";
        }else{
            sendMsgBoxRef.current?.focus();
        }
    }

    return (
        <div className="chatBox">
            {showChatList && (<div className={`chatBox-list ${scaleValue}`}>
                <header className='chatBox-list-header'>
                    <div className='flex flex-row-reverse px-5 pt-3 items-center gap-5'>
                        <div
                            onClick={() => {
                                setShowChatList(false);
                            }}
                            className='text-white select-none cursor-pointer'>
                            <FontAwesomeIcon icon={faX} />
                        </div>
                    </div>
                    <Divider />
                    <div className='flex flex-row gap-4 items-center px-4'>
                        <Avatar shape="circle" size='large'>
                            <FontAwesomeIcon icon={faUser} className='text-wowSecondary' />
                        </Avatar>
                        <div className='flex flex-col'>
                            <span className='font-bold capitalize text-white'>
                               {sallerName}
                            </span>
                            <div className='flex flex-row items-center gap-3'>
                                <div className={`w-2 h-2 rounded-full shadow-md ${sallerOnline ? 'bg-white' : 'bg-red-600'} `} />
                                <span className='capitalize text-wowLightGray'>
                                    {sallerOnline ? 'online' : 'offline'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='chatBox-list-content'> 
                <CustomMessageBox 
                  key={'1'} 
                  title={senderName} 
                  position='right'
                  text={'Hello !!!'} />
                  <CustomMessageBox 
                  key={'2'} 
                  title={sallerName} 
                  text={'How can I help you ser?'}
                  position={'left'}
                  />
                 <CustomMessageBox 
                  key={'3'} 
                  title={senderName} 
                  position='right'
                  text={'Do you have any disscount or this price is the final?'} />
                 <CustomMessageBox 
                  key={'4'} 
                  title={sallerName} 
                  position='left'
                  text={'Sorry this is the final price.'} />
                  {
                    messages?.map(e=>(
                        <CustomMessageBox 
                        key={e} 
                        title={senderName} 
                        position='right'
                        text={e} />
                    ))  
                  }

                </div>
                <footer className='chatBox-list-controls'>
                    <div className='flex flex-row gap-2'>
                        <div className='grow bg-wowLightGray h-12 rounded-3xl'>
                            <InputText ref={sendMsgBoxRef} className=' bg-transparent border-none border-0 outline-0 shadow-none outline-none focus:border-none ' placeholder='Send message to saller ...' />
                        </div>
                        <div onClick={handleMessage} className='bg-wowPrimary select-none shadow-sm cursor-pointer h-[3rem] w-[3rem] rounded-full flex justify-center items-center text-white'>
                            <FontAwesomeIcon icon={faPaperPlane} size='xl' />
                        </div>
                    </div>
                </footer>
            </div>)
            }
            <div
                className={`chatBox-btn ${showChatList ? 'scale-0' : 'scale-100'}`}
                onClick={() => {
                    setShowChatList(!showChatList);
                }}
            >
                <FontAwesomeIcon icon={faMessage} size="2xl" color="white" />
            </div>
        </div>
    )
}