import LegalPage, { LegalSection, CONTACT_EMAIL } from "@/components/layout/LegalPage";

const mail = <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white">{CONTACT_EMAIL}</a>;

export default function Privacy() {
  return (
    <LegalPage label="Legal" title="Privacy Policy" updated="September 22, 2026">
      <LegalSection title="Who we are">
        <p>
          This website is run by Point of View ("POV", "we", "us"), a collective organising art and music events
          across Europe. For any question about your personal data you can contact us at {mail}.
        </p>
      </LegalSection>

      <LegalSection title="What data we collect">
        <p><strong className="text-white">Newsletter.</strong> If you subscribe, we collect your email address and the date of your consent.</p>
        <p><strong className="text-white">Contact.</strong> If you write to us, we receive your email address and the content of your message.</p>
        <p><strong className="text-white">Technical data.</strong> Our hosting provider may process basic technical data (such as IP address and browser type) to deliver the website securely.</p>
        <p>We do not ask for sensitive data and we never sell your data.</p>
      </LegalSection>

      <LegalSection title="Why we use it">
        <ul className="list-disc pl-5 space-y-2">
          <li>To send you news about upcoming events, ticket releases and merch drops, only if you gave your consent (legal basis: consent).</li>
          <li>To answer your requests (legal basis: your request / our legitimate interest).</li>
          <li>To keep the website running and secure (legal basis: legitimate interest).</li>
        </ul>
      </LegalSection>

      <LegalSection title="Third-party services">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-white">Vercel</strong> — website hosting.</li>
          <li><strong className="text-white">Newsletter provider</strong> (e.g. Brevo) — storage of subscriber emails and sending of newsletters.</li>
          <li><strong className="text-white">Fourthwall</strong> — our online merch store. Purchases are handled by Fourthwall under its own privacy policy.</li>
          <li><strong className="text-white">Ticketing platforms</strong> (Shotgun, Resident Advisor, Xceed) — tickets are sold on their websites under their own privacy policies.</li>
          <li><strong className="text-white">Instagram</strong> — when you follow the links to our profile.</li>
          <li><strong className="text-white">Meta Pixel</strong> — advertising measurement, only with your consent (see below).</li>
        </ul>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          Newsletter data is kept until you unsubscribe. Every email contains an unsubscribe link, or you can simply
          write to us. Contact messages are kept only as long as needed to answer you.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Under the GDPR you can ask to access, correct or delete your data, restrict or object to its processing,
          receive a copy of it, and withdraw your consent at any time. Write to {mail}. You also have the right to lodge
          a complaint with your local data protection authority.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and advertising">
        <p>
          We store a small preference in your browser to remember your cookie choice and whether you already closed
          or used the newsletter pop-up.
        </p>
        <p>
          If you press <strong className="text-white">Accept</strong> in the cookie banner, we load the{" "}
          <strong className="text-white">Meta Pixel</strong> (Meta Platforms Ireland Ltd.). It tells us which of our
          Instagram and Facebook ads brought you to the website and whether you then signed up to the newsletter, so
          we can measure our campaigns. Meta may combine this with your Meta account. If you choose{" "}
          <strong className="text-white">Only necessary</strong>, the pixel is never loaded.
        </p>
        <p>You can change your choice at any time from the "Cookies" link at the bottom of the homepage.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>We may update this policy from time to time. The date at the top shows the latest version.</p>
      </LegalSection>
    </LegalPage>
  );
}
