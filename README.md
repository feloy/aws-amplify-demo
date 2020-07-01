# Billing

## Deployment

First, fork the repository and clone your fork into your development machine.

From the AWS Amplify console, connect your repository branch to the application. Create a new environment *master*.

From your local machine:

```sh
$ cd aws-amplify-demo
$ amplify configure
[...]
# during this step, create a user named billing-user
[...]
# Find this exact command in Backend environments > master > Edit backend
$ amplify pull --appId ******** --envName master
? Do you want to use an AWS profile? *Yes*
? Please choose the profile you want to use *billing-user*
Amplify AppID found: ********. Amplify App name is: aws-amplify-demo
Backend environment master found in Amplify Console app: aws-amplify-demo
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
