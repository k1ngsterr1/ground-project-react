"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useShareModalStore } from "../model/use-share-modal-store";

interface ModalProps {
  children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  const { closeModal, isOpen } = useShareModalStore();

  // Close on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
              },
            }}
            className="fixed left-[40%] top-1/3 -translate-x-1/3 -translate-y-[40%] z-50"
          >
            <div className="bg-white rounded-lg shadow-lg w-[520px] max-w-[90vw]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
