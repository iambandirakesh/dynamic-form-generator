## Setup instructions

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### npm playwright test

Launches the test runner in the interactive watch mode.\

## Example JSON schemas

#### Example 1

```json
{
  "formTitle": "Project Requirements Survey",

  "formDescription": "Please fill out this survey about your project needs",

  "fields": [
    {
      "id": "name",

      "type": "text",

      "label": "Full Name",

      "required": true,

      "placeholder": "Enter your full name"
    },

    {
      "id": "email",

      "type": "email",

      "label": "Email Address",

      "required": true,

      "placeholder": "you@example.com",

      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",

        "message": "Please enter a valid email address"
      }
    },

    {
      "id": "companySize",

      "type": "select",

      "label": "Company Size",

      "required": true,

      "options": [
        { "value": "1-50", "label": "1-50 employees" },

        { "value": "51-200", "label": "51-200 employees" },

        { "value": "201-1000", "label": "201-1000 employees" },

        { "value": "1000+", "label": "1000+ employees" }
      ]
    },

    {
      "id": "industry",

      "type": "radio",

      "label": "Industry",

      "required": true,

      "options": [
        { "value": "tech", "label": "Technology" },

        { "value": "healthcare", "label": "Healthcare" },

        { "value": "finance", "label": "Finance" },

        { "value": "retail", "label": "Retail" },

        { "value": "other", "label": "Other" }
      ]
    },

    {
      "id": "timeline",

      "type": "select",

      "label": "Project Timeline",

      "required": true,

      "options": [
        { "value": "immediate", "label": "Immediate (within 1 month)" },

        { "value": "short", "label": "Short-term (1-3 months)" },

        { "value": "medium", "label": "Medium-term (3-6 months)" },

        { "value": "long", "label": "Long-term (6+ months)" }
      ]
    },

    {
      "id": "comments",

      "type": "textarea",

      "label": "Additional Comments",

      "required": false,

      "placeholder": "Any other details you'd like to share..."
    }
  ]
}
```

### Example 2

```json
{
  "formTitle": "User Registration and Preferences Form",
  "formDescription": "Please complete the form to register and share your preferences.",
  "fields": [
    {
      "id": "username",
      "type": "text",
      "label": "Username",
      "required": true,
      "placeholder": "Choose a username"
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password",
      "required": true,
      "placeholder": "Create a secure password",
      "validation": {
        "pattern": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
        "message": "Password must be at least 8 characters long and contain both letters and numbers."
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address."
      }
    },
    {
      "id": "subscription",
      "type": "checkbox",
      "label": "Subscription Preferences",
      "required": false,
      "options": [
        { "value": "newsletter", "label": "Subscribe to newsletter" },
        { "value": "updates", "label": "Receive product updates" },
        { "value": "offers", "label": "Get special offers" }
      ]
    },
    {
      "id": "accountType",
      "type": "radio",
      "label": "Account Type",
      "required": true,
      "options": [
        { "value": "personal", "label": "Personal" },
        { "value": "business", "label": "Business" }
      ]
    },
    {
      "id": "securityQuestion",
      "type": "select",
      "label": "Security Question",
      "required": true,
      "options": [
        { "value": "pet", "label": "What is the name of your first pet?" },
        {
          "value": "school",
          "label": "What is the name of your primary school?"
        },
        { "value": "city", "label": "In which city were you born?" }
      ]
    },
    {
      "id": "answer",
      "type": "text",
      "label": "Answer to Security Question",
      "required": true,
      "placeholder": "Enter your answer"
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Share any additional information or feedback."
    }
  ]
}
```

### Example 3

```json
{
  "formTitle": "Job Application Form",
  "formDescription": "Please fill out the form to apply for a position.",
  "fields": [
    {
      "id": "fullName",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address."
      }
    },
    {
      "id": "phone",
      "type": "tel",
      "label": "Phone Number",
      "required": true,
      "placeholder": "Enter your contact number",
      "validation": {
        "pattern": "^[0-9]{10}$",
        "message": "Phone number must be 10 digits."
      }
    },
    {
      "id": "position",
      "type": "select",
      "label": "Position Applied For",
      "required": true,
      "options": [
        { "value": "developer", "label": "Software Developer" },
        { "value": "designer", "label": "UI/UX Designer" },
        { "value": "manager", "label": "Project Manager" },
        { "value": "analyst", "label": "Business Analyst" }
      ]
    },
    {
      "id": "experience",
      "type": "radio",
      "label": "Years of Experience",
      "required": true,
      "options": [
        { "value": "0-2", "label": "0-2 years" },
        { "value": "3-5", "label": "3-5 years" },
        { "value": "6-10", "label": "6-10 years" },
        { "value": "10+", "label": "10+ years" }
      ]
    },
    {
      "id": "resume",
      "type": "file",
      "label": "Upload Resume",
      "required": true,
      "validation": {
        "allowedTypes": [".pdf", ".doc", ".docx"],
        "message": "Only PDF, DOC, and DOCX files are allowed."
      }
    },
    {
      "id": "linkedin",
      "type": "url",
      "label": "LinkedIn Profile",
      "required": false,
      "placeholder": "https://linkedin.com/in/yourprofile"
    },
    {
      "id": "coverLetter",
      "type": "textarea",
      "label": "Cover Letter",
      "required": false,
      "placeholder": "Write a brief introduction or cover letter."
    }
  ]
}
```

### Example 4

```json
{
  "formTitle": "Event Registration Form",
  "formDescription": "Register to participate in our upcoming event. We look forward to seeing you there!",
  "fields": [
    {
      "id": "fullName",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address."
      }
    },
    {
      "id": "contactNumber",
      "type": "tel",
      "label": "Contact Number",
      "required": true,
      "placeholder": "Enter your phone number",
      "validation": {
        "pattern": "^[0-9]{10}$",
        "message": "Phone number must be 10 digits."
      }
    },
    {
      "id": "eventDate",
      "type": "date",
      "label": "Select Event Date",
      "required": true
    },
    {
      "id": "sessions",
      "type": "checkbox",
      "label": "Sessions You Wish to Attend",
      "required": true,
      "options": [
        { "value": "workshop", "label": "Workshop on AI" },
        { "value": "networking", "label": "Networking Session" },
        { "value": "panel", "label": "Panel Discussion" }
      ]
    },
    {
      "id": "dietaryPreferences",
      "type": "select",
      "label": "Dietary Preferences",
      "required": false,
      "options": [
        { "value": "none", "label": "None" },
        { "value": "vegetarian", "label": "Vegetarian" },
        { "value": "vegan", "label": "Vegan" },
        { "value": "halal", "label": "Halal" },
        { "value": "kosher", "label": "Kosher" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments or Requirements",
      "required": false,
      "placeholder": "Let us know if you have any special requirements."
    }
  ]
}
```

## Local development guide

Clone and Install Dependencies:
use this command:

```bash
git clone https://github.com/iambandirakesh/dynamic-form-generator.git
```

then navigate to the project directory:

```bash
cd dynamic-form-generator
```

### Install Dependencies:

using this command:

```bash
npm install
```

### Start Development Server:

```bash
npm start
```

This will run the app in development mode at http://localhost:3000

### Running Tests:

### For Jest tests:

```bash
npm run test
```

### For Playwright tests:

```bash
npm run playwright test
```
