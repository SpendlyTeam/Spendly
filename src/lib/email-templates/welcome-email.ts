export const getWelcomeEmailHtml = (url: string) => {
  const baseUrl = new URL(url).origin;

  const publicAssetUrl = "https://spendly.fun";
  const logoUrl = `${publicAssetUrl}/logow.svg`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Spendly</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .header {
            background-color: #1f2937;
            padding: 30px;
            text-align: center;
        }
        .logo-img {
            height: 40px;
            width: auto;
            display: block;
            margin: 0 auto;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .heading {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 16px;
        }
        .text {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        .button {
            display: inline-block;
            background-color: #7ed957;
            color: #ffffff;
            font-weight: 600;
            padding: 12px 32px;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.2s ease;
        }
        .button:hover {
            background-color: #7ed957;
        }
        .footer {
            background-color: #f9fafb;
            padding: 24px;
            text-align: center;
            font-size: 14px;
            color: #9ca3af;
        }
        .footer a {
            color: #9ca3af; 
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        
        <div class="header" style="background-color: #1f2937; padding: 30px; text-align: center;">
            <a href="${baseUrl}" target="_blank" style="text-decoration: none; color: #ffffff;">
                <img src="${logoUrl}" alt="Spendly" class="logo-img" style="height: 40px; width: auto; display: block; margin: 0 auto;">
                
                </a>
        </div>
        
        <div class="content" style="padding: 40px 30px; text-align: center;">
            <h1 class="heading" style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 16px;">Welcome to Spendly!</h1>
            <p class="text" style="font-size: 16px; color: #4b5563; margin-bottom: 32px; line-height: 1.6;">
                We're excited to have you on board. Spendly helps you track your expenses and manage your budget with ease. 
                <br><br>
                Please verify your email address to get valid access to your account.
            </p>
            <a href="${url}" class="button" target="_blank" style="display: inline-block; background-color: #10b981; color: #ffffff; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none;">Verify Email</a>
        </div>
        
        <div class="footer" style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 14px; color: #9ca3af;">
            <p>&copy; ${new Date().getFullYear()} Spendly. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
