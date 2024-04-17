import { Footer } from "@components/components/DataStore/Footer";
import { Header } from "@components/components/DataStore/Header";

const Checkout = () => {
  return (
    <div>
      <Header />
      <div className="mt-16">
        <p>Continue discovering</p>
        <h2 className="text-4xl">Shopping Card</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Products</th>
              <th>License Type</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>Electronics Product Sales Dataset</td>
              <td>
                <div className="w-8 h-4 bg-slate-200"></div>
              </td>
              <td>$15,990</td>
              <td>delete</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>Electronics Product Sales Dataset</td>
              <td>
                <div className="w-8 h-4 bg-slate-200"></div>
              </td>
              <td>$15,990</td>
              <td>delete</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p>Please provide some details</p>
          <p>Personal information</p>
          <p>Company information</p>
          <p>
            By clicking &apos;Continue to Payment&apos; you agree to our Terms &
            Conditions and consent to us collecting your details for your order.
            View our Privacy Policy for more information.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
