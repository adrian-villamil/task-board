'use client';

import { ToastContainer } from "react-toastify";
import { ModalBoardEditor } from "./modal-board-editor";
import { ModalTaskEditor } from "./modal-task-editor";
import 'react-toastify/dist/ReactToastify.css';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      {children}
      <ModalTaskEditor />
      <ModalBoardEditor />
      <ToastContainer />
    </>
  );
};