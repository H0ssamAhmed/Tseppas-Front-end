"use client"
import React, { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        window.alert(`Thank you for your message! We will reply as soon as possible.`)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        }) // You can handle form submission here
        // You might want to add form submission logic (e.g., API call) here
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className='mb-4 flex flex-col items-start w-full gap-3 md:flex-row md:items-center md:justify-between'>
                    <div className=' w-full'>
                        <label htmlFor="firstName" className="block mb-1">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
                    </div>
                    <div className=' w-full'>
                        <label htmlFor="lastName" className="block mb-1">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className=" bg-primary hover:bg-primary/50 transition text-white px-4 py-2 rounded-md">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
