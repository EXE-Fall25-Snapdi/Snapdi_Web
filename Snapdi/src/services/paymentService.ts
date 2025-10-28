import { post } from './apiService';
import { API_CONSTANTS } from '../constants/apiConstants';

// Types
export interface PaymentSearchRequest {
  searchTerm?: string;
  paymentStatus?: string;
  bookingStatus?: string;
  transactionMethod?: string;
  minAmount?: number;
  maxAmount?: number;
  feePolicyId?: number;
  paymentDateFrom?: string;
  paymentDateTo?: string;
  bookingDateFrom?: string;
  bookingDateTo?: string;
  bookingLocation?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export interface Customer {
  userId: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export interface FeePolicy {
  feePolicyId: number;
  policyName: string;
  feePercent: number;
  isActive: boolean;
  effectiveDate: string;
  expiryDate: string;
}

export interface Booking {
  bookingId: number;
  bookingDate: string;
  endTime: string;
  location: string;
  price: number;
  status: string;
  customer: Customer;
  photographer: Customer;
}

export interface PaymentRecord {
  paymentId: number;
  bookingId: number;
  amount: number;
  feePercent: number;
  feeAmount: number;
  netAmount: number;
  transactionMethod: string;
  transactionReference: string;
  paymentStatus: string;
  paymentDate: string;
  feePolicy: FeePolicy;
  booking: Booking;
}

export interface PaymentSearchResponse {
  data: PaymentRecord[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaymentSummary {
  totalPayments: number;
  totalAmount: number;
  totalFeeAmount: number;
  totalNetAmount: number;
  confirmedCount: number;
  paidCount: number;
  pendingCount: number;
  averageAmount: number;
  message: string;
}

class PaymentService {
  // Search payments with filtering and paging
  async searchPayments(request: PaymentSearchRequest): Promise<PaymentSearchResponse> {
    const response = await post<PaymentSearchResponse>(
      API_CONSTANTS.PAYMENTS.SEARCH,
      request
    );
    return response.data;
  }

  // Get payment search summary statistics
  async getPaymentSummary(request: PaymentSearchRequest): Promise<PaymentSummary> {
    const response = await post<PaymentSummary>(
      API_CONSTANTS.PAYMENTS.SEARCH_SUMMARY,
      request
    );
    return response.data;
  }
}

export const paymentService = new PaymentService();
