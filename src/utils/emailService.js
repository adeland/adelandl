import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS only if public key is available
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const sendEmail = async (formData) => {
  try {
    // Validate required environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    // Prepare template parameters - match your EmailJS template exactly
    const templateParams = {
      subject: formData.subject,
      name: formData.name,
      message: formData.message,
      email: formData.email,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    if (response.status === 200) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      throw new Error(`Failed to send email. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send email. Please try again.' 
    };
  }
};

// Alternative implementation using a simple fetch to a backend service
// This is a fallback option if you prefer to use a backend service
export const sendEmailViaBackend = async (formData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: 'Failed to send email. Please try again.' 
    };
  }
};
