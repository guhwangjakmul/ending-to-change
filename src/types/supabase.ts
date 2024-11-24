export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      category: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      category_progress: {
        Row: {
          category_id: number
          created_at: string
          id: number
          is_completed: boolean
          progress: number
          user_id: string
        }
        Insert: {
          category_id: number
          created_at?: string
          id?: number
          is_completed?: boolean
          progress?: number
          user_id?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: number
          is_completed?: boolean
          progress?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'category_progress_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'category_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'user'
            referencedColumns: ['user_id']
          },
        ]
      }
      date: {
        Row: {
          carbon: number
          created_at: string
          distance: number
          id: number
          user_id: string
        }
        Insert: {
          carbon?: number
          created_at?: string
          distance?: number
          id?: number
          user_id?: string
        }
        Update: {
          carbon?: number
          created_at?: string
          distance?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'date_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'user'
            referencedColumns: ['user_id']
          },
        ]
      }
      quiz: {
        Row: {
          category_id: number
          description: string
          id: number
          is_answer: boolean
          question: string
        }
        Insert: {
          category_id: number
          description: string
          id?: number
          is_answer: boolean
          question: string
        }
        Update: {
          category_id?: number
          description?: string
          id?: number
          is_answer?: boolean
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
        ]
      }
      quiz_log: {
        Row: {
          created_at: string
          id: number
          quiz_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          quiz_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          quiz_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_log_quiz_id_fkey'
            columns: ['quiz_id']
            isOneToOne: false
            referencedRelation: 'quiz'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quiz_log_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'user'
            referencedColumns: ['user_id']
          },
        ]
      }
      user: {
        Row: {
          avatar_url: string
          created_at: string
          email: string
          goal: number
          id: number
          is_all_clear: boolean
          nickname: string
          point: number
          user_id: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          email: string
          goal?: number
          id?: number
          is_all_clear?: boolean
          nickname: string
          point?: number
          user_id?: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          email?: string
          goal?: number
          id?: number
          is_all_clear?: boolean
          nickname?: string
          point?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_quiz_log_and_points: {
        Args: {
          user_id: string
          quiz_id: number
          points_to_add: number
        }
        Returns: {
          updated_user: Record<string, unknown>
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never
