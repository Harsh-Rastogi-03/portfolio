import React, { useRef, useState } from 'react';
import "./contact.css";
import { HiOutlineMail, HiOutlineArrowSmRight } from "react-icons/hi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import Firestore instance

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();

        const name = form.current.name.value.trim();
        const email = form.current.email.value.trim();
        const project = form.current.project.value.trim();

        if (!name || !email || !project) {
            setMessage("All fields are required.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            // Add data to Firebase Firestore
            await addDoc(collection(db, "contacts"), {
                name,
                email,
                project,
                timestamp: new Date()
            });
            setMessage("Message sent successfully!");
            e.target.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            setMessage("Failed to send the message. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact section" id="contact">
            <h2 className="section__title">Let's Connect</h2>
            <span className="section__subtitle">Contact Me</span>

            <div className="contact__container container grid">
                <div className="contact__content">
                    <h3 className="contact__title">Talk to me</h3>

                    <div className="contact__info">
                        <div className="contact__card">
                            <HiOutlineMail className="contact__card-icon" />
                            <h3 className="contact__card-title">Email</h3>
                            <span className="contact__card-data">harshrastogi0603@gmail.com</span>
                            <a href="mailto:harshrastogi0603@gmail.com" className="contact__button">
                                Write Me{" "}
                                <HiOutlineArrowSmRight className="contact__button-icon" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact__content">
                    <h3 className="contact__title">What's the project?</h3>

                    <form ref={form} onSubmit={sendEmail} className="contact__form">
                        {loading && <p>Sending...</p>}
                        {message && <p>{message}</p>}

                        <div className="contact__form-div">
                            <label className="contact__form-tag">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="contact__form-input"
                                placeholder="Type your name"
                            />
                        </div>

                        <div className="contact__form-div">
                            <label className="contact__form-tag">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="contact__form-input"
                                placeholder="Type your email"
                            />
                        </div>

                        <div className="contact__form-div contact__form-area">
                            <label className="contact__form-tag">Project</label>
                            <textarea
                                name="project"
                                cols="30"
                                rows="10"
                                className="contact__form-input"
                                placeholder="Provide some project details..."
                            ></textarea>
                        </div>

                        <button href="#contact" className="button button--flex" disabled={loading}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
