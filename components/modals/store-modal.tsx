'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const StoreModal = () => {
	const storeModal = useStoreModal();

	return (
		<Modal
			title="Создайте store"
			description="Создайте новый store для управления им"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			Форма для создания store
		</Modal>
	)
}