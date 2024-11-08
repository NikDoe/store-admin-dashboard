'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateStoreSchema } from "@/schemas";

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export const StoreModal = () => {
	const storeModal = useStoreModal();

	const form = useForm<z.infer<typeof CreateStoreSchema>>({
		resolver: zodResolver(CreateStoreSchema),
		defaultValues: {
			name: "",
		}
	});

	const onSubmit = async (values: z.infer<typeof CreateStoreSchema>) => {
		console.log(values);

		//TODO: create store
	}

	return (
		<Modal
			title="Создайте store"
			description="Создайте новый store для управления им"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название</FormLabel>
								<FormControl>
									<Input
										placeholder="крутой store"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="pt-6 flex items-center justify-end space-x-2">
						<Button onClick={storeModal.onClose}>Отмена</Button>
						<Button
							type="submit"
						>
							Продолжить
						</Button>
					</div>
				</form>
			</Form>
		</Modal>
	)
}