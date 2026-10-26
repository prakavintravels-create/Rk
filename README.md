# Prakavin Travels — React website

A responsive React + Vite starter website for Prakavin Travels.

## Included
- Responsive landing page
- One-way, airport, outstation and tour package sections
- Toyota Etios and Innova Crysta vehicle preferences
- Booking form that opens WhatsApp with the trip details
- Contact links and mobile layout

## Run locally
Install Node.js, then in this folder run:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Before publishing
1. Verify the WhatsApp number in `src/main.jsx`. It is currently set to India country code +91 and the supplied number 6380772299.
2. Confirm that the email and phone details are correct.
3. Replace the sample stock photos with photos you have permission to use, if desired.
4. Only add genuine customer reviews once you have permission to publish them.
5. The booking form sends an enquiry to WhatsApp; it does not confirm bookings, calculate fares, take payments, or provide live vehicle tracking.
6. Deploy the project to Vercel or another React hosting service.
7. After buying `prakavintravels.com`, add it in your hosting project's domain settings and follow the DNS instructions provided by the host.

## Suggested deployment
Push this folder to GitHub, import the repository into Vercel, and deploy with the default Vite settings. Add your custom domain after deployment.
