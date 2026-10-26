import {LegalDocument} from '../legal-document.jsx';
import {LEGAL_UPDATED, support} from '@/lib/legal.mjs';

export const metadata = {title: 'PShop support'};

export default function SupportPage() {
  return <LegalDocument title="Support" updated={LEGAL_UPDATED} sections={support}/>;
}
