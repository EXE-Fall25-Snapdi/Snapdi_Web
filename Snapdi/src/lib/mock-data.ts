import type { User, SupportTicket } from './types';
import { subDays, format } from 'date-fns';

const placeholderImages = {
  "user-avatar-2": { url: "https://picsum.photos/seed/avatar2/40/40", hint: "profile person" },
  "user-avatar-3": { url: "https://picsum.photos/seed/avatar3/40/40", hint: "woman smiling" },
  "user-avatar-4": { url: "https://picsum.photos/seed/avatar4/40/40", hint: "man glasses" },
  "user-avatar-5": { url: "https://picsum.photos/seed/avatar5/40/40", hint: "woman nature" },
  "user-avatar-6": { url: "https://picsum.photos/seed/avatar6/40/40", hint: "man city" },
};

export const users: User[] = [
  { id: '1', name: 'Olivia Martin', email: 'olivia.martin@example.com', avatar: placeholderImages["user-avatar-3"].url, imageHint: placeholderImages["user-avatar-3"].hint, role: 'Customer', status: 'Active', joined: format(subDays(new Date(), 2), 'PPP') },
  { id: '2', name: 'Jackson Lee', email: 'jackson.lee@example.com', avatar: placeholderImages["user-avatar-2"].url, imageHint: placeholderImages["user-avatar-2"].hint, role: 'Photographer', status: 'Active', joined: format(subDays(new Date(), 5), 'PPP') },
  { id: '3', name: 'Isabella Nguyen', email: 'isabella.nguyen@example.com', avatar: placeholderImages["user-avatar-5"].url, imageHint: placeholderImages["user-avatar-5"].hint, role: 'Photographer', status: 'Pending', joined: format(subDays(new Date(), 10), 'PPP') },
  { id: '4', name: 'William Kim', email: 'will@example.com', avatar: placeholderImages["user-avatar-4"].url, imageHint: placeholderImages["user-avatar-4"].hint, role: 'Customer', status: 'Active', joined: format(subDays(new Date(), 30), 'PPP') },
  { id: '5', name: 'Sofia Davis', email: 'sofia.davis@example.com', avatar: placeholderImages["user-avatar-6"].url, imageHint: placeholderImages["user-avatar-6"].hint, role: 'Customer', status: 'Banned', joined: format(subDays(new Date(), 45), 'PPP') },
];

// export const posts: Post[] = [
//   {
//     id: '1',
//     title: 'The Art of Landscape Photography',
//     author: 'Jackson Lee',
//     date: format(subDays(new Date(), 7), 'PPP'),
//     status: 'Published',
//     comments: 12,
//     thumbnailUrl: 'https://picsum.photos/seed/landscape/400/250'
//   },
//   {
//     id: '2',
//     title: 'A Beginner\'s Guide to Portrait Lighting',
//     author: 'Isabella Nguyen',
//     date: format(subDays(new Date(), 14), 'PPP'),
//     status: 'Published',
//     comments: 5,
//     thumbnailUrl: 'https://picsum.photos/seed/portrait/400/250'
//   },
//   {
//     id: '3',
//     title: 'Mastering the Edit: Lightroom Tips',
//     author: 'Admin',
//     date: format(subDays(new Date(), 1), 'PPP'),
//     status: 'Draft',
//     comments: 0,
//     thumbnailUrl: 'https://picsum.photos/seed/lightroom/400/250'
//   },
//   {
//     blogId: '4',
//     title: 'Upcoming Feature: Photo Contests',
//     author: 'Admin',
//     date: format(subDays(new Date(), -5), 'PPP'),
//     status: 'Scheduled',
//     comments: 0,
//     thumbnailUrl: 'https://picsum.photos/seed/contest/400/250'
//   },
// ];


export const supportTickets: SupportTicket[] = [
  { id: 'TKT-001', subject: 'Problem with my account login', user: { name: 'Olivia Martin', email: 'olivia.martin@example.com' }, date: format(subDays(new Date(), 1), 'PPp'), status: 'Open', content: 'I am unable to log into my account. I have tried resetting my password, but I am not receiving the reset email. Can you please assist?' },
  { id: 'TKT-002', subject: 'Question about photo submission', user: { name: 'Jackson Lee', email: 'jackson.lee@example.com' }, date: format(subDays(new Date(), 2), 'PPp'), status: 'In Progress', content: 'What are the resolution requirements for submitting photos to the marketplace? The upload page is not clear.' },
  { id: 'TKT-003', subject: 'Billing issue', user: { name: 'William Kim', email: 'will@example.com' }, date: format(subDays(new Date(), 5), 'PPp'), status: 'Closed', content: 'I was double-charged for my subscription this month. Please see the attached screenshot. I would like a refund for the extra charge.' },
];
