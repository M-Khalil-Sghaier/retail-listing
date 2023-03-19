import React, { ReactNode } from "react";

import { Dialog } from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: ReactNode;
};

const Modal = ({ isOpen = false, onClose, children, title }: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
      data-testid="modal"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative w-[75%] min-h-[50vh] max-h-[90vh] overflow-auto mx-auto bg-white rounded p-12 drop-shadow-lg">
          <Dialog.Title className="mb-3 text-lg">{title}</Dialog.Title>
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
