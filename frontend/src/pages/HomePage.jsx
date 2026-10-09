import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import NoChatSelected from "../components/NoChatSelected";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-screen overflow-hidden" style={{background:'var(--bg-void)'}}>
      <Sidebar />
      {selectedUser ? <ChatWindow /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;
