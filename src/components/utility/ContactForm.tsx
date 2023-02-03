import React, {useState} from 'react';
import * as Yup from 'yup';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import {toast} from 'react-toastify';
import classNames from 'classnames';

import {CheckBadgeIcon, NoSymbolIcon} from '@heroicons/react/24/outline';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import Collapse from '@mui/material/Collapse';

import {FormConfigI, FormValuesI} from '@/typescript/interfaces/FormConfigI';
import {DiscordWebhookPostI} from '@/typescript/interfaces/DiscordWebhookPostI';

import FormInput from '@/components/forms/FormInput';
import AppProcessingOverlay from '@/components/utility/AppProcessingOverlay';

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // The form's initial values
  const initialValues: FormValuesI = {
    name: '',
    message: '',
    email: '',
    twitterHandle: '',
    discordHandle: '',
    telegramHandle: '',
  };

  // The form's validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    message: Yup.string().required('Message Is Required'),
    email: Yup.string()
      .email('Invalid email address')
      .when(['twitterHandle', 'telegramHandle', 'discordHandle'], {
        is: (twitterHandle: string, telegramHandle: string, discordHandle: string) =>
          twitterHandle || telegramHandle || discordHandle,
        then: schema => schema.optional(),
        otherwise: schema => schema.required('At least one contact method is required'),
      }),
    twitterHandle: Yup.string()
      .optional()
      .matches(/^@[a-zA-Z0-9_]{1,15}$/, 'Twitter handle must be a valid @username'),
    telegramHandle: Yup.string()
      .optional()
      .matches(/^@[a-zA-Z0-9_]{1,15}$/, 'Telegram handle must be a valid @username'),
    discordHandle: Yup.string().optional(),
  });

  // The form's submit handler
  const onSubmit = async (values: FormValuesI, {resetForm}: FormikHelpers<FormValuesI>) => {
    setIsProcessing(true);

    // Create the Discord webhook payload
    const webhookData: DiscordWebhookPostI = {
      title: 'Contact Form Submission',
      fields: [
        {name: 'Name', value: values.name},
        {name: 'Message', value: values.message},
        {name: 'Email', value: values.email ? values.email : ''},
        {name: 'Twitter Handle', value: values.twitterHandle ? values.twitterHandle : ''},
        {name: 'Telegram Handle', value: values.telegramHandle ? values.telegramHandle : ''},
        {name: 'Discord Handle', value: values.discordHandle ? values.discordHandle : ''},
      ],
    };

    // Send the webhook payload to the Discord api
    const response = await fetch('/api/discord/send', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(webhookData),
    });

    if (response.status === 200) {
      toast.success('Your request has been submitted. We will be in touch shortly.');
      setIsSubmitted(true);
      resetForm();
    }

    setIsProcessing(false);
  };

  // The form's config
  const formConfig: FormConfigI = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  const ContactForm = () => {
    const [showOtherContactOptions, setShowOtherContactOptions] = useState(false);

    return (
      <div className="max-w-xl w-full mx-auto bg-brand-8 rounded-md p-8 mb-16">
        <h2 className="text-2xl leading-5 font-bold text-brand-4">Want To List Your Contract?</h2>
        <p className="mb-10 leading-5 mt-2 pb-2 border-b border-brand-4/25">
          Please fill out the below form and we will be in touch shortly.
        </p>
        <Formik
          initialValues={formConfig.initialValues}
          validationSchema={formConfig.validationSchema}
          onSubmit={formConfig.onSubmit}
        >
          <Form className="space-y-10 mt-4">
            <div>
              <Field name="name" label="Name" placeholder="Your Name" component={FormInput} />
            </div>
            <div className="space-y-10">
              <Field
                name="email"
                label="Your Email Address"
                placeholder="Email Address"
                component={FormInput}
                fullWidth={true}
                group="contact"
              />
              <div
                className={classNames(
                  'cursor-pointer !mt-0 border-t-0 flex items-center mx-[1px] justify-end border text-white bg-brand-7/50 p-1 transition-all duration-250 ease-linear',
                  {
                    'rounded-b-md': !showOtherContactOptions,
                    'rounded-none': showOtherContactOptions,
                  }
                )}
                onClick={() => setShowOtherContactOptions(!showOtherContactOptions)}
              >
                <span className="text-xs underline underline-offset-4 decoration-brand-7/50">
                  Show Other Contact Options
                </span>
                <ChevronDownIcon
                  className={classNames('h-5 w-5 ml-1 text-brand-7/50 transition-transform duration-150 ease-in-out', {
                    'transform rotate-180': showOtherContactOptions,
                  })}
                />
              </div>
              <Collapse in={showOtherContactOptions} className="!mt-0">
                <div className="overflow-hidden transition-all duration-500 ease-linear !mt-0 space-y-8 bg-gray-200 rounded-b-md p-4">
                  <Field
                    name="twitterHandle"
                    label="Your Twitter Handle"
                    placeholder="Twitter Handle"
                    component={FormInput}
                    fullWidth={true}
                    group="contact"
                  />
                  <Field
                    name="telegramHandle"
                    label="Your Telegram Handle"
                    placeholder="Telegram Handle"
                    component={FormInput}
                    fullWidth={true}
                    group="contact"
                  />
                  <Field
                    name="discordHandle"
                    label="Your Discord Handle"
                    placeholder="Discord Handle"
                    component={FormInput}
                    fullWidth={true}
                    group="contact"
                  />
                </div>
              </Collapse>
            </div>
            <div>
              <Field name="message" type="textarea" rows="4" label="Message" component={FormInput} />
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button className="app-btn app-btn--gray" type="reset" disabled={isProcessing}>
                <NoSymbolIcon className="h-5 w-5 mr-1" />
                Reset
              </button>
              <button
                className={classNames('app-btn app-btn--primary', {
                  'app-btn--disabled': isProcessing,
                })}
                type="submit"
                disabled={isProcessing}
              >
                <CheckBadgeIcon className="h-5 w-5 mr-1" />
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  };

  const SubmittedMessage = () => {
    return (
      <div className="max-w-xl w-full mx-auto bg-brand-2 rounded-md p-8 mb-16 ">
        <div>
          <h2 className="text-center text-2xl leading-5 font-bold text-brand-4">Thank You For Your Submission!</h2>
          <div className="text-center leading-5 mt-2">
            A team member will be in touch shortly to discuss your request.
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <AppProcessingOverlay isProcessing={isProcessing} text="Submitting Message" />
      {isSubmitted ? <SubmittedMessage /> : <ContactForm />}
    </>
  );
}

export default ContactForm;
