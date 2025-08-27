export function getWelcomeEmailTemplate(email: string): string {
    const currentYear = new Date().getFullYear()
  
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Shining Stars School Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
          <div style="font-size: 32px; margin-bottom: 10px;">
             <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-qIkb15wjakedhFwPhSmyOGniRtPurY.jpeg" alt="Shining Stars School Logo" class="logo">
          </div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            Shining Stars Nursery And Primary School
          </h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Welcome to Our Newsletter Family!
          </p>
        </div>
  
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Welcome Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2d3748; font-size: 24px; margin-bottom: 15px;">
              🎉 Welcome to Our Newsletter!
            </h2>
            <p style="color: #4a5568; font-size: 18px; margin: 0;">
              Thank you for subscribing to our newsletter!
            </p>
          </div>
  
          <!-- Personal Greeting -->
          <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #2d3748; font-size: 16px;">
              Dear Valued Subscriber,
            </p>
            <p style="margin: 15px 0 0 0; color: #4a5568; font-size: 16px;">
              Welcome to the Shining Stars School community! You'll now receive updates about our school activities, 
              educational programs, and important announcements directly in your inbox.
            </p>
          </div>
  
          <!-- What to Expect -->
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; color: white;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px; text-align: center;">
              📚 What to Expect
            </h3>
            <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
              <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
                Weekly updates on school activities and events
              </li>
              <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
                Educational tips and resources for parents
              </li>
              <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
                Important announcements and school calendar updates
              </li>
              <li style="margin-bottom: 0; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">✓</span>
                Student achievements and success stories
              </li>
            </ul>
          </div>
  
          <!-- Contact Information -->
          <div style="background-color: #2d3748; color: white; border-radius: 12px; padding: 25px; text-align: center;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px;">
              📞 Stay Connected
            </h3>
            <p style="margin: 0 0 10px 0; font-size: 14px;">
              Follow us for more updates and school news
            </p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              Email: info@shiningstarsvvumba.com | Phone: 0393102604
            </p>
          </div>
  
        </div>
  
        <!-- Footer -->
        <div style="background-color: #1a202c; color: white; padding: 30px; text-align: center;">
          <div style="margin-bottom: 15px;">
            <span style="font-size: 24px;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-qIkb15wjakedhFwPhSmyOGniRtPurY.jpeg" alt="Shining Stars School Logo" class="logo">
            </span>
          </div>
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
            Shining Stars Nursery And Primary School
          </p>
          <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.8;">
            Empowering minds, Building futures
          </p>
          <div style="border-top: 1px solid #4a5568; padding-top: 15px; margin-top: 15px;">
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              © ${currentYear} Shining Stars Nursery And Primary School. All rights reserved.
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
              This email was sent to ${email}
            </p>
          </div>
        </div>
  
      </div>
    </body>
    </html>
    `
  }
  
  export function getAlreadySubscribedEmailTemplate(email: string): string {
    const currentYear = new Date().getFullYear()
  
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Continued Support - Shining Stars School</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 40px 30px; text-align: center; color: white;">
          <div style="font-size: 32px; margin-bottom: 10px;"> <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-qIkb15wjakedhFwPhSmyOGniRtPurY.jpeg" alt="Shining Stars School Logo" class="logo"></div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            Shining Stars Nursery And Primary School
          </h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Thank You for Your Continued Support!
          </p>
        </div>
  
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Thank You Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2d3748; font-size: 24px; margin-bottom: 15px;">
              💚 You're Already Part of Our Family!
            </h2>
            <p style="color: #4a5568; font-size: 18px; margin: 0;">
              We appreciate your continued interest in our school!
            </p>
          </div>
  
          <!-- Personal Message -->
          <div style="background-color: #f0fff4; border-left: 4px solid #48bb78; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #2d3748; font-size: 16px;">
              Dear Loyal Subscriber,
            </p>
            <p style="margin: 15px 0 0 0; color: #4a5568; font-size: 16px;">
              Thank you for your continued support and interest in Shining Stars School! 
              You're already subscribed to our newsletter and receiving all our latest updates. 
              We truly value your engagement with our school community.
            </p>
          </div>
  
          <!-- Recent Updates -->
          <div style="background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; color: white;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px; text-align: center;">
              📰 Stay Tuned For
            </h3>
            <ul style="margin: 0; padding-left: 20px; list-style-type: none;">
              <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">📅</span>
                Upcoming school events and activities
              </li>
              <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">🎓</span>
                Student achievements and academic milestones
              </li>
              <li style="margin-bottom: 10px; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">📚</span>
                Educational resources and parenting tips
              </li>
              <li style="margin-bottom: 0; position: relative; padding-left: 25px;">
                <span style="position: absolute; left: 0; top: 0; color: #fff; font-weight: bold;">🏫</span>
                Important school announcements and updates
              </li>
            </ul>
          </div>
  
          <!-- Appreciation Message -->
          <div style="text-align: center; background-color: #f7fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #2d3748; font-size: 18px; margin: 0 0 15px 0;">
              🙏 Our Appreciation
            </h3>
            <p style="color: #4a5568; font-size: 16px; margin: 0; font-style: italic;">
              "Your continued support and engagement mean the world to us. Together, we're building 
              a stronger educational community for our children's bright future."
            </p>
          </div>
  
          <!-- Contact Information -->
          <div style="background-color: #2d3748; color: white; border-radius: 12px; padding: 25px; text-align: center;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px;">
              📞 Questions or Feedback?
            </h3>
            <p style="margin: 0 0 10px 0; font-size: 14px;">
              We'd love to hear from you!
            </p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              Email: info@shiningstarsvvumba.com | Phone: 0393102604
            </p>
          </div>
  
        </div>
  
        <!-- Footer -->
        <div style="background-color: #1a202c; color: white; padding: 30px; text-align: center;">
          <div style="margin-bottom: 15px;">
            <span style="font-size: 24px;">🌟</span>
          </div>
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
            Shining Stars Nursery And Primary School
          </p>
          <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.8;">
            Empowering minds, Building futures
          </p>
          <div style="border-top: 1px solid #4a5568; padding-top: 15px; margin-top: 15px;">
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              © ${currentYear} Shining Stars Nursery And Primary School. All rights reserved.
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
              This email was sent to ${email}
            </p>
          </div>
        </div>
  
      </div>
    </body>
    </html>
    `
  }
  