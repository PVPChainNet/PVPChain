import {useSidebar} from '@/contexts/SidebarContext';
import Page from '../../components/page';

export default function PrivacyPolicy() {
  const sidebarStateActive = useSidebar();

  return (
    <Page showConnectButton={true} showNav={false} showAppFooter={false} showAppHeader={false}>
      <div className={`${sidebarStateActive ? 'sidebarActive' : 'sidebarSmall'}`}>
        <div className="mt-24 mb-12 mx-[4.5rem]">
          <div className=" font-sans">
            <div className="container mx-auto p-8">
              <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
              <p className="mb-4">Last Updated: [Date]</p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p>
                  Thank you for using [Your Company Name] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). This
                  Privacy Policy outlines how we collect, use, and protect information when you use our web3 platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">2.1 Crypto Wallet Connections</h3>
                  <p>
                    When you choose to connect your crypto wallet to our platform, we collect and display your public
                    wallet address on the site. This public address is pseudonymous and is used for identification
                    purposes within the platform.
                  </p>
                </div>

                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">2.2 Transaction Data</h3>
                  <p>
                    If your interactions on our platform involve transactions or interactions with blockchain smart
                    contracts, we may collect and process transaction data. This may include transaction history,
                    amounts, and transaction identifiers.
                  </p>
                </div>

                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">2.3 Third-Party Integrations</h3>
                  <p>
                    Our platform may use third-party libraries for wallet connections. When you connect your wallet,
                    these third-party integrations may access and interact with your data. Please refer to the terms and
                    privacy policies of these third parties for more information.
                  </p>
                </div>

                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">2.4 Cookies and Tracking</h3>
                  <p>
                    We may use cookies or similar technologies for analytics purposes. These technologies help us
                    understand how users interact with our platform. You can manage your cookie preferences through your
                    browser settings.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc ml-8">
                  <li>To provide and improve our services</li>
                  <li>To personalize user experience</li>
                  <li>To ensure the security of transactions and interactions</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Security</h2>
                <p>
                  We take the security of your data seriously. We implement industry-standard security measures to
                  protect against unauthorized access, disclosure, alteration, and destruction of data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
                <p>
                  We retain user data for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
                  If you have specific questions about data retention, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. User Controls</h2>
                <p>
                  You have control over your data. You can disconnect your wallet, update privacy settings, or delete
                  your account if applicable. Contact us for assistance with these actions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Legal Compliance</h2>
                <p>
                  We comply with applicable laws and regulations, including those related to crypto and financial
                  transactions. This may include anti-money laundering (AML) and know your customer (KYC) requirements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Changes to this Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be reflected on this page, and
                  the effective date will be updated accordingly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy, please contact us at [your contact
                  email].
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
