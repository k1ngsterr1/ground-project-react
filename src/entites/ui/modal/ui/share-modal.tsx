"use client";

import telegram from "@/assets/telegram.svg";
import whatsapp from "@/assets/whatsapp.svg";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useShareModalStore } from "../model/use-share-modal-store";
import { Modal } from "./modal";

export function ShareModal() {
  const { closeModal } = useShareModalStore();
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Set the current URL from the browser
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Modal>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Поделиться</h2>
          <button
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Share via Social Media */}
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Поделитесь этой ссылкой через:
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-full hover:shadow-md transition-all"
            >
              <img src={whatsapp} alt="WhatsApp" className="w-10 h-10" />
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex justify-center items-center bg-gray-100 rounded-full hover:shadow-md transition-all"
            >
              <img src={telegram} alt="Telegram" className="w-10 h-10" />
            </a>
          </div>
        </div>

        {/* Copy Link */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Или скопируйте ссылку здесь:</p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                copied
                  ? "bg-[#00a859] text-white"
                  : "bg-[#00a859] text-white hover:bg-[#00a859]/90"
              }`}
            >
              {copied ? "Скопировано!" : "Скопировать"}
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
