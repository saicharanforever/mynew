import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import Galaxy from '@/components/ui/galaxy';
import SplitText from '@/components/ui/split-text';
import BlurText from '@/components/ui/blur-text';

interface FormData {
  firstName: string;
  lastName: string;
  date: string;
  time: string;
  partySize: string;
  phone: string;
  specialRequests: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    date: '',
    time: '5:30 PM',
    partySize: '2 Guests',
    phone: '',
    specialRequests: ''
  });

  const infoRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your reservation request! We will contact you shortly to confirm.');
  };

  return (
    <section
      id="contact"
      className="py-20 text-white relative overflow-hidden"
    >
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.2}
          glowIntensity={0.4}
          saturation={0.6}
          hueShift={240}
          transparent={true}
          speed={0.5}
          twinkleIntensity={0.4}
        />
      </div>
      {/* Content with dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div ref={infoRef} className="reveal">
            <SplitText className="font-playfair text-4xl md:text-5xl font-bold mb-8" delay={0.2} stagger={0.15}>
              Reserve Your Experience
            </SplitText>
            <BlurText className="text-xl mb-8 text-gray-300" delay={0.4} stagger={0.05}>
              Allow us to craft an unforgettable evening for you and your guests
            </BlurText>

            <div className="space-y-6 mb-8">
              <ContactInfo
                icon={<MapPin size={20} />}
                text="Opp. Newest Hub, Jubilee Hills, Hyderabad"
              />
              <ContactInfo
                icon={<Phone size={20} />}
                text="+91 7386951961"
              />
              <ContactInfo
                icon={<Mail size={20} />}
                text="saicharanvarkala192@gmail.com"
              />
              <ContactInfo
                icon={<Clock size={20} />}
                text="Dinner: Tuesday - Sunday, 5:30 PM - 10:00 PM"
                subtext="Closed Mondays"
              />
            </div>
            
          </div>

          <div ref={formRef} className="reveal">
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
              <h3 className="font-playfair text-2xl font-semibold mb-6">Make a Reservation</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Sai"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Charan"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                  <FormSelect
                    label="Time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    options={[
                      '3:00 PM','4:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
                      '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Party Size"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleInputChange}
                    options={[
                      '1 Guest', '2 Guests', '3 Guests', '4 Guests',
                      '5 Guests', '6+ Guests'
                    ]}
                  />
                  <FormField
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <FormTextarea
                  label="Special Requests"
                  name="specialRequests"
                  placeholder="Dietary restrictions, special occasions, etc."
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 font-medium transition-colors duration-300"
                  style={{
                    backgroundColor: 'var(--primary-accent)',
                    color: 'var(--primary-background)',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  Confirm Reservation
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ icon, text, subtext }: { icon: React.ReactNode; text: string; subtext?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-start space-x-4"
    >
      <div style={{ color: 'var(--primary-accent)' }} className="mt-1">
        {icon}
      </div>
      <div>
        <div>{text}</div>
        {subtext && <div className="text-sm text-gray-400">{subtext}</div>}
      </div>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="transition-colors duration-300"
      style={{ color: 'var(--primary-accent)' }}
    >
      {icon}
    </motion.a>
  );
}

function FormField({ 
  label, 
  name, 
  type, 
  placeholder, 
  value, 
  onChange, 
  required = false 
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field bg-[#2b2b2b96]"
      />
    </div>
  );
}

function FormSelect({ 
  label, 
  name, 
  value, 
  onChange, 
  options 
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="input-field"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({ 
  label, 
  name, 
  placeholder, 
  value, 
  onChange 
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="input-field resize-none"
      />
    </div>
  );
}
