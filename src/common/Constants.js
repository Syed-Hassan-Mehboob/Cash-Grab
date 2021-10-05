import {Dimensions, StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
export const {width, height} = Dimensions.get('window');
import COLORS from '../common/Colors';
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
  VendorSignUp: 'VendorSignUp',
  forgetPassword: 'ForgetPassword',
  verifyVia: 'VerifyVia',
  otp: 'OTP',
  allCategories: 'AllCategories',
  singleCategory: 'SingleCategory',
  vendorAllCategories: 'VendorAllCategories',
  advanceBooking: 'AdvanceBooking',
  bookingConfirmed: 'BookingConfirmed',
  BookingAcceptance: 'BookingAcceptance',
  filter: 'Filter',
  Filtered: 'Filtered',
  venderFilter: 'vendors/getfilters',
  venderFilterd: 'venderFilterd',
  changePassword: 'ChangePassword',
  editProfile: 'EditProfile',
  vendorEditProfile: 'VendorEditProfile',
  AddProfileServices: 'AddProfileServices',
  viewVendorProfile: 'ViewVendorProfile',
  SchechuleJobDetail: 'SchechuleJobDetail',
  chat: 'Chat',
  chatListing: 'ChatListing',
  vendorSingleCategory: 'VendorSingleCategory',
  vendorAllJobs: 'vendorAllJobs',
  viewJob: 'ViewJob',
  JobInProgress: 'JobInProgress',
  History: 'History',
  SingleJobHistory: 'SingleJobHistory',
  faq: 'Faq',
  dateTimeSlots: 'DateTimeSlots',
  search: 'Search',
  confirmPayment: 'ConfirmPayment',
  withDraw: 'WithDraw',
  ScheduleJobs: 'ScheduleJobs',
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
  WriteReviews: 'WriteReviews',
  QuickNotify: 'QuickNotify',
  VenderBookings: 'VenderBookings',
  VendorQuickJob: 'VendorQuickJob',
  SelectIntrest: 'SelectIntrest',
  SelectIndustry: 'SelectIndustry',
  SelectServices: 'SelectServices',
  ServiceProviderOnTheWay: 'ServiceProviderOnTheWay',
  ThankYou: 'ThankYou',
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
  servies: 'auth/services',
  getAllVendorCategories: 'customer/getAllVendors',
  getAllCustomerCategories: 'customer/categories',
  postJob: 'customer/jobs/create',
  getAllJobs: 'vendors/getAllJobs',
  getJobsByCategory: 'vendors/getJobsByCategory?',
  getVenderFilter: 'vendors/getfilters',
  getvendorAround: 'customer/vendorAroundYou?',
  getTopSerVices: 'customer/getAllVendors',
  customerFilterservice: 'customer/getfilters',
  quickOrder: 'order/quick-order',
  customerFilter: 'customer/filter?',
  getVenderByCatagory: 'customer/get-vendor-profile?',
  getVenderAllCategory: 'vendors/categories',
  getJobAround: 'vendors/get-around-job?',
  viewJob: 'customer/jobs/detail?',
  getCompleteJob: 'vendors/get-completed-job',
  search: 'customer/filter-services?',
  venderFilterd: 'vendors/filter?',
  UserHome: 'UserHome',
  AddServices: 'AddServices',
  AddTeamMember: 'AddTeamMember',
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
  h14: width * 0.03,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
  body20: width * 0.05,
};

export const FONTFAMILY = {
  Light: 'Jost-Light',
  Medium: 'Jost-Regular',
  Bold: 'Jost-Bold',
};

export const FONTS = {
  boldFont14: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h14,
  },
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
  },
  boldFont26: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24 * 1.5,
  },
  mediumFont10: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10},
  mediumFont12: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12},
  mediumFont14: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14},
  mediumFont16: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16},
  mediumFont18: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18},
  mediumFont20: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body20},
  lightFont10: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10},
  lightFont12: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12},
  lightFont14: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14},
  lightFont16: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16},
  lightFont18: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18},
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:
    //   Platform.OS === 'android'
    //     ? SIZES.twenty
    //     : getStatusBarHeight(true) + SIZES.five,

    paddingTop:
      Platform.OS === 'android'
        ? SIZES.ten
        : getStatusBarHeight(true) + SIZES.five,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 20,
  },
  card: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
});

export default Constants;
