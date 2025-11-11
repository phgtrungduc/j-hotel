export namespace BookingHelpers {
  /**
   * Opens J Village Facebook page in a new tab
   */
  export function openFacebookBooking(): void {
    const facebookUrl = 'https://www.facebook.com/j.village.hanoi';
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  }
}

