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

const WebForm: React.FC<WebFormProps> = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      const response = await fetch("https://esign-admin.signmary.com/api/v2/submit-form/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_id: data.form.id, data: formData }),
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
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent"
          />
        );

      case "email":
        return (
          <input
            type="email"
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent"
          />
        );

      case "number":
        return (
          <input
            type="tel"
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent"
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent resize-none"
          />
        );

      case "radio":
        return (
          <div className="space-y-3">
            {cleanChoices.map((choice, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={`field-${field.id}`}
                  value={choice}
                  checked={formData[field.id] === choice}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 group-hover:text-gray-900">{choice}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData[field.id] || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700">I agree</span>
          </label>
        );

      case "select":
        return (
          <select
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent"
          >
            <option value="">Select an option</option>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="sticky top-4 right-4 float-right z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <EasyIcon icon="FiX" size={24} color="#374151" />
            </button>

            {showSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <EasyIcon icon="FiCheckCircle" size={48} color="#10b981" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {data.form.success_message}
                </h3>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="mb-8 pb-6 border-b-4 border-blue-600">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {data.form.form_title}
                  </h2>
                  {data.form.form_description && (
                    <p className="text-gray-600">{data.form.form_description}</p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {data.form.fields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label className="block text-base font-medium text-gray-900">
                          {field.label}
                        </label>
                        {renderField(field)}
                        {errors[field.id] && (
                          <p className="text-sm text-red-600">{errors[field.id]}</p>
                        )}
                      </div>
                    ))}

                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? "Submitting..." : data.form.button_text}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-8 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
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
