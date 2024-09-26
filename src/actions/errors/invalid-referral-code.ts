export class InvalidReferralCode extends Error {
  constructor() {
    super("Oops! Looks like you're giving a invalid referral code");
  }
}
