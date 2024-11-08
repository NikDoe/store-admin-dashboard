import * as z from 'zod';

export const CreateStoreSchema = z.object({
	name: z.string().min(3, {
		message: 'Название должно быть не короче 3 символов'
	}),
})