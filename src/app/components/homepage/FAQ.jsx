'use client'
import React, { useState } from 'react'

const FAQ = () => {
    const faqs = [
        {
          question: 'Is there a free trial available?',
          answer:
            'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
        },
        {
          question: 'Can I change my plan later?',
          answer:
            'Yes, you can change your plan later according to your needs. We offer flexible options to accommodate your requirements.',
        },
        {
          question: 'What is your cancellation policy?',
          answer:
            'Our cancellation policy allows you to cancel your subscription at any time. You won’t be charged further, and you’ll retain access to your account until the end of the current billing period.',
        },
        {
          question: 'Can other info be added to an invoice?',
          answer:
            'Yes, you can add additional information to your invoice as needed. Please contact our support team, and they will assist you with your invoice customization.',
        },
        {
          question: 'How does billing work?',
          answer:
            'Billing is typically done on a monthly or annual basis, depending on your subscription plan. You’ll be billed automatically at the beginning of each billing cycle.',
        },
        {
          question: 'How do I change my account email?',
          answer:
            'To change your account email, go to your account settings and locate the option to update your email address. Follow the instructions provided to complete the process.',
        },
    ];
    
      const [faqOpen, setFaqOpen] = useState(Array(faqs.length).fill(false));
  return (
    <div className="px-5 py-20 text-white bg-black border-b border-[#808080]">
        <div className="flex flex-col items-center m-auto">
            <div className="font-semibold text-[2rem] tracking-tight max-w-[480px] text-center ">
            Frequently Asked Questions
            </div>
            <div className="flex flex-col mt-7 md:w-[688px] ">
          {faqs.map((faq, index) => {
            return (
              <div key={index}
                className="pt-6 pb-8 border-b border-white hover:cursor-pointer"
                onClick={() => {
                  setFaqOpen((prev) =>
                    prev.map((item, i) => (i === index ? !item : false))
                  );
                }}
              >
                <div className="flex items-start justify-between " key={index}>
                    <div>
                    <h1 className="flex flex-1 text-lg font-semibold">
                    {' '}
                    {faq.question}{' '}
                  </h1>
                    <p className="pt-2 text-base text-white text-opacity-75" hidden={!faqOpen[index]}>
                  {faq.answer}
                </p>

                    </div>
                  
                  <button className='ml-6'>
                    <svg hidden={!faqOpen[index]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="#FCFCFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg hidden={faqOpen[index]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="#F9FAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
              </div>
            );
          })}
        </div>
        </div>
    </div>
  )
}

export default FAQ
