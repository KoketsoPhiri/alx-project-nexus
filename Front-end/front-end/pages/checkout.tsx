import Header from '../components/Header';
import OrderSummary from '../components/OrderSummary';
import PaymentSummary from '../components/PaymentSummary';

export default function Checkout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Review your order</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderSummary />
          </div>
          <div className="lg:col-span-1">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </>
  );
}