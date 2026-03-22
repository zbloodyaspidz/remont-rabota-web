export type UserRole = 'CLIENT' | 'MASTER' | 'ADMIN';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type OrderStatus =
  | 'PENDING'
  | 'SEARCHING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED_BY_CLIENT'
  | 'CANCELLED_BY_MASTER'
  | 'DISPUTED';

export interface User {
  id: string;
  phone: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: string;
  masterProfile?: MasterProfile;
  clientProfile?: ClientProfile;
}

export interface MasterProfile {
  userId: string;
  specializationIds: string[];
  experience?: string;
  portfolio?: string[];
  workRadius?: number;
  verificationStatus: VerificationStatus;
  rating: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  acceptanceRate?: number;
  isAvailable: boolean;
}

export interface ClientProfile {
  userId: string;
  savedAddresses?: SavedAddress[];
}

export interface SavedAddress {
  label: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  isActive: boolean;
  sortOrder: number;
}

export interface Order {
  id: string;
  clientId: string;
  masterId?: string;
  categoryId: string;
  address: string;
  addressLat?: number;
  addressLng?: number;
  description: string;
  desiredDate: string;
  desiredTime?: string;
  status: OrderStatus;
  photos?: string[];
  workPrice?: number;
  commission?: number;
  clientPrice?: number;
  masterPayout?: number;
  createdAt: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  category?: Category;
  client?: User;
  master?: User;
  review?: Review;
}

export interface Review {
  id: string;
  orderId: string;
  authorId: string;
  targetId: string;
  rating: number;
  comment?: string;
  isHidden: boolean;
  createdAt: string;
  author?: User;
  target?: User;
}

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
  read: boolean;
  createdAt: string;
  sender?: User;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}

export interface SystemSettings {
  id: string;
  orderCommission: number;
  defaultRadius: number;
  searchTimeout: number;
  retryInterval: number;
  updatedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalMasters: number;
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  activeOrders: number;
  ordersByDay: { date: string; count: number }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Ожидание',
  SEARCHING: 'Поиск мастера',
  ACCEPTED: 'Принят',
  IN_PROGRESS: 'Выполняется',
  COMPLETED: 'Завершён',
  CANCELLED_BY_CLIENT: 'Отменён клиентом',
  CANCELLED_BY_MASTER: 'Отменён мастером',
  DISPUTED: 'Спор',
};
