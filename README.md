🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.

# Badges

[![Maintainability](https://api.codeclimate.com/v1/badges/48e243bd3d68a7d834b0/maintainability](https://codeclimate.com/github/Lambda-School-Labs/budget-blocks-be)
[![Test Coverage](https://api.codeclimate.com/v1/badges/48e243bd3d68a7d834b0/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/budget-blocks-be)

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend framework goes here

🚫 Why did you choose this framework?

- Point One
- Point Two
- Point Three
- Point Four

## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access controll, and descriptioin to match your project

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizatoins/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |

#### User Routes

| Method | Endpoint                        | Access Control | Description                                  |
| ------ | ------------------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/auth/login`               | all users      | Email & password required. Returns JWT token |
| GET    | `/api/auth/register`            | all users      | Email & password required.                   |
| GET    | `/api/users/categories/:userId` | all users      | Returns a list of user categories.           |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app

_ STAGING_DB - optional development db for using functionality not available in SQLite
_ NODE\*ENV - set to "development" until ready for "production"

- JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
  _ SENDGRID_API_KEY - this is generated in your Sendgrid account \* stripe_secret - this is generated in the Stripe dashboard

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.

# Information

## JWT

- Uses JWT web tokens to store user information and verifies the keys by using a JWT_SECRET environment variable (will need to create)
- JWT token contains user_id, and email

## Postgres

- The backend is now running on Postgres, so things won't clear everytime the dev branch is commited to. In addition to that, you can create an account and sign up with plaid useing user/pass_good just once now. No more cre-creating accounts unless we need to wipe the DB. 


## (auth) **POST** /api/auth/register

 **Expected requst body:**

    {
        "email": "Yeet",
        "password": "Yeet"
    }

**Returns the id of the newly created user:201 Status**

    {
        "message": "success",
        "id": 1
    }

## (auth) **POST** /api/auth/login

**Expected request body:**

    {
        "email": "Yeet",
        "password": "Yeet"
    }

**Returns the token, id, and BankAccountLink status**

    {
        "id": 1,
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Ikt5bGUiLCJpYXQiOjE1ODAyMzU0NzMsImV4cCI6MTU4MDI0OTg3M30.vOU1ZbHcLxOgCtD50Pu7JqHiudEc-0VYtDfbtXeqvlU",
        "message": "Welcome Yeet!",
        "LinkedAccount": false
    }

## (Plaid) **POST** /plaid/token_exchange

**Expected request body**

**The publicToken is what you get from the react-plaid-link**

    {
        "publicToken": "public-sandbox-b54b4ec6-877d-456f-a916-2c38542be274",
        "userid": 1
    }

**Returns confirmation that the AccessToken and Item(Plaid's term) has been inserted, and an array of transactions**

    {
        "AccessTokenInserted": 1,
        "ItemIdInserted": 1
    }

## (Plaid) **GET** /plaid/transactions/:userID

**This is no longer a post request,now you just pass the userID as a param in the url**


*When we implement the restricitve middleware, thers a chance it'll change to a get request and we'll get the user id from the authorization header token*

**Returns the list of transactions for that user**

    {
        "categories":[
            {
                "id": 10,
                "name": "Payment",
                "email": "Yeet",
                "transactions": [
                    {
                        "id": 2,
                        "name": "AUTOMATIC PAYMENT - THANK",
                        "amount": 2078.5,
                        "payment_date": "2019-01-30",
                        "category_id": 10,
                        "user_id": 1
                    },
                    {
                        "id": 5,
                        "name": "CREDIT CARD 3333 PAYMENT *//",
                        "amount": 25,
                        "payment_date": "2019-01-21",
                        "category_id": 10,
                        "user_id": 1
                    }
                ]
            },
        ],
        "accounts":[
            {
                "id": 1,
                "account_id": "kNnnbgZ9RATKbD1dqrl5I3jKLEz97eIWbw8n4",
                "balance": 100,
                "official_name": "Plaid Gold Standard 0% Interest Checking",
                "subtype": "checking",
                "type": "depository",
                "mask": "0000",
                "pg_item_id": 1
            },
            {
                "id": 2,
                "account_id": "lPbbW8MvRAhv5wlgKzkLiNZ6zMj4BviZvJrQD",
                "balance": 200,
                "official_name": "Plaid Silver Standard 0.1% Interest Saving",
                "subtype": "savings",
                "type": "depository",
                "mask": "1111",
                "pg_item_id": 1
            }
        ]
    }

## (User) **GET** /api/users/categories/param

**You just pass the userID as a param in the url**

    {
        example: /api/users/categories/1(userid)
    }

**Returns the list of categories for that user**

    [
        {
            "id": 1,
            "name": "Bank Fees",
            "email": "yeet",
            "budget": null
        },
        {
            "id": 2,
            "name": "Cash Advance",
            "email": "yeet",
            "budget": null
        }
    ]

## (User) **PUT** /api/users/categories/param

**While hitting the endpoint, put the userid as a parameter on the end, then send the following object**

    {
        example: /api/users/categories/1(userid)
    }

    {    
        "categoryid": 1,
        "budget": 320
    }

**Returns the following object**

    {
        "userid": "1",
        "categoryid": 20,
        "amount": 320,
        "status": "true"
    }

## (User) **PUT** /api/users/income/:param

**While hitting the endpoint, put the userid as the parameter on the end, then pass the following object**

    {
        example: /api/users/income/1(userid)
    }

    {
        "income":3100
    }

**Returns the id of the updated record**

    {
        "id":1
    }

## (User) **PUT** /api/users/savinggoal/:param

**While hitting the endpoint, put the userid as the parameter on the end, then pass the following object**


    {
        example: /api/users/savinggoal/1(userid)
    }

    {
        "saving_goal":205
    }

**Returns the id of the updated record**

    {
        "id":1
    }

## (User) **GET** /api/users/user/:param

**While hitting the endpoint, put the userid as the parameter on the end**

    {
        example: /api/users/user/1(userid)
    }

**Returns the following object**

    {
        "user": {
            "id": 1,
            "email": "Yeet",
            "income": 4200,
            "saving_goal": 205,
            "Totalbudget":1400

        }
    }

**Keep in mind, the totalbudget will be null since if the user hasn't set a budget for at least one of the categories. The endpoint to set a category budget for a specific user is above**

## (Manual) **GET** /manual/onboard/:userId

**While hitting the endpoint, put the userid as the parameter on the end**

    {
      example: /manual/onboard/1(userid)
    }

**This endpoint doesn't return anything. It simply linkes the user to the default categories**

## (Manual) **POST** /manual/transaction/:userId

**While hitting the endpoint, put the userid as the parameter on the end**

    {
      example: /manual/transaction/1(userid)
    }

**You can pass two types of objects to this endopoint. One with a name and one without**

    {
      	"name": "Yeet",
	      "amount": 20.00,
	      "payment_date": "2020-02-14",
	      "category_id": 4
    }

**And**

    {
	      "amount": 20.00,
	      "payment_date": "2020-02-14",
	      "category_id": 4
    }

**It returns with the id of the transaction inserted into the manual_budget_item table**

    {
      "inserted":4
    }

## (Manual) **PATCH** /manual/transaction/:userId/:transactionId

**On this endpoint, you'll need to user two parameters, the userId and the transactionId**

    {
      example: /manual/transaction/1(userId)/2(transactionId)
    }

**You can also pass different types of objects to this endpoint, but we aware they can only contain the payment_date, name, and amount. You may have all three in there or just one of each**

    {
      name:"Hardware"
    }

    {
      name:"Hardware",
      amount:456.21
    }

    {
      payment_date: "2020-02-14",
      name:"Hobbies"
    }

**They all return with the id of the transaction you updated**

    {
      "update":[2]
    }

## (Manual) **GET** /manual/transaction/:userId

**Here you pass the endpoint the userId that you need all transactions from. Just like the plaid user version of this, it will send you each transaction PER category**
    {
      example: /manual/transaction/1(userId)
    }

**Response**

    {
      "list": [
      {
        "id": 1,
        "name": "Bank Fees",
        "email": "Yeet",
        "budget": null,
        "transactions": [
          {
            "id": 2,
            "name": "poop",
            "amount": "987.00",
            "payment_date": "2019-9-15",
            "user_id": 1,
            "category_id": 1
          }
        ],
        "total": "987.00"
      }
    }

## (Manual) **POST** /manual/categories/:userId

**This is were manual users can add their custom categories**

    {
      "name": "Birthday dinner",
      "budget": 70.00
    }

**Response**

    {
      "addedCat" : 25
    }

## (Manual) **PATCH** /manual/categories/:userId/:catId

**You must pass the userid and categoryid to this endpoints parameters.Like the other endpoints under manual, this is for manual users only that have made a custom category. If you try to edit a default category with this endpoint you will get an error**

        {
            example: /manual/categories/1(userId)/25(catId)
        }

**The expected object can include the name or the name and budget.Either of these are fine, but you must include a name**

        {
            name: "toilet paper"
        }

        {
            name:"toilet paper",
            budget: 60
        }

**Expected returned body will be a 201 status and the id of the category updated**

        {
            updated:25
        }