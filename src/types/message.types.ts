export enum MessageTriggerType {
  SCHEDULED = 'SCHEDULED',
  EVENT = 'EVENT',
  MANUAL = 'MANUAL'
}

export enum MessageTargetTable {
  CUSTOMER = 'CUSTOMER',
  ORDER = 'ORDER',
  PAYMENT = 'PAYMENT',
  DELIVERY = 'DELIVERY'
}

export interface MessageConfig {
  id: string;
  customer_id: string;
  can_whatsapp: boolean;
  can_email: boolean;
  can_sms: boolean;
  trigger_type: MessageTriggerType;
  target_table: MessageTargetTable;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MessageSchedule {
  id: string;
  config_id: string;
  day_of_week: number;
  hour: number;
  minute: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: string;
  variables?: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateMessageConfig {
  customer_id: number;
  can_whatsapp: boolean;
  can_whatsapp_attachments: boolean;
  can_telegram: boolean;
  can_telegram_attachments: boolean;
  can_email: boolean;
  can_email_attachments: boolean;
}

export interface UpdateMessageConfig {
  can_whatsapp?: boolean;
  can_whatsapp_attachments?: boolean;
  can_telegram?: boolean;
  can_telegram_attachments?: boolean;
  can_email?: boolean;
  can_email_attachments?: boolean;
}

export interface CreateMessageSchedule {
  message_config_id: number;
  day_of_week: number;
  can_send: boolean;
  start_time?: string;
  end_time?: string;
}

export interface UpdateMessageSchedule {
  day_of_week?: number;
  can_send?: boolean;
  start_time?: string;
  end_time?: string;
}

export interface CreateMessageTemplate {
  name: string;
  description: string;
  subject: string;
  content: string;
  variables?: string[];
}

export interface UpdateMessageTemplate {
  name?: string;
  description?: string;
  subject?: string;
  content?: string;
  variables?: string[];
} 