export const termsContact = {
  phone: "+91-8595230598",
  email: "operation@nextripexpedition.com",
  hours: "Mon-Sat, 9:00 AM - 7:00 PM IST",
};

export const cancellationTiers = [
  {
    label: "Low Impact",
    window: "Booking → 90 days before arrival",
    percent: "10%",
    of: "of total invoice",
    note: "Most flexible option",
    tone: "emerald",
  },
  {
    label: "Moderate",
    window: "89 → 60 days before arrival",
    percent: "25%",
    of: "of total price",
    note: "Standard cancellation window",
    tone: "gold",
  },
  {
    label: "High Impact",
    window: "59 → 30 days before arrival",
    percent: "50%",
    of: "of total price",
    note: "Limited refund available",
    tone: "orange",
  },
  {
    label: "No Refund",
    window: "29 → 0 days before arrival",
    percent: "100%",
    of: "of total invoice",
    note: "Full charge applies",
    tone: "rose",
  },
] as const;

export const paymentSteps = [
  {
    n: "1",
    title: "Deposit at Booking",
    desc: "Secure your reservation with an initial payment",
    amount: "25% of total invoice",
    methods: ["Credit Card", "Bank Transfer"],
  },
  {
    n: "2",
    title: "Final Payment",
    desc: "Complete your booking before travel",
    amount: "60-90 days prior to arrival*",
    footnote: "*Unless otherwise specified on your invoice",
    methods: ["Bank Transfer Only"],
  },
] as const;

export const invoiceGuidelines = [
  "Thoroughly review your invoice once received",
  "As the Customer, you are solely responsible for sharing invoice details with all travel companions",
  "Only one invoice is issued per booking (no duplicates)",
  "Passenger names must match complete legal names exactly",
  "Notify your Travel Specialist immediately for any changes or corrections",
];

export const cancellationSteps = [
  "Cancellation requires written notification (email accepted)",
  "Policy takes effect the day notification is received by Next Trip Expedition",
  "Penalties below apply unless otherwise specified on your invoice",
];

export const privacyBlocks = [
  {
    title: "Transparent Data Collection",
    body: "We at Next Trip Expedition do not capture personal information without your knowledge and permission. Information is only requested when using our site's interactive features, products & services.",
  },
  {
    title: "Essential Third-Party Sharing",
    body: "When you book with us, we share necessary personal details with airlines, hotels, car rentals, or other partners solely to fulfill your travel arrangements successfully.",
  },
  {
    title: "We Never Sell Your Data",
    body: "We do not sell any personal information to third parties. Information is only shared with alliance partners/vendors for promotional benefits based on your booking history with us.",
  },
];
