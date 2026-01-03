import { Conversation } from './types';

export const DUMMY_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Elena Fisher',
      avatar: 'https://picsum.photos/seed/elena/200/200',
      status: 'online',
    },
    lastMessage: 'Did you see the new design updates?',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Hey! How is the project coming along?', timestamp: '10:30 AM', isMe: false },
      { id: 'm2', senderId: 'me', text: 'Almost done with the landing page animation.', timestamp: '10:35 AM', isMe: true },
      { id: 'm3', senderId: 'u1', text: 'Awesome! Did you see the new design updates?', timestamp: '10:42 AM', isMe: false },
    ],
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Marcus Holloway',
      avatar: 'https://picsum.photos/seed/marcus/200/200',
      status: 'offline',
    },
    lastMessage: 'Let\'s schedule a call for tomorrow.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Are we still on for the hackathon?', timestamp: 'Yesterday', isMe: true },
      { id: 'm2', senderId: 'u2', text: 'Yes, absolutely. Let\'s schedule a call for tomorrow.', timestamp: 'Yesterday', isMe: false },
    ],
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Sarah Connor',
      avatar: 'https://picsum.photos/seed/sarah/200/200',
      status: 'busy',
    },
    lastMessage: 'The future is not set.',
    lastMessageTime: 'Mon',
    unreadCount: 5,
    messages: [
      { id: 'm1', senderId: 'u3', text: 'The future is not set.', timestamp: 'Mon', isMe: false },
    ],
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Garrus Vakarian',
      avatar: 'https://picsum.photos/seed/garrus/200/200',
      status: 'online',
    },
    lastMessage: 'Calibrations are complete.',
    lastMessageTime: 'Sun',
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'u4', text: 'Can it wait for a bit? I\'m in the middle of some calibrations.', timestamp: 'Sun', isMe: false },
      { id: 'm2', senderId: 'u4', text: 'Calibrations are complete.', timestamp: 'Sun', isMe: false },
    ],
  },
];