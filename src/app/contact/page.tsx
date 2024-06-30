"use client";

import React, { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { MotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMessageSquare, FiCheck, FiX } from "react-icons/fi";
import { SiGithub, SiTwitch, SiTwitter, SiYoutube } from "react-icons/si";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    setSuccess(false);

    if (form.current) {
      const message = (form.current.user_message as HTMLInputElement).value.trim();
      const email = (form.current.user_email as HTMLInputElement).value.trim();

      if (!message || !email) {
        setError(true);
        setSending(false);
        return;
      }

      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
          form.current,
          process.env.NEXT_PUBLIC_PUBLIC_KEY as string
        )
        .then(
          () => {
            setSuccess(true);
            setSending(false);
            form.current?.reset();
          },
          () => {
            setError(true);
            setSending(false);
          }
        );
    }
  };

  return (
    <div className="h-full bg-black p-20 text-zinc-50 overflow-scroll">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock formRef={form} sendEmail={sendEmail} success={success} error={error} sending={sending} />
      </motion.div>
      <Footer />
    </div>
  );
};

type BlockProps = {
  className?: string;
} & MotionProps;

const Block: React.FC<BlockProps> = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-black bg-black p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock: React.FC = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="/Ghost.png"
      alt="avatar"
      className="mb-4 h-32 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      We are Aniflow.{" "}
      <span className="text-zinc-400">
        We are a game studio.
      </span>
    </h1>
    <Link
      href="https://store.steampowered.com/app/2934090/Onibi/" target="_blank"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Steam Page <FiArrowRight />
    </Link>
  </Block>
);

const SocialsBlock: React.FC = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3"
    >
      <Link
        href="https://www.youtube.com/@AniflowInteractive" target="_blank"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiYoutube />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3"
    >
      <Link
        href="https://github.com/aug16th" target="_blank"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-[#815fc1] md:col-span-3"
    >
      <Link
        href="https://www.twitch.tv/aug16th" target="_blank"
        className="grid h-full place-content-center text-3xl "
      >
        <SiTwitch />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <Link
        href="https://x.com/aniflowstudios" target="_blank"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiTwitter />
      </Link>
    </Block>
  </>
);

const AboutBlock: React.FC = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      Our passion is to build games.{" "}
      <span className="text-zinc-400">
        We build stunning games that you can never imagine but we promise to deliver our content. 
        Happy Gaming👻
      </span>
    </p>
  </Block>
);

const LocationBlock: React.FC = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMessageSquare className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Write Here</p>
  </Block>
);

type EmailListBlockProps = {
  formRef: React.RefObject<HTMLFormElement>;
  sendEmail: (e: FormEvent<HTMLFormElement>) => void;
  success: boolean;
  error: boolean;
  sending: boolean;
};

const EmailListBlock: React.FC<EmailListBlockProps> = ({ formRef, sendEmail, success, error, sending }) => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Contact Us</p>
    <form
      onSubmit={sendEmail}
      ref={formRef}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        name="user_message"
        placeholder="Enter your Message"
        className="flex-1 rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <input
        type="email"
        name="user_email"
        placeholder="Enter your email"
        className="flex-1 rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
  type="submit"
  className={`flex items-center gap-2 whitespace-nowrap rounded px-3 py-2 text-sm font-medium transition-colors
    ${success ? "bg-green-500 text-white" : error ? "bg-red-500 text-white" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-300"}`}
  disabled={sending}
>
  {success ? <FiCheck /> : error ? <FiX /> : <FiMail />}
  {sending ? "Sending..." : error ? "Failed" : "Send"}
</button>

    </form>
  </Block>
);

const Footer: React.FC = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <Link href="https://portfolio-shinzohans-projects.vercel.app/" target="_blank" className="text-red-300 hover:underline">
          @Shinzohan
        </Link>
      </p>
    </footer>
  );
};

export default Contact;
