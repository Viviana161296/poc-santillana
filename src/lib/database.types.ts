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
      thematic_axes: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      topics: {
        Row: {
          id: string
          axis_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          axis_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          axis_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contents: {
        Row: {
          id: string
          topic_id: string
          content: string
          sequence_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          content: string
          sequence_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          content?: string
          sequence_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      micro_learnings: {
        Row: {
          id: string
          title: string
          type: string
          duration: number | null
          content_url: string | null
          skill_level: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          duration?: number | null
          content_url?: string | null
          skill_level?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          duration?: number | null
          content_url?: string | null
          skill_level?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}