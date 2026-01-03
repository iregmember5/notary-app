import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EasyIcon from "./IconRenderer";

interface FormField {
  id: number;
  label: string;
  field_type: string;
  placeholder: string;
  required: boolean;
  choices: string[];
  order: number;
}

interface WebFormData {
  heading: string;
  description: string;
  form: {
    id: number;
    name: string;
    form_title: string;
    form_description: string;
    success_message: string;
    button_text: string;
    fields: FormField[];
  };
}

interface WebFormProps {
  isOpen: boolean;
  onClose: () => void;
  data: WebFormData;
}

const countries = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+86", flag: "🇨🇳", name: "CN" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+62", flag: "🇮🇩", name: "ID" },
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+55", flag: "🇧🇷", name: "BR" },
  { code: "+234", flag: "🇳🇬", name: "NG" },
  { code: "+880", flag: "🇧🇩", name: "BD" },
  { code: "+7", flag: "🇷🇺", name: "RU" },
  { code: "+52", flag: "🇲🇽", name: "MX" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
  { code: "+251", flag: "🇪🇹", name: "ET" },
  { code: "+63", flag: "🇵🇭", name: "PH" },
  { code: "+20", flag: "🇪🇬", name: "EG" },
  { code: "+84", flag: "🇻🇳", name: "VN" },
  { code: "+243", flag: "🇨🇩", name: "CD" },
  { code: "+90", flag: "🇹🇷", name: "TR" },
  { code: "+98", flag: "🇮🇷", name: "IR" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+66", flag: "🇹🇭", name: "TH" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+255", flag: "🇹🇿", name: "TZ" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+39", flag: "🇮🇹", name: "IT" },
  { code: "+27", flag: "🇿🇦", name: "ZA" },
  { code: "+95", flag: "🇲🇲", name: "MM" },
  { code: "+254", flag: "🇰🇪", name: "KE" },
  { code: "+82", flag: "🇰🇷", name: "KR" },
  { code: "+57", flag: "🇨🇴", name: "CO" },
  { code: "+34", flag: "🇪🇸", name: "ES" },
  { code: "+256", flag: "🇺🇬", name: "UG" },
  { code: "+54", flag: "🇦🇷", name: "AR" },
  { code: "+213", flag: "🇩🇿", name: "DZ" },
  { code: "+249", flag: "🇸🇩", name: "SD" },
  { code: "+380", flag: "🇺🇦", name: "UA" },
  { code: "+964", flag: "🇮🇶", name: "IQ" },
  { code: "+48", flag: "🇵🇱", name: "PL" },
  { code: "+1", flag: "🇨🇦", name: "CA" },
  { code: "+212", flag: "🇲🇦", name: "MA" },
  { code: "+966", flag: "🇸🇦", name: "SA" },
  { code: "+998", flag: "🇺🇿", name: "UZ" },
  { code: "+51", flag: "🇵🇪", name: "PE" },
  { code: "+60", flag: "🇲🇾", name: "MY" },
  { code: "+93", flag: "🇦🇫", name: "AF" },
  { code: "+967", flag: "🇾🇪", name: "YE" },
  { code: "+233", flag: "🇬🇭", name: "GH" },
  { code: "+258", flag: "🇲🇿", name: "MZ" },
  { code: "+977", flag: "🇳🇵", name: "NP" },
  { code: "+261", flag: "🇲🇬", name: "MG" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
];

const WebForm: React.FC<WebFormProps> = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const handleChange = (fieldId: number, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    data.form.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submission_data = data.form.fields.map(field => ({
        field_id: field.id,
        label: field.label,
        value: formData[field.id] ?? ""
      }));

      const response = await fetch("https://esign-admin.signmary.com/blogs/api/v2/submit-form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Url": "https://notarywealthbuilder.com",
        },
        body: JSON.stringify({ form_id: data.form.id, submission_data }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          setFormData({});
        }, 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const cleanChoices = field.choices.map((c) => c.trim()).filter((c) => c);

    switch (field.field_type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={field.placeholder || "Your answer"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent"
          />
        );

      case "email":
        return (
          <input
            type="email"
            placeholder={field.placeholder || "Your email"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent"
          />
        );

      case "number":
        return (
          <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-purple-600 transition-colors">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-0 py-2 border-0 outline-none text-sm bg-transparent cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder={field.placeholder || "Your answer"}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="flex-1 px-0 py-2 border-0 outline-none text-sm bg-transparent"
            />
          </div>
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder || "Your answer"}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={3}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent resize-none"
          />
        );

      case "radio":
        return (
          <div className="space-y-2">
            {cleanChoices.map((choice, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group py-1">
                <div className="relative">
                  <input
                    type="radio"
                    name={`field-${field.id}`}
                    value={choice}
                    checked={formData[field.id] === choice}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-5 h-5 text-purple-600 border-gray-400 focus:ring-purple-600 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {cleanChoices.length > 0 ? (
              cleanChoices.map((choice, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={(formData[field.id] || []).includes(choice)}
                    onChange={(e) => {
                      const current = formData[field.id] || [];
                      const updated = e.target.checked
                        ? [...current, choice]
                        : current.filter((c: string) => c !== choice);
                      handleChange(field.id, updated);
                    }}
                    className="w-5 h-5 text-purple-600 border-gray-400 rounded focus:ring-purple-600 cursor-pointer mt-0.5"
                  />
                  <span className="text-sm text-gray-700">{choice}</span>
                </label>
              ))
            ) : (
              <label className="flex items-center gap-3 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={formData[field.id] || false}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="w-5 h-5 text-purple-600 border-gray-400 rounded focus:ring-purple-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700">I agree</span>
              </label>
            )}
          </div>
        );

      case "select":
        return (
          <select
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-purple-600 outline-none transition-colors text-sm bg-transparent cursor-pointer"
          >
            <option value="">Choose</option>
            {cleanChoices.map((choice, idx) => (
              <option key={idx} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-gray-100 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-8 bg-white rounded-lg shadow-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <EasyIcon icon="FiX" size={20} color="#5f6368" />
            </button>

            {showSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <EasyIcon icon="FiCheckCircle" size={32} color="#1e8e3e" />
                </div>
                <h3 className="text-xl font-normal text-gray-800">
                  {data.form.success_message}
                </h3>
              </div>
            ) : (
              <div className="p-6">
                <div className="bg-purple-600 rounded-t-lg p-6 -m-6 mb-6">
                  <h2 className="text-3xl font-normal text-white mb-2">
                    {data.form.form_title}
                  </h2>
                  {data.form.form_description && (
                    <p className="text-purple-100 text-sm">{data.form.form_description}</p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {data.form.fields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div key={field.id} className="bg-white border border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                        <label className="block text-sm font-normal text-gray-700 mb-4">
                          {field.label}
                        </label>
                        {renderField(field)}
                        {errors[field.id] && (
                          <p className="text-xs text-red-600 mt-2">{errors[field.id]}</p>
                        )}
                      </div>
                    ))}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? "Submitting..." : data.form.button_text}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({})}
                      className="px-6 py-2.5 text-purple-600 text-sm font-medium hover:bg-purple-50 rounded transition-colors"
                    >
                      Clear form
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebForm;
