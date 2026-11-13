import { MessageCircle } from "lucide-react";
export default function WhatsAppHelp() {
  const url =
    "https://wa.me/919666585143?text=" +
    encodeURIComponent("Hi Sadhya! I need help with shopping or an order.");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Need help? Chat with Sadhya on WhatsApp"
      title="Need help? Chat on WhatsApp"
      className="fixed bottom-6 left-4 z-20 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#128C4A] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0f753e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:left-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span>Need help?</span>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
