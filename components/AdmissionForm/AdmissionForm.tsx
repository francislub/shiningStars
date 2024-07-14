'use client';

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function AdmissionForm() {

    const router = useRouter();

    const [client, setClient] = React.useState({
        name: "",
        number: "",
        service: "",
        email: "",
        message: ""
    });

    const [clientEmail, setClientEmail] = React.useState({
        newsemail: ""
    });

    const [loading, setLoading] = React.useState(false);

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    useEffect(() => {
        if(client.name.length > 0 && client.number.length > 0 && client.service.length > 0 && client.email.length > 0 && client.message.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [client]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            });
            const data = await res.json();
            if(data.success) {
                setClient({
                    name: "",
                    number: "",
                    service: "",
                    email: "",
                    message: ""
                });
                setLoading(false);
            } else {
                setLoading(false);
            }
            router.push('/services');
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientEmail)
            });
            const data = await res.json();
            if(data.success) {
                setClientEmail({
                    newsemail: ""
                });
                setLoading(false);
            } else {
                setLoading(false);
            }
            router.push('/contact');
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="container h-screen w-screen my-3 mx-auto">

            {/* contact section  */}
            <section className="contact_section mt-4">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Get In <span>Touch</span></h2>
                        <p className="text-lg px-4">
                            With a proven track record of successful projects and a 
                            dedication to delivering exceptional results, Ozoh Engineering 
                            Company is your trusted partner for all your engineering needs. 
                            Contact us today to discuss how we can bring your visions to life 
                            and help you achieve your goals.
                        </p>
                    </div>
                    <h3 className=" font-medium text-center">Contact Form</h3>
                    <div className="row flex justify-center text-center items-center mx-1">
                        <div className="col-md-6 px-0">
                            <div className="form_container ">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <input 
                                                type="text" 
                                                className="form-control rounded" 
                                                id="name" 
                                                placeholder="Your Name" 
                                                onChange={(e) => setClient({...client, name:e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-lg-6">
                                            <input 
                                                type="text" 
                                                className="form-control rounded" 
                                                id="number"
                                                placeholder="Phone Number" 
                                                onChange={(e) => setClient({...client, number:e.target.value})} />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <input 
                                                type="text" 
                                                id="service" 
                                                className="form-control wide rounded" 
                                                placeholder="Specify Service Here"
                                                onChange={(e) => setClient({...client, service:e.target.value})} >
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <input 
                                                type="email" 
                                                className="form-control rounded" 
                                                id="email"
                                                placeholder="Email" 
                                                onChange={(e) => setClient({...client, email:e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <textarea 
                                                className="message-box form-control rounded" 
                                                id="message"
                                                placeholder="Message" 
                                                onChange={(e) => setClient({...client, message:e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="btn_box flex-col">
                                        <div className="-mt-2 mb-4">
                                            <p className="text-lg text-orange-500">{loading ? 'Please wait, processing Feedback Form .....' : ''}</p>
                                        </div>
                                        <button type="submit" className="rounded">
                                            {buttonDisabled ? 'Provide Feedback' : 'Send Feedback'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end contact section  */}

            {/* info section  */}
            <section className="info_section mt-10">
                <div className="info_container layout_padding2">
                    <div className="container">
                        <div className="info_logo">
                            <a className="navbar-brand" href="index.html"> OZOH <span>ENG. COMPANY</span> </a>
                        </div>
                        <div className="info_main">
                            <div className="row">
                                <div className="col-md-3 col-lg-2">
                                    <div className="info_link-box">
                                        <h5>
                                            Useful Links
                                        </h5>
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link href="/about">About </Link>
                                            </li>
                                            <li>
                                                <Link href="/services">Services </Link>
                                            </li>
                                            <li>
                                                <Link href="/portfolio"> Portfolio </Link>
                                            </li>
                                            <li>
                                                <Link href="/contact"> Contact </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 mx-auto  ">
                                    <h5>
                                        Social Media
                                    </h5>
                                    <div className="social_box">
                                        <Link href="www.facebook.com">
                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                        </Link>
                                        <Link href="www.twitter.com">
                                            <i className="fa fa-twitter" aria-hidden="true"></i>
                                        </Link>
                                        <Link href="www.linkedin.com">
                                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                                        </Link>
                                        <Link href="www.youtube.com">
                                            <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-3 mt-4">
                                    <div className="info_form ">
                                        <h5>Subscribe To Our Newsletter</h5>
                                        <div className="-mt-2 mb-4">
                                            <p className="text-lg text-orange-500">{loading ? 'Please wait, Processing Email .....' : ''}</p>
                                        </div>
                                        <form action="" onSubmit={handleEmailSubmit}>
                                            <input 
                                                className="text-black" 
                                                type="email" 
                                                id="newsemail"
                                                placeholder="Enter Your Email" 
                                                onChange={(e) => setClientEmail({...clientEmail, newsemail:e.target.value})} />
                                            <button type="submit">
                                                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="info_bottom">
                            <div className="info_contact ">
                                <div className="row">
                                    <div className="col-md-3">
                                        <Link href="/" className="link-box">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        <span>
                                            Bweyogerere Butto
                                        </span>
                                        </Link>
                                    </div>
                                    <div className="col-md-5">
                                        <Link href="/" className="link-box">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                            <span>
                                                Call +256 772 174 100 or +256 758 156 715(Whatsapp)
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="col-md-4">
                                        <Link href="mailto:ozohengineeringcompany@gmail.com" className="link-box">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                            <span>
                                                ozohengineeringcompany@gmail.com
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end info section  */}
        </div>
    )
}