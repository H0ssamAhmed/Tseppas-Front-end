import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { cn } from '../../../lib/utils';
import { CartContext } from '../../_context/CartContext';
import orderApi from '../../_utils/orderApi';
import { useUser } from '@clerk/nextjs';
import cartApi from '../../_utils/cartApi';

const CheckoutForm = ({ amount }) => {
    const { cart, setCart } = useContext(CartContext)
    const { user } = useUser()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [postalCode, SetPostalCode] = useState('')



    const createOrder_ = () => {
        let productsId = []
        let orderDetails = []
        cart.forEach(element => {
            productsId.push(element?.attributes?.products?.data[0]?.id);
            orderDetails.push({
                productsId: element?.attributes?.products?.data[0]?.id,
                quantity: element?.attributes?.productDetails.quantity,
                ProductTitle: element?.attributes?.products.data[0].attributes.title
            });
            cartApi.deletItem(element.id)
        });
        const orderCalculator = (calculationType) => {
            if (calculationType == "price") {
                return cart.reduce((accumulator, currentItem) => {
                    return (accumulator + (currentItem?.attributes?.productDetails.quantity * currentItem?.attributes?.products?.data[0]?.attributes.price));
                }, 0)
            }
            if (calculationType == "pieces") {
                return cart.reduce((accumulator, currentItem) => {
                    return (accumulator + (currentItem?.attributes?.productDetails.quantity));
                }, 0)
            }
        }
        const userInfo = {
            fName: fName,
            lName: lName,
            email: email,
            address: address,
            phone: phone,
            postalCode: postalCode
        }
        const data = {
            data: {
                username: user.fullName,
                email: user.primaryEmailAddress.emailAddress,
                products: productsId,
                pieces: orderCalculator('pieces'),
                price: orderCalculator('price'),
                userinfo: userInfo,
                orderDetails: orderDetails
            },

        }
        orderApi.createOrder(data)
        setCart([])

    }
    const handleSubmit = async (event) => {

        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);


        const handleError = (error) => {
            setLoading(false);
            setErrorMessage(error.message);
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }
        // console.log(typeof Number.parseFloat(amount))
        const res = await fetch('api/create-intent', {
            method: "POST",
            body: JSON.stringify({
                amount: Number.parseFloat(amount)
            })
        })
        createOrder_()

        const clientSecret = await res.json()
        const result = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payement-confirmed",
            },
        })

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mx-32 md-mx-[320px] mt-12 py-24 px-16'>
                <div className=' grid grid-cols-2 gap-2 items-center'>
                    <div className=' flex flex-col py-2'>
                        <label htmlFor="first">First Name</label>
                        <input
                            onChange={(e) => setFname(e.target.value)}
                            value={fName}
                            className='h-[44px] rounded-md bg-white focus:outline border text-black pl-4' id='first' required type="text" placeholder='First Name' />
                    </div>
                    <div className=' flex flex-col py-2'>
                        <label htmlFor="last">Last Name</label>
                        <input
                            onChange={(e) => setLname(e.target.value)}
                            value={lName}
                            className='h-[44px] rounded-md bg-white focus:outline border text-black pl-4' id='last' required type="text" placeholder='Last Name' />
                    </div>
                </div>
                <div className=' flex flex-col py-2'>
                    <label htmlFor="last">Phone Number</label>
                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        className='h-[44px] rounded-md bg-white focus:outline border text-black pl-4' id='Phone' required type='number' placeholder='Phone number' />
                </div>
                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div className=' flex flex-col py-2'>
                        <label htmlFor="last">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='h-[44px] rounded-md bg-white focus:outline border text-black pl-4' id="Email" required type='email' placeholder='Enter your Email' />
                    </div>
                    <div className=' flex flex-col py-2'>
                        <label htmlFor="last">Postal code </label>
                        <input
                            onChange={(e) => SetPostalCode(e.target.value)}
                            value={postalCode}
                            className='h-[44px] rounded-md bg-white focus:outline border text-black pl-4' id="Email" required type='text' maxLength='8' placeholder='Enter your postal code ' />
                    </div>
                </div>
                <div className=' flex flex-col py-2'>
                    <label htmlFor="last">Address</label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className='h-[44px] rounded-md bg-white focus:outline border text-black pl-4' id="Address" required type="text" placeholder='Enter your address' />
                </div>
                <PaymentElement className='text-white dark:text-black pt-4' />
                <button
                    type="submit"
                    disabled={!stripe}
                    className={cn('px-4 cursor-pointer py-2 bg-primary/60 hover:bg-primary transition w-full rounded-sm shadow-md  text-white mt-8',
                        loading && "hidden"
                    )}>Submit
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={cn('px-4  py-2 bg-primary/60 transition w-full rounded-sm shadow-md hidden  text-white mt-8', loading && "block cursor-not-allowed bg-primary/50")}>Loading
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;