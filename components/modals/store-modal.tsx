"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { CreateStoreSchema } from "@/schemas";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const StoreModal = () => {
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const storeModal = useStoreModal();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof CreateStoreSchema>>({
		resolver: zodResolver(CreateStoreSchema),
		defaultValues: {
			name: "",
		}
	});


	const onSubmit = async (values: z.infer<typeof CreateStoreSchema>) => {
		try {
			setIsLoading(true);
			await axios.post("/api/stores", values);

			toast({
				variant: "success",
				title: "Поздравляем!",
				description: "Ваш store успешно создан",
			});
		} catch {
			toast({
				variant: "destructive",
				title: "Что-то пошло не так...",
				description: "Не удалось создать новый store",
			});
		}finally {
			setIsLoading(false);
		}
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
										disabled={isLoading}
										placeholder="крутой store"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="pt-6 flex items-center justify-end space-x-2">
						<Button
							type="button"
							disabled={isLoading}
							variant="outline"
							onClick={storeModal.onClose}
						>
							Отмена
						</Button>
						<Button
							disabled={isLoading}
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