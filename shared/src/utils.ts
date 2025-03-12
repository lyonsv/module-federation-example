export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const getSiteFromDomain = (hostname: string): 'siteA' | 'siteB' => {
  if (hostname.includes('sitea')) return 'siteA';
  if (hostname.includes('siteb')) return 'siteB';
  return 'siteA'; // default to siteA
};

export const createClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
}; 