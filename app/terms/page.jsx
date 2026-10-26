import {LegalDocument} from '../legal-document.jsx';
import {LEGAL_UPDATED, terms} from '@/lib/legal.mjs';

export const metadata = {title: 'PShop terms'};

export default function TermsPage() {
  return <LegalDocument title="Terms of use" updated={LEGAL_UPDATED} sections={terms}/>;
}
