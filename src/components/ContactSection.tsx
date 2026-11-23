import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  COMPANY_INFO,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../data/srilankaData';
import { TranslationCopy } from '../data/translations';

interface ContactSectionProps {
  t: TranslationCopy;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Custom Sri Lanka Tour');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedChannel, setSubmittedChannel] = useState<'whatsapp' | 'email' | null>(null);

  const validateAndCompose = (): string | null => {
    if (!name.trim()) {
      setError('Please enter your name so our travel desk can address you.');
      return null;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return null;
    }
    setError(null);
    return [
      `Hello TRY LANKA TRAVELS!`,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phone.trim() ? `Phone / WhatsApp: ${phone.trim()}` : '',
      `Service Needed: ${service}`,
      message.trim() ? `Details:\n${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const body = validateAndCompose();
    if (!body) return;
    setSubmittedChannel('whatsapp');
    const link = document.createElement('a');
    link.href = buildWhatsAppUrl(body);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleOpenEmail = () => {
    const body = validateAndCompose();
    if (!body) return;
    setSubmittedChannel('email');
    const link = document.createElement('a');
    link.href = buildMailtoUrl(`${service} Inquiry — ${name.trim()}`, body);
    link.click();
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-t border-[#E6E1D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C58A2A] mb-2.5">
            {t.contact.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#14201B] leading-tight text-balance">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A6B63] leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="bg-[#0D2B22] text-[#FAF8F3] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5 text-[#4ADE80]" />
                </div>
                <h3 className="font-display text-2xl font-semibold">
                  {t.contact.whatsappCardTitle}
                </h3>
                <p className="text-sm text-[#C7D6D0] mt-2 leading-relaxed">
                  {t.contact.whatsappCardDesc}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#E5A93B] tabular-nums flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {COMPANY_INFO.whatsappDisplay}
                </p>
              </div>
              <a
                href={buildWhatsAppUrl('Hello TRY LANKA TRAVELS! I would like to plan a Sri Lanka trip or taxi transfer.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-[#E5A93B] text-[#0D2B22] hover:bg-[#F0BA54] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.contact.whatsappBtn}
              </a>
            </div>

            <div className="bg-[#FAF8F3] border border-[#E4DFD4] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0D2B22]/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[#0D2B22]" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#14201B]">
                  {t.contact.emailCardTitle}
                </h3>
                <p className="text-sm text-[#5A6B63] mt-2 leading-relaxed">
                  {t.contact.emailCardDesc}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#0D2B22] break-all">
                  {COMPANY_INFO.email}
                </p>
                <p className="mt-2 text-xs text-[#6B7A72] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C58A2A] shrink-0" />
                  {COMPANY_INFO.officeCity}
                </p>
              </div>
              <a
                href={buildMailtoUrl(
                  'Sri Lanka Travel Inquiry — TRY LANKA TRAVELS',
                  'Hello TRY LANKA TRAVELS,\n\nI would like to inquire about a Sri Lanka tour package or private taxi transfer.'
                )}
                className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg border border-[#0D2B22] text-[#0D2B22] hover:bg-[#0D2B22] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t.contact.emailBtn}
              </a>
            </div>
          </div>

          {/* Direct Inquiry Form */}
          <form
            onSubmit={handleOpenWhatsApp}
            className="lg:col-span-7 bg-[#FAF8F3] border border-[#E4DFD4] rounded-xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#14201B]">
                {t.contact.formTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amara Perera / Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 / +49 / +94 ..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                    {t.contact.serviceLabel}
                  </label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  >
                    <option value="Custom Sri Lanka Tour">Custom Sri Lanka Tour</option>
                    <option value="Airport Taxi & Private Transfer">Airport Taxi &amp; Private Transfer</option>
                    <option value="Curated Tour Package">Curated Tour Package</option>
                    <option value="Wildlife Safari & Chauffeur">Wildlife Safari &amp; Chauffeur</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Arrival flight date, group size, destinations (Sigiriya, Ella, Yala, Galle)..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22] resize-none"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-red-700">{error}</p>
              )}

              {submittedChannel && (
                <div className="flex items-center gap-2 text-xs font-medium text-[#0D2B22] bg-[#E6F2EC] border border-[#BFDCD0] rounded-lg px-3.5 py-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D2B22] shrink-0" />
                  <span>{t.contact.sentSuccess}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-[#0D2B22] text-[#FAF8F3] hover:bg-[#164235] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
                {t.contact.submitWhatsapp}
              </button>
              <button
                type="button"
                onClick={handleOpenEmail}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg border border-[#0D2B22] text-[#0D2B22] hover:bg-[#0D2B22] hover:text-white transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                {t.contact.submitEmail}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
