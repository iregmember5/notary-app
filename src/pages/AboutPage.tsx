import { useState, useEffect } from 'react';
import { fetchAboutPage } from '../types/landing';
import type { AboutPageData } from '../types/about';
import { useTheme } from '../contexts/ThemeContext';

export default function AboutPage() {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    fetchAboutPage()
      .then((pageData) => {
        setData(pageData);
        if (pageData.color_theme) {
          setTheme(pageData.color_theme);
        }
      })
      .catch((error) => console.error('Failed to load about page:', error))
      .finally(() => setLoading(false));
  }, [setTheme]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!data) return <div className="flex items-center justify-center min-h-screen">About page not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {data.header_config && <div className="bg-white shadow-sm">{/* Render header */}</div>}

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
          {data.intro && <p className="text-xl max-w-3xl">{data.intro}</p>}
        </div>
      </section>

      {/* Featured Image */}
      {data.featured_image && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <img src={data.featured_image.url} alt={data.featured_image.title} className="w-full max-h-96 object-cover rounded-lg shadow-lg" />
          </div>
        </section>
      )}

      {/* Body Content */}
      {data.body && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: data.body }} />
          </div>
        </section>
      )}

      {/* Mission Statement */}
      {data.mission_statement && (
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">{data.mission_statement}</p>
          </div>
        </section>
      )}

      {/* Values */}
      {data.values && data.values.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.values.map((item, idx) => (
                <div key={idx} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
                  {item.value.icon && <div className="text-4xl mb-4">{item.value.icon}</div>}
                  {item.value.title && <h3 className="text-xl font-semibold mb-3">{item.value.title}</h3>}
                  {item.value.description && <p className="text-gray-600">{item.value.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Members */}
      {data.team_members && data.team_members.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.team_members.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {member.photo && <img src={member.photo.url} alt={member.name} className="w-full h-64 object-cover" />}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      {member.linkedin_url && <a href={member.linkedin_url} className="text-blue-600 hover:text-blue-800">LinkedIn</a>}
                      {member.twitter_url && <a href={member.twitter_url} className="text-blue-400 hover:text-blue-600">Twitter</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* History Milestones */}
      {data.history_milestones && data.history_milestones.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {data.history_milestones.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  {item.value.year && <div className="text-2xl font-bold text-blue-600 min-w-[80px]">{item.value.year}</div>}
                  <div>
                    {item.value.event && <h3 className="text-xl font-semibold mb-2">{item.value.event}</h3>}
                    {item.value.description && <p className="text-gray-600">{item.value.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {data.gallery.map((item, idx) => (
                <img key={idx} src={item.value.url} alt={item.value.title} className="w-full h-64 object-cover rounded-lg shadow-md" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {(data.contact_blurb || data.contact_email || data.contact_phone) && (
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            {data.contact_blurb && <p className="text-xl mb-8 max-w-2xl mx-auto">{data.contact_blurb}</p>}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {data.contact_email && (
                <a href={`mailto:${data.contact_email}`} className="text-lg hover:underline">
                  📧 {data.contact_email}
                </a>
              )}
              {data.contact_phone && (
                <a href={`tel:${data.contact_phone}`} className="text-lg hover:underline">
                  📞 {data.contact_phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {data.footer_config && <div className="bg-gray-900 text-white">{/* Render footer */}</div>}

      {/* Widgets */}
      {data.contact_widget?.is_active && <div dangerouslySetInnerHTML={{ __html: data.contact_widget.embed_code }} />}
      {data.helpdesk_widget?.is_active && <div dangerouslySetInnerHTML={{ __html: data.helpdesk_widget.embed_code }} />}
      {data.w9form_widget?.is_active && <div dangerouslySetInnerHTML={{ __html: data.w9form_widget.embed_code }} />}
    </div>
  );
}
