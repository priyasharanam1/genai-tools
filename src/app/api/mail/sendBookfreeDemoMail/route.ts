import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import type { SendMailOptions } from 'nodemailer';
import { createTransport } from "nodemailer";
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { BookFreeDemoFormSchema } from '../../../../lib/schema/schema';

const Oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH2_REDIRECT_URI,
});

Oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_GMAIL_API_REFRESH_TOKEN,
});

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const accessToken = await Oauth2Client.getAccessToken();
      const body = await req.json();
      const result = BookFreeDemoFormSchema.safeParse(body);
      
      if (!result.success) {
        return NextResponse.json({
          success: false,
          message: 'Validation Error',
          error: result.error.format(),
        });
      }
      
      const { name, email, message } = result.data;
      console.log(name, email, message);

      const transporter = createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'brainloxeducation@gmail.com',
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_GMAIL_API_REFRESH_TOKEN,
          accessToken,
        },
        tls: {
          rejectUnauthorized: true,
        },
      } as SMTPTransport.Options);

      const mailOptions: SendMailOptions = {
        from: {
          name: 'Debales.ai',
          address: 'brainloxeducation@gmail.com',
        },
        to: ['sanjay@debales.ai',"aryan.pillai@debales.ai"],
        subject: 'GenAI Tools Free Demo Request',
        html: `
          <h3>A new User has Request a Free Demo of GenAI Tools</h3>
          <ol>
            <li>Name: ${name} </li>
            <li>Email: ${email} </li>
            <li>Message: ${message} </li>
          </ol>
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: 'Email sent Successfully' });
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Something went wrong!' });
    }
  }

  return NextResponse.json({ success: false, error: 'Method not allowed.' });
}
