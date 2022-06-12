import { OfferStatuses } from './types/offers';

export const ApiConfig = {
  URL: process.env.REACT_APP_API_URL,
  endpoints: {
    requestCRTF: '/api/account/request-token',
    getToken: '/api/oauth/token?v=2',
    externalLogin: '/api/account/login-external',
    offers: {
      add: '/api/offers',
      edit: (offerId: number) => `/api/offers/${offerId}`,
      getList: `/api/offers`,
      offersCount: (userId: string, offerType: string) =>
        `/api/offers/offersCount/${userId}/${offerType}`,
      getDetails: (offerId: string) => `/api/offers/${offerId}`,
      getCategories: `/api/offers/categories`,
      getStates: `/api/offers/states`,
      getBidders: (offerId: string) => `/api/offers/${offerId}/bidders`,
      complete: (offerId: string) => `/api/offers/${offerId}/complete`,
      setStatus: (offerId: string) => `/api/offers/${offerId}/set-status`,
      bid: (offerId: string) => `/api/offers/${offerId}/bid`,
      report: (offerId: string) => `api/offers/${offerId}/report`,
      getOwnerEmail: (offerId: string) => `api/offers/${offerId}/ownerEmail`
    },
    currentUser: {
      get: `/api/account`
    },
    users: {
      getUser: (userId: string) => `/api/users/${userId}`,
      getCode: (phoneNumber: string) => `/api/users/getcode/${phoneNumber}`,
      getBlockedUsers: '/api/users/blocked',
      blockUser: (userId: string) => `/api/users/${userId}/block`,
      unblockUser: (userId: string) => `/api/users/${userId}/unblock`
    },
    account: {
      account: '/api/account',
      logout: '/api/account/logout',
      changePassword: '/api/account/change-password',
      forgotPassword: '/api/account/reset-password',
      resetPassword: '/api/account/finish-reset-password',
      deleteAccount: '/api/account/delete',
      setAvatar: '/api/account/avatar',
      accountConfirmation: '/api/account/finish-verification',
      emailConfirmation: '/api/account/confirm-email-change',
      revokeEmailChange: '/api/account/revoke-email-change',
      accountResendVerification: 'api/account/resend-verification-email'
    },
    fileUpload: '/api/media/images',
    contactForm: '/api/contact/email-support',
    chat: {
      getConversations: '/api/conversations/v2',
      getConversationDetails: (conversationId: number) =>
        `/api/conversations/${conversationId}/messages`,
      markConversationAsRead: (conversationId: number) =>
        `/api/conversations/${conversationId}/set-read`,
      deleteConversation: (conversationId: number) =>
        `/api/conversations/${conversationId}/set-archived`
    },
    notifications: {
      getAll: '/api/notifications',
      markNotificationAsRead: (notificationId: number) =>
        `/api/notifications/${notificationId}/set-read`,
      deleteNotification: (notificationId: number) =>
        `/api/notifications/${notificationId}/set-archived`
    },
    multiOffers: {
      excelTemplate: '/api/multioffers/excel-template',
      createMultiOffers: '/api/multioffers/create-multi-offers'
    }
  }
};

export const SignalR = {
  host: process.env.REACT_APP_SIGNALR_HOST!,
  hubName: process.env.REACT_APP_SIGNALR_HUBNAME!
};

export const WebConfig = {
  BASE_URL: process.env.REACT_APP_BASE_URL
};

export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

export const Config = {
  ITEMS_PER_PAGE: 12,
  HOMEPAGE_ITEMS_PER_PAGE: 12,
  HOMEPAGE_OFFER_STATUS: OfferStatuses.PENDING,
  USER_PROFILE_ITEMS_PER_PAGE: 12,
  FOOTER_APP_STORE_LINK: 'https://apps.apple.com/us/app/wage-app/id1330725330?ls=1',
  FOOTER_GOOGLE_PLAY_LINK: 'https://play.google.com/store/apps/details?id=io.wageapp.android',
  FOOTER_INSTAGRAM_LINK: 'https://www.instagram.com/wageapp/',
  FOOTER_FACEBOOK_LINK: 'https://www.facebook.com/wagedev/',
  CONTACT_EMAIL: 'support@wageapp.io',
  NUMBER_OF_DAYS_AFTER_NOTIFICATION_IS_OLD: 7
};

export const Routes = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ABOUT: '/about',
  ABOUT_APP: '/about/app',
  ABOUT_FEATURES: '/about/features',
  ABOUT_HELP: '/about/help',
  ABOUT_HELP_MOBILE: '/mobile/help',
  DATA_DELETION: '/data-deletion-instructions-url',
  ABOUT_TERMS: '/about/terms',
  ABOUT_PRIVACY: '/about/privacy',
  ABOUT_CONTACT: '/about/contact',
  ACCOUNT_CONFIRMATION: '/Account/confirmEmail',
  EMAIL_CONFIRMATION: '/Account/confirmEmailChange',
  REVOKE_EMAIL: '/Account/revokeEmailChange',
  ADD_TASK: '/add-task',
  EDIT_TASK: '/edit-task',
  OFFER: '/offer',
  OFFERS_LIST: '/offers',
  SIGN_UP: '/sign-up',
  ERROR_404: '/404',
  DASHBOARD: '/dashboard',
  DASHBOARD_GIGS: '/dashboard/gigs',
  DASHBOARD_SERVICES: '/dashboard/services',
  DASHBOARD_MESSAGES: '/dashboard/messages',
  DASHBOARD_NOTIFICATIONS: '/dashboard/notifications',
  DASHBOARD_BLOCK_PEOPLE: '/dashboard/block-people',
  DASHBOARD_PROFILE: '/dashboard/profile',
  PASSWORD_RESET: '/Account/ResetPassword',
  USER_PROFILE: '/user-profile'
};

export const RoutesArray = [
  '/',
  '/login',
  '/logout',
  '/about',
  '/about/app',
  '/about/features',
  '/about/help',
  '/mobile/help',
  '/about/terms',
  '/about/privacy',
  '/about/contact',
  '/Account/confirmEmail',
  '/Account/confirmEmailChange',
  '/Account/revokeEmailChange',
  '/add-task',
  '/edit-task',
  '/offer',
  '/offers',
  '/sign-up',
  '/404',
  '/dashboard',
  '/dashboard/gigs',
  '/dashboard/services',
  '/dashboard/messages',
  '/dashboard/notifications',
  '/dashboard/block-people',
  '/dashboard/profile',
  '/Account/ResetPassword',
  '/user-profile'
];
