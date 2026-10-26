import {LegalDocument} from '../legal-document.jsx';
import {LEGAL_UPDATED, privacy} from '@/lib/legal.mjs';

export const metadata = {title: 'PShop privacy policy'};

export default function PrivacyPage() {
  return <LegalDocument title="Privacy policy" updated={LEGAL_UPDATED} sections={privacy}/>;
}
