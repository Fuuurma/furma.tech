import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Furma.tech",
  description: "Privacy policy for Furma.tech - how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32 border-b border-grey-200">
        <div className="max-w-3xl px-6 md:px-12">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              Legal
            </span>
          </div>
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-foreground mb-7 animate-fade-up delay-1">
            Privacy<br />
            <em className="italic font-normal text-grey-600">Policy.</em>
          </h1>
          <p className="text-[17px] font-normal leading-[1.7] text-grey-600 max-w-[600px] animate-fade-up delay-2">
            Your privacy matters to us. This policy explains how we collect, use, 
            and protect your data when you use Furma.tech products and services.
          </p>
          <p className="text-[13px] text-grey-400 mt-6 animate-fade-up delay-2">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="max-w-3xl px-6 md:px-12">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">1. Who we are</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600">
                Furma.tech OÜ is a digital venture studio based in Sitges, Catalonia, 
                operating as an Estonian company (e-Residency). We build and operate 
                software products including industry SaaS tools and the Aitlas AI ecosystem.
              </p>
              <p className="text-[15px] leading-[1.7] text-grey-600 mt-4">
                <strong>Contact:</strong> hello@furma.tech
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">2. Data we collect</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600 mb-4">
                We collect minimal data necessary to provide our services:
              </p>
              <ul className="list-disc pl-6 text-[15px] leading-[1.7] text-grey-600 space-y-2">
                <li><strong>Account data:</strong> Email, name (when you sign up)</li>
                <li><strong>Usage data:</strong> How you use our products (anonymized)</li>
                <li><strong>API keys:</strong> Your provided API keys (encrypted)</li>
                <li><strong>Payment data:</strong> Processed via Stripe (we don&apos;t store card details)</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">3. BYOK - Your keys, your data</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600 mb-4">
                For Aitlas products (Nexus, Actions), you may provide your own API keys 
                (OpenAI, Anthropic, DeepSeek, etc.). Here&apos;s how we handle them:
              </p>
              <ul className="list-disc pl-6 text-[15px] leading-[1.7] text-grey-600 space-y-2">
                <li>Keys are encrypted with AES-256-GCM before storage</li>
                <li>Keys are never stored in plain text</li>
                <li>Keys are decrypted only in memory during execution</li>
                <li>We never see or use your keys for our own purposes</li>
                <li>You can delete your keys at any time</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">4. How we use your data</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600 mb-4">
                We use your data solely to:
              </p>
              <ul className="list-disc pl-6 text-[15px] leading-[1.7] text-grey-600 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process payments</li>
                <li>Communicate with you about your account</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-[15px] leading-[1.7] text-grey-600 mt-4">
                <strong>We never sell your data.</strong> Your data is yours.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">5. Data retention</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600">
                We retain your data only as long as your account is active. You can 
                request deletion of your data at any time by contacting us at 
                hello@furma.tech. We&apos;ll delete your data within 30 days.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">6. Security</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600 mb-4">
                We implement appropriate technical and organizational measures to protect 
                your data, including:
              </p>
              <ul className="list-disc pl-6 text-[15px] leading-[1.7] text-grey-600 space-y-2">
                <li>Encryption at rest (AES-256-GCM for API keys)</li>
                <li>Encryption in transit (TLS 1.2+)</li>
                <li>Access controls and authentication</li>
                <li>Regular security reviews</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">7. Your rights</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600 mb-4">
                Under GDPR and other privacy regulations, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-[15px] leading-[1.7] text-grey-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of your data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
              </ul>
              <p className="text-[15px] leading-[1.7] text-grey-600 mt-4">
                To exercise these rights, contact: hello@furma.tech
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">8. Third-party services</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600 mb-4">
                We use third-party services to operate our products:
              </p>
              <ul className="list-disc pl-6 text-[15px] leading-[1.7] text-grey-600 space-y-2">
                <li><strong>Vercel:</strong> Hosting and infrastructure</li>
                <li><strong>Neon (Supabase):</strong> PostgreSQL database</li>
                <li><strong>Stripe:</strong> Payment processing</li>
<li><strong>Your AI providers:</strong> OpenAI, Anthropic, DeepSeek (when you provide keys)</li>
              </ul>
              <p className="text-[15px] leading-[1.7] text-grey-600 mt-4">
                These providers have their own privacy policies and are GDPR-compliant.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">9. Children&apos;s privacy</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600">
                Our services are not intended for children under 16. We do not 
                knowingly collect data from children.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-[24px] font-semibold mb-4">10. Changes to this policy</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600">
                We may update this policy from time to time. We&apos;ll notify you of 
                significant changes via email or through our website. Your continued 
                use of our services after changes constitutes acceptance of the new policy.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-semibold mb-4">11. Contact us</h2>
              <p className="text-[15px] leading-[1.7] text-grey-600">
                If you have questions about this privacy policy, please contact us:
              </p>
              <p className="text-[15px] leading-[1.7] text-grey-600 mt-4">
                <strong>Email:</strong> hello@furma.tech<br />
                <strong>Address:</strong> Furma.tech OÜ, Estonia (e-Residency)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-16 bg-grey-50 border-t border-grey-200">
        <div className="max-w-2xl px-6 md:px-12">
          <h2 className="font-serif text-[28px] font-semibold leading-[1.1] tracking-tight text-foreground mb-4">
            Questions?
          </h2>
          <p className="text-[15px] leading-[1.7] text-grey-600 mb-6">
            If you have any questions about our privacy practices, we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-foreground text-background hover:bg-grey-800 transition-all"
          >
            Contact us →
          </Link>
        </div>
      </section>
    </div>
  );
}
