'use client'
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import React, { Fragment, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { BookFreeDemoFormSchema } from '../../lib/schema/schema';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Textarea } from '../components/ui/TextArea';
import DemoConfirmationDialog from './DemoConfirmationDialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type Inputs = z.infer<typeof BookFreeDemoFormSchema>;

const BookDemoModel = ({ isOpen, setIsOpen }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(BookFreeDemoFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch('/api/mail/sendBookfreeDemoMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(!isOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-homepage-primary bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left text-white transition-all border rounded-lg shadow-xl bg-neutral-800 sm:my-8 sm:w-full sm:max-w-lg border-neutral-500/50">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col items-center justify-center gap-4 p-4"
                    >
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">
                          Welcome to Debales.ai!
                        </h3>
                        <p className="text-sm font-light">
                          Your email address will not be published. Our team
                          will reach you as soon as possible.
                        </p>
                      </div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-gray-400">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your Full Name"
                                className="bg-transparent border placeholder:text-gray-500 border-neutral-500/50 bg-zinc-900 "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-gray-400">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your Email"
                                className="bg-transparent border placeholder:text-gray-500 border-neutral-500/50 bg-zinc-900"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-gray-400">
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Why you want to use debales.ai?"
                                className="bg-transparent border resize-none placeholder:text-gray-500 border-neutral-500/50 bg-zinc-900"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-center w-full gap-6">
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            form.reset();
                            setIsOpen(false);
                          }}
                          className="flex items-center justify-center w-1/2 gap-2 px-4 py-2 border disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-900 border-neutral-500/50 hover:bg-zinc-800 rounded-xl"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                          }
                          className="flex items-center justify-center w-1/2 gap-2 px-4 py-2 border disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-900 border-neutral-500/50 hover:bg-zinc-800 rounded-xl"
                        >
                          {form.formState.isSubmitting ? (
                            <LoadingSpinner />
                          ) : (
                            <>
                              <span>Submit</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <DemoConfirmationDialog isOpen={isSuccess} setIsOpen={setIsSuccess} />
    </>
  );
};

export default BookDemoModel;
