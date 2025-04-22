import { ICategory } from "./ICategory"

export type CreateCategoryDTO = Omit<ICategory, 'id' | 'created_at' | 'updated_at'>
export type UpdateCategoryDTO = Partial<CreateCategoryDTO> 