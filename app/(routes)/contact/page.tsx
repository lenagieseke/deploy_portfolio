import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const Contact = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16">
      <h1>Contact</h1>

      <p className="text-base italic sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-prose py-4 sm:py-2 lg:py-8">
        If you would like to discuss a project, a topic, ask for a talk, or simply say
        hello, send me a message!
      </p>

      {/* Email */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <Mail className="h-5 w-5 text-gray-700" />
        <span className="font-medium">Email:</span>
        <Image
          src="/img/email_01.png"
          alt="Email address"
          width={120}
          height={120}
          className="w-36 sm:w-44 md:w-52 h-auto"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <Phone className="h-5 w-5 text-gray-700" />
        <a
          href="tel:+493316202320"
          className="text-gray-800 hover:text-gray-500 underline-offset-2 hover:underline"
        >
          +49 331 6202320
        </a>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 sm:gap-3 mt-4">
        <MapPin className="h-5 w-5 text-gray-700 mt-0.5" />
        <div className="space-y-0.5 text-gray-800">
          <p>Film University Babelsberg KONRAD WOLF</p>
          <p>Marlene-Dietrich-Allee 11</p>
          <p>14482 Potsdam</p>
          <p>Germany</p>
        </div>
      </div>
    </main>
  );
};

export default Contact;