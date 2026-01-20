import { getContactInfo } from '@/lib/strapi';
import ContactFormClient from '@/components/ContactFormClient';

interface ContactInfo {
  data: {
    id: number;
    attributes: {
      title: string;
      subtitle: string;
      email: string;
      phone: string;
      address: string;
      businessHours: string;
      googleMapsEmbedUrl?: string;
      socialLinks?: Array<{
        id: number;
        platform: string;
        url: string;
        icon?: string;
      }>;
    };
  };
}

export default async function ContactPage() {
  let contactInfo: ContactInfo | null = null;

  try {
    contactInfo = await getContactInfo() as ContactInfo;
  } catch (error) {
    console.error('Error fetching contact info:', error);
  }

  const info = contactInfo?.data?.attributes;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {info?.title || 'Get in Touch'}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            {info?.subtitle || "Have a question or want to work together? We'd love to hear from you."}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href={`mailto:${info?.email}`} className="text-gray-600 hover:text-gray-900">
                      {info?.email || 'contact@yourbusiness.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href={`tel:${info?.phone}`} className="text-gray-600 hover:text-gray-900">
                      {info?.phone || '+880 1712-345678'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: info?.address?.replace(/\n/g, '<br />') || 'House 45, Road 12<br />Gulshan-2, Dhaka 1212<br />Bangladesh' }} />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: info?.businessHours?.replace(/\n/g, '<br />') || 'Sunday - Thursday: 9:00 AM - 6:00 PM<br />Friday: Closed' }} />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {info?.socialLinks && info.socialLinks.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {info.socialLinks.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-800 hover:text-white transition-colors p-3 rounded-lg"
                      >
                        <span className="sr-only">{social.platform}</span>
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <ContactFormClient />
          </div>
        </div>
      </section>

      {/* Map Section */}
      {info?.googleMapsEmbedUrl && (
        <section className="py-16 bg-gray-100">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={info.googleMapsEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location"
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
