import LegalPage, { LegalSection, CONTACT_EMAIL } from "@/components/layout/LegalPage";

const mail = <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white">{CONTACT_EMAIL}</a>;

export default function Terms() {
  return (
    <LegalPage label="Legal" title="Terms of Use" updated="September 17, 2026">
      <LegalSection title="About this website">
        <p>
          This website is run by Point of View ("POV") and presents our art and music events, our archive and our
          merchandise. By using the website you accept these terms.
        </p>
      </LegalSection>

      <LegalSection title="Events and tickets">
        <p>
          Event information (dates, venues, line-ups, times) may change. We do our best to keep it up to date, but the
          latest information is always the one published on our Instagram and on the ticketing platforms.
        </p>
        <p>
          Tickets are sold by third-party platforms (such as Shotgun, Resident Advisor and Xceed). Purchases, refunds and
          entry conditions are governed by the terms of the platform you buy from and by the venue's rules.
        </p>
      </LegalSection>

      <LegalSection title="Merchandise">
        <p>
          Our merch is sold through our store hosted on Fourthwall. Orders, payments, shipping, returns and refunds are
          handled by Fourthwall according to the terms, returns policy and FAQ published on the store.
        </p>
      </LegalSection>

      <LegalSection title="Newsletter">
        <p>
          You can subscribe to receive news about events and merch. You can unsubscribe at any time using the link in
          every email. See our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a> for details.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The POV name and logo, flyers, artwork, photos, videos and 3D models on this website belong to Point of View or
          to the respective artists and may not be reused without permission.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          The website links to external services (ticketing platforms, Fourthwall, Instagram). We are not responsible
          for their content or practices.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          The website is provided "as is". To the extent permitted by law, we are not liable for temporary
          unavailability or for errors in the information published.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>For any question about these terms, write to {mail}.</p>
      </LegalSection>
    </LegalPage>
  );
}
