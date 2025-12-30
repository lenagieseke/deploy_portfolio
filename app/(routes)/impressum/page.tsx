import Image from "next/image";

const Impressum = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12 lg:py-16">
      <h1>Impressum</h1>

      <h3 className="mt-8">(Legal Notice)</h3>
      <p className="mt-8">
        <strong>Lena Gieseke</strong><br />
        Marlene-Dietrich-Allee 11<br />
        14482 Potsdam<br />
        Germany
      </p>

      <p>
        E-mail:
        <Image
          src="/img/email_01.png"
          alt="Email address"
          width={120}
          height={120}
          className="w-42 sm:w-50 md:w-58 ml-4 h-auto inline-block"
        />
      </p>

      <h3 className="mt-8">Responsible under § 18 (2) MStV</h3>
      <p className="mt-8">
        Lena Gieseke<br />
        (address as above)
      </p>

      <h3 className="mt-8">Disclaimer</h3>
      <p className="mt-8">
        I do not assume any liability for the content of external links. The operators of the linked pages are solely responsible for their content.
      </p>

     <h3 className="mt-8">Terms of Use</h3>
    <p className="mt-8">
    The content of this website may not be accessed, copied, or used for the purposes of training machine learning models or automated data mining.</p>

    </main>
  );
};

export default Impressum;