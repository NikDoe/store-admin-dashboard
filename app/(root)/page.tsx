"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

function HomePage() {
  const onOpen = useStoreModal(state => state.onOpen);
  const isOpen = useStoreModal(state => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <h1>
      Root
    </h1>
  );
}

export default HomePage;