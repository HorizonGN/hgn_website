export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          organization: string | null
          position: string | null
          phone: string | null
          is_admin: boolean
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          organization?: string | null
          position?: string | null
          phone?: string | null
          is_admin?: boolean
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          organization?: string | null
          position?: string | null
          phone?: string | null
          is_admin?: boolean
          is_approved?: boolean
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          category: 'newsletter' | 'records'
          title: string
          content: string | null
          file_url: string | null
          youtube_url: string | null
          author_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category: 'newsletter' | 'records'
          title: string
          content?: string | null
          file_url?: string | null
          youtube_url?: string | null
          author_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category?: 'newsletter' | 'records'
          title?: string
          content?: string | null
          file_url?: string | null
          youtube_url?: string | null
          author_id?: string | null
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
