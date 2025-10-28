import { API_CONSTANTS } from "../constants/apiConstants";
import type { BookingStatistics } from "../lib/types";
import { del, get, patch, post, put } from "./apiService";

export interface Booking {
  bookingId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  photographerId: number;
  photographerName: string;
  photographerEmail: string;
  photographerPhone: string;
  scheduleAt: string;
  locationAddress: string;
  statusId: number;
  statusName: string;
  price: string;
  note: string;
}

export interface BookingSearchRequest {
  searchTerm?: string;
  customerId?: number;
  photographerId?: number;
  statusId?: number;
  locationAddress?: string;
  minPrice?: number;
  maxPrice?: number;
  scheduleFrom?: string;
  scheduleTo?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
}

export interface BookingSearchResponse {
  data: Booking[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UpdateBookingRequest {
  scheduleAt: string;
  locationAddress: string;
  price: number;
  note: string;
}

export interface UpdateBookingStatusRequest {
  statusId: number;
}

class BookingService {
  // Get booking by ID
  async getBookingById(id: number): Promise<Booking> {
    const response = await get<Booking>(
      API_CONSTANTS.BOOKING.GET_BY_ID(id), true
    );
    return response.data;
  }

  // Update booking
  async updateBooking(id: number, data: UpdateBookingRequest): Promise<Booking> {
    const response = await put<Booking>(
      API_CONSTANTS.BOOKING.UPDATE(id),
      data, true
    );
    return response.data;
  }

  // Delete booking
  async deleteBooking(id: number): Promise<void> {
    await del(API_CONSTANTS.BOOKING.DELETE(id), true);
  }

  // Get bookings by status
  async getBookingsByStatus(statusId: number): Promise<Booking[]> {
    const response = await get<Booking[]>(
      API_CONSTANTS.BOOKING.GET_BY_STATUS(statusId), true
    );
    return response.data;
  }

  // Search bookings
  async searchBookings(params: BookingSearchRequest): Promise<BookingSearchResponse> {
    const response = await post<BookingSearchResponse>(
      API_CONSTANTS.BOOKING.SEARCH,
      params, true
    );
    return response.data;
  }

  // Update booking status
  async updateBookingStatus(id: number, statusId: number): Promise<Booking> {
    const response = await patch<Booking>(
      API_CONSTANTS.BOOKING.UPDATE_STATUS(id),
      { statusId }, true
    );
    return response.data;
  }

  // Get booking statistics
  async getBookingStatistics(): Promise<BookingStatistics> {
    const response = await get<BookingStatistics>(
      API_CONSTANTS.BOOKING.STATISTICS, true
    );
    return response.data;
  }
}

export const bookingService = new BookingService();
