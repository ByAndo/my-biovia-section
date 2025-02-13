import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
        {children}
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
          닫기
        </button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
