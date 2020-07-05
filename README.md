# Billing

This is a simple application demonstrating the use of AWS Amplify.
The application lets you create bills for your customers and generate PDF files of these bills.

More details at https://medium.com/@feloy/first-steps-with-aws-amplify-for-an-angular-app-31c271ade5a6

## Deployment

First, fork the repository and clone your fork into your development machine.

From the AWS Amplify console, connect your repository branch to the application. Create a new environment *prod*.

Wait for the Provision/Build/Deploy/Verify steps to finish (this can take several minutes).

Then, from your local machine:

```sh
$ cd aws-amplify-demo
$ amplify configure
[...]
# during this step, create a user named billing-user
[...]
# Find this exact command in Backend environments > prod > Edit backend
$ amplify pull --appId ******** --envName prod
? Do you want to use an AWS profile? *Yes*
? Please choose the profile you want to use *billing-user*
Amplify AppID found: ********. Amplify App name is: aws-amplify-demo
Backend environment prod found in Amplify Console app: aws-amplify-demo
? Choose your default editor: *Visual Studio Code*
? Choose the type of app that you are building *javascript*
Please tell us about your project
? What javascript framework are you using *angular*
? Source Directory Path:  *src*
? Distribution Directory Path: *dist/billing*
? Build Command:  *npm run-script build*
? Start Command: *ng serve*

? Do you plan on modifying this backend? *Y*
```
