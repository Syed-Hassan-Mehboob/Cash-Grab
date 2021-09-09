import {Dimensions, StyleSheet, Platform} from 'react-native';
export const {width, height} = Dimensions.get('window');
const Constants = {
  /* * Font Families * */
  fontLight: 'Jost-Light',
  fontRegular: 'Jost-Regular',
  fontBold: 'Jost-Bold',
  /* * Screens * */
  splash: 'Splash',
  loginOrJoin: 'LoinOrJoin',
  login: 'Login',
  createAccount: 'CreateAccount',
  signUp: 'SignUp',
  forgetPassword: 'ForgetPassword',
  verifyVia: 'VerifyVia',
  otp: 'OTP',
  allCategories: 'AllCategories',
  singleCategory: 'SingleCategory',
  vendorAllCategories: 'VendorAllCategories',
  advanceBooking: 'AdvanceBooking',
  bookingConfirmed: 'BookingConfirmed',
  filter: 'Filter',
  Filtered: 'Filtered',
  changePassword: 'ChangePassword',
  editProfile: 'EditProfile',
  vendorEditProfile: 'VendorEditProfile',
  viewVendorProfile: 'ViewVendorProfile',
  chat: 'Chat',
  chatListing: 'ChatListing',
  vendorSingleCategory: 'VendorSingleCategory',
  vendorAllJobs: 'vendorAllJobs',
  viewJob: 'ViewJob',
  faq: 'Faq',
  dateTimeSlots: 'DateTimeSlots',
  search: 'Search',
  confirmPayment: 'ConfirmPayment',
  withDraw: 'WithDraw',
  /* * tabs * */
  tabNavigator: 'TabNavigator',
  home: 'Home',
  vendorHome: 'VendorHome',
  nearby: 'Nearby',
  notifications: 'notifications',
  plus: 'Plus',
  dashboard: 'Dashboard',
  profile: 'Profile',
  vendorProfile: 'VendorProfile',
  QuickNotify:'QuickNotify',
  more: 'More',
  settings: 'Settings',
  /* * drawer * */
  drawerNavigator: 'DrawerNavigator',
  support: 'Support',
  termsAndConditionsScreen: 'TermsAndConditions',
  logOut: 'Log Out',
  /* * cache keys * */
  accessToken: 'accessToken',
  user: 'user',
  /* * api urls * */
  baseURL: 'https://cash-grab.reignsol.net/api/v1/',
  imageURL: 'https://cash-grab.reignsol.net',
  signUpURL: 'auth/register',
  loginURL: 'auth/login',
  verifyOtpURL: 'auth/verify-otp',
  resendOtpURL: 'auth/resend-otp',
  forgotPasswordURL: 'auth/forgot-password',
  updatePasswordURL: 'auth/update-password',
  getProfileURL: 'auth/get-profile',
  updateProfileURL: 'auth/update-profile',
  signOutURL: 'auth/sign-out',
  customerCategoriesURL: 'customer/categories',
  customerViewCategoriesURL: 'customer/getVendorsByCategory?',
  customerRatingsURL: 'customer/ratings',
  contentsURL: 'contents',
  notificationsURL: 'notifications',
  logoutURL: 'auth/sign-out',
  servies: "auth/services",
  getAllVendorCategories: "customer/getAllVendors",
  getAllCustomerCategories: "customer/categories",
  postJob: "customer/jobs/create",
  getAllJobs: "vendors/getAllJobs",
  getJobsByCategory: 'vendors/getJobsByCategory?',
  getFilter: 'vendors/getfilters',
  getvendorAround: "customer/vendorAroundYou?",
  getTopSerVices: 'customer/getAllVendors',
  customerFilterservice:'customer/getfilters' ,
  quickOrder:'order/quick-order',
  customerFilter:'customer/filter?',
  getVenderByCatagory:'customer/get-vendor-profile?',
  getVenderAllCategory:'vendors/categories',
  getJobAround:'vendors/get-around-job?',
  viewJob:'customer/jobs/detail?',
  getCompleteJob:'vendors/get-completed-job',
  venderFilter:'vendors/filter'
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  fifteenWidth: width * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.023,
  twentyFive: height * 0.03,
  fifty: height * 0.075,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export default Constants;
