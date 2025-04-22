import { supabase } from '@/lib/supabase';
import { CreateCategoryDTO } from '@/types/category';
import { ICategory } from '@/types/ICategory';

export const categoryService = {
  async getCategories(userId: string): Promise<ICategory[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching categories:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error in getAccounts:', error)
      throw error
    }
  },

  async createCategory(category: CreateCategoryDTO): Promise<ICategory> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single()

      if (error) {
        console.error('Error creating category:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in createCategory:', error)
      throw error
    }
  },

  async deleteCategory(id: number): Promise<void> {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id)

      if (error) {
        console.error('Error deleting category:', error)
        throw error
      }
    } catch (error) {
      console.error('Error in deleteCategory:', error)
      throw error
    }
  },

  async updateCategory(id: number, category: Partial<CreateCategoryDTO>): Promise<ICategory> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single()
      if (error) {
        console.error('Error updating category:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in updateCategory:', error)
      throw error
    }
  },
}
