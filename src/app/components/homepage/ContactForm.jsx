'use client'
import React from "react";
import DemoConfirmationDialog from "../../Model/DemoConfirmationDialog";

const ContactForm = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setDisable(true);
    try {
      const res = await fetch('/api/mail/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
      });
      setEmail("");
      if (res.ok) {
        setIsSuccess(true);
      }

    } catch (error) {
      console.error(error);
    }
    setDisable(false);
  };
  return (
    <div className="bg-black">
      <div className="flex pt-16 flex-col mx-auto items-center max-w-[600px] px-5">
        <div className="font-semibold text-[#F2F2F2] text-[2rem] tracking-tight text-center ">
          Get in touch with us
        </div>
        <div className="mt-2 text-center text-white text-opacity-70">
          We’d love to hear from you. Send us your queries or feedback.
          <div className="relative w-full">
            <form onSubmit={handleSubmit}>
            <input type="email"
              className="w-full p-4 my-8 text-black rounded-xl"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button disabled={disable}   type="submit"  className="disabled:bg-opacity-50 absolute top-10 right-2 bg-[#FFC40C] text-black px-3 py-2 font-medium cursor-pointer rounded-lg">
              Submit
            </button>
            </form>
          </div>
        </div>
      </div>
      <DemoConfirmationDialog isOpen={isSuccess} setIsOpen={setIsSuccess} />
    </div>
  );
};

export default ContactForm;
