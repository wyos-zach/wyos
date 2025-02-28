import PremiumCardExamples from '@/components/shared/examples/premium-card-examples';
import ButtonExamples from '@/components/shared/examples/button-examples';

export const metadata = {
  title: 'UI Showcase - Premium Components',
  description: 'Showcase of premium UI components for WYOS',
};

export default function UIShowcasePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-12 text-center text-4xl font-bold">Premium UI Components</h1>
      
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">Premium Buttons</h2>
        <div className="rounded-xl bg-gray-900 p-6 shadow-xl">
          <ButtonExamples />
        </div>
      </section>
      
      <section>
        <h2 className="mb-8 text-center text-3xl font-semibold">Premium Cards</h2>
        <div className="rounded-xl bg-gray-900 shadow-xl">
          <PremiumCardExamples />
        </div>
      </section>
    </div>
  );
}
